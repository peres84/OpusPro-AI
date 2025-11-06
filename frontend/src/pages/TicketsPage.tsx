import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, RefreshCw, AlertCircle, CheckCircle, Clock, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import TicketDetails from "@/components/TicketDetails";

interface Ticket {
  ticket_id: string;
  status: string;
  time: string;
  alert: "auto_process" | "needs_human" | "follow_up";
}

interface TicketSummary {
  output: string;
}

const fetchTickets = async (): Promise<Ticket[]> => {
  const response = await fetch("https://hackathon25k.app.n8n.cloud/webhook/41fb634a-1e20-496e-8664-6105b05ae638");
  if (!response.ok) throw new Error("Failed to fetch tickets");
  return response.json();
};

const fetchTicketSummary = async (ticketId: string): Promise<string> => {
  const response = await fetch("https://hackathon25k.app.n8n.cloud/webhook/d61b018f-06e4-428d-accf-ffc0d43dcc46", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticket_id: ticketId }),
  });
  if (!response.ok) throw new Error("Failed to fetch ticket summary");

  const data = await response.json();

  // Handle the array response and extract the output
  if (Array.isArray(data) && data.length > 0 && data[0].output) {
    return data[0].output;
  }

  // Fallback if structure is different
  throw new Error("Invalid response format");
};

const sendManagerResponse = async ({ ticketId, message }: { ticketId: string; message: string }) => {
  try {
    console.log("Sending manager response:", { ticket_id: ticketId, message });

    const response = await fetch("https://hackathon25k.app.n8n.cloud/webhook/fb936f07-b536-409f-a281-7f339f606bd6", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ ticket_id: ticketId, message }),
    });

    console.log("Response status:", response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Webhook error response:", errorText);
      throw new Error(`Failed to send response: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Webhook response data:", data);
    return data;
  } catch (error) {
    console.error("Webhook request failed:", error);
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Network error: Unable to connect to webhook. Check CORS or network connection.");
    }
    throw error;
  }
};

const deleteTicket = async (ticketId: string) => {
  const response = await fetch("https://hackathon25k.app.n8n.cloud/webhook-test/030cadf5-25de-4ae5-aaf8-12843a021463", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ticket_id: ticketId,
      status: "delete",
      time: new Date().toISOString(),
    }),
  });
  if (!response.ok) throw new Error("Failed to delete ticket");
  return response.json();
};

const getAlertIcon = (alert: string) => {
  switch (alert) {
    case "auto_process":
      return <CheckCircle className="h-5 w-5" />;
    case "needs_human":
      return <AlertCircle className="h-5 w-5" />;
    case "follow_up":
      return <Clock className="h-5 w-5" />;
    default:
      return <AlertCircle className="h-5 w-5" />;
  }
};

const getAlertColor = (alert: string) => {
  switch (alert) {
    case "auto_process":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
    case "needs_human":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
    case "follow_up":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "open":
      return "text-blue-600 dark:text-blue-400";
    case "closed":
      return "text-gray-600 dark:text-gray-400";
    case "pending":
      return "text-yellow-600 dark:text-yellow-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
};

export default function TicketsPage() {
  const [expandedTicketIds, setExpandedTicketIds] = useState<string[]>([]);
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [fetchingSummaries, setFetchingSummaries] = useState<Set<string>>(new Set());
  const queryClient = useQueryClient();

  const {
    data: tickets = [],
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
    enabled: false,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete ticket");
    },
  });

  const responseMutation = useMutation({
    mutationFn: sendManagerResponse,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      setMessages((prev) => ({ ...prev, [variables.ticketId]: "" }));
      toast.success("Response sent successfully");
    },
    onError: () => {
      toast.error("Failed to send response");
    },
  });

  const handleTicketExpand = (ticketId: string, isExpanded: boolean) => {
    if (isExpanded) {
      setExpandedTicketIds((prev) => [...prev, ticketId]);
    } else {
      setExpandedTicketIds((prev) => prev.filter((id) => id !== ticketId));
    }
  };

  const handleSendMessage = (ticketId: string) => {
    const message = messages[ticketId];
    if (!message?.trim()) return;

    responseMutation.mutate({ ticketId, message });
  };

  const handleFetchTickets = () => {
    refetch();
    toast.info("Fetching tickets...");
  };

  const handleFetchSummary = async (ticketId: string) => {
    if (fetchingSummaries.has(ticketId)) return;

    setFetchingSummaries((prev) => new Set(prev).add(ticketId));
    toast.info("Fetching ticket summary...");

    try {
      await queryClient.fetchQuery({
        queryKey: ["ticketSummary", ticketId],
        queryFn: () => fetchTicketSummary(ticketId),
      });
      toast.success("Summary loaded!");
    } catch (error) {
      toast.error("Failed to fetch summary");
    } finally {
      setFetchingSummaries((prev) => {
        const next = new Set(prev);
        next.delete(ticketId);
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-6 md:p-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Support Tickets
            </h1>
            <p className="text-muted-foreground text-lg">Manage and respond to customer tickets</p>
          </div>
          <Button
            onClick={handleFetchTickets}
            disabled={isFetching}
            size="lg"
            className="gap-2 w-full sm:w-auto shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          >
            <RefreshCw className={`h-5 w-5 ${isFetching ? "animate-spin" : ""}`} />
            {isFetching ? "Loading..." : "Fetch Tickets"}
          </Button>
        </div>

        {isLoading || isFetching ? (
          <Card className="p-20 text-center bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl">
            <RefreshCw className="h-14 w-14 animate-spin mx-auto mb-6 text-primary" />
            <p className="text-muted-foreground text-xl font-medium">Loading tickets...</p>
          </Card>
        ) : tickets.length === 0 ? (
          <Card className="p-20 text-center bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl">
            <div className="max-w-md mx-auto">
              <div className="h-20 w-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <AlertCircle className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">No tickets found</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Click "Fetch Tickets" to load the latest support tickets
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="px-2 flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Showing {tickets.length} ticket{tickets.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Accordion type="multiple" className="space-y-5">
              {tickets.map((ticket) => (
                <AccordionItem
                  key={ticket.ticket_id}
                  value={ticket.ticket_id}
                  className="border-0 rounded-2xl overflow-hidden bg-card backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border border-border/50"
                >
                  <div className="relative">
                    {/* Accent bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${
                        ticket.alert === "auto_process"
                          ? "bg-gradient-to-b from-success to-success/70"
                          : ticket.alert === "needs_human"
                            ? "bg-gradient-to-b from-destructive to-destructive/70"
                            : "bg-gradient-to-b from-warning to-warning/70"
                      }`}
                    />

                    {/* Main ticket header - FIXED GRID LAYOUT */}
                    <AccordionTrigger
                      className="w-full hover:no-underline p-0 [&>svg]:hidden"
                      onClick={(e) => {
                        const target = e.currentTarget;
                        const isExpanded = target.getAttribute("data-state") === "closed";
                        handleTicketExpand(ticket.ticket_id, isExpanded);
                      }}
                    >
                      <div className="w-full pl-6 pr-6 py-6 bg-gradient-to-r from-card/50 via-card to-card/50">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          {/* Left: Icon + Ticket ID + Badge - Takes 5 columns on large screens */}
                          <div className="lg:col-span-5 flex items-center gap-4">
                          <div
                            className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                              ticket.alert === "auto_process"
                                ? "bg-gradient-to-br from-success/20 to-success/10 text-success"
                                : ticket.alert === "needs_human"
                                  ? "bg-gradient-to-br from-destructive/20 to-destructive/10 text-destructive"
                                  : "bg-gradient-to-br from-warning/20 to-warning/10 text-warning"
                            }`}
                          >
                            {getAlertIcon(ticket.alert)}
                          </div>

                          <div className="flex flex-col gap-2.5 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="font-bold text-xl text-foreground truncate">
                                #{ticket.ticket_id.slice(0, 8)}
                              </span>
                              <Badge
                                className={`${getAlertColor(ticket.alert)} flex items-center gap-1.5 px-3 py-1.5 border-0 shadow-md`}
                              >
                                <span className="font-semibold text-xs uppercase tracking-wider">
                                  {ticket.alert.replace("_", " ")}
                                </span>
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground font-medium truncate">
                              ID: {ticket.ticket_id}
                            </span>
                          </div>
                        </div>

                        {/* Middle: Status - Takes 3 columns on large screens */}
                        <div className="lg:col-span-3 flex lg:justify-center">
                          <div className="space-y-1.5">
                            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                              Status
                            </div>
                            <div
                              className={`font-bold text-base capitalize ${getStatusColor(ticket.status)} flex items-center gap-2`}
                            >
                              <div
                                className={`w-2.5 h-2.5 rounded-full ${
                                  ticket.status.toLowerCase() === "open"
                                    ? "bg-blue-500 animate-pulse shadow-lg shadow-blue-500/50"
                                    : ticket.status.toLowerCase() === "closed"
                                      ? "bg-gray-400"
                                      : "bg-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50"
                                }`}
                              />
                              {ticket.status}
                            </div>
                          </div>
                        </div>

                          {/* Right: Created Date + Action Buttons - Takes 4 columns on large screens */}
                          <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-6">
                            <div className="space-y-1.5">
                              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                Created
                              </div>
                              <div className="text-foreground font-semibold text-sm">
                                {new Date(ticket.time).toLocaleDateString(undefined, {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                              <div className="text-muted-foreground text-xs font-medium">
                                {new Date(ticket.time).toLocaleTimeString(undefined, {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFetchSummary(ticket.ticket_id);
                                }}
                                disabled={fetchingSummaries.has(ticket.ticket_id)}
                                className="h-10 w-10 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-200"
                                title="Fetch Summary"
                              >
                                <RefreshCw
                                  className={`h-4 w-4 ${fetchingSummaries.has(ticket.ticket_id) ? "animate-spin" : ""}`}
                                />
                              </Button>

                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteMutation.mutate(ticket.ticket_id);
                                }}
                                className="h-10 w-10 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive transition-all duration-200"
                                title="Delete Ticket"
                              >
                                <X className="h-4 w-4" />
                              </Button>

                              <div className="h-10 w-10 rounded-xl bg-secondary/50 hover:bg-secondary flex items-center justify-center transition-all duration-200">
                                <ChevronDown
                                  className={`h-5 w-5 text-foreground transition-transform duration-200 ${
                                    expandedTicketIds.includes(ticket.ticket_id) ? "rotate-180" : ""
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                  </div>

                  <AccordionContent className="px-6 pb-6 pt-4 bg-gradient-to-b from-card/30 to-card/80 backdrop-blur-sm">
                    <TicketDetails
                      ticketId={ticket.ticket_id}
                      isExpanded={expandedTicketIds.includes(ticket.ticket_id)}
                      message={messages[ticket.ticket_id] || ""}
                      onMessageChange={(value) =>
                        setMessages((prev) => ({
                          ...prev,
                          [ticket.ticket_id]: value,
                        }))
                      }
                      onSendMessage={() => handleSendMessage(ticket.ticket_id)}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
}
