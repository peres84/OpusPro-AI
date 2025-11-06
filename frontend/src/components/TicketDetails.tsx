import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";

interface TicketDetailsProps {
  ticketId: string;
  isExpanded: boolean;
  message: string;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
}

const fetchTicketSummary = async (ticketId: string): Promise<string> => {
  const response = await fetch("https://hackathon25k.app.n8n.cloud/webhook/d61b018f-06e4-428d-accf-ffc0d43dcc46", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticket_id: ticketId }),
  });
  if (!response.ok) throw new Error("Failed to fetch ticket summary");

  const data = await response.json();

  if (Array.isArray(data) && data.length > 0 && data[0].output) {
    return data[0].output;
  }

  throw new Error("Invalid response format");
};

export default function TicketDetails({
  ticketId,
  isExpanded,
  message,
  onMessageChange,
  onSendMessage,
}: TicketDetailsProps) {
  const { data: summary, isLoading } = useQuery({
    queryKey: ["ticketSummary", ticketId],
    queryFn: () => fetchTicketSummary(ticketId),
    enabled: false, // Only fetch when manually triggered via button
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="space-y-5 mt-2">
      {/* Summary Section - First */}
      <Card className="p-6 bg-card/60 backdrop-blur-sm border-border/50 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-bold text-foreground">Summary</h3>
        </div>
        {isLoading ? (
          <div className="flex items-center gap-3 text-muted-foreground py-4">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="font-medium">Loading summary...</span>
          </div>
        ) : summary ? (
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">{summary}</p>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted/50 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <p className="text-muted-foreground">
              Click the refresh button above to load the ticket summary
            </p>
          </div>
        )}
      </Card>

      {/* Response Section - Second */}
      <Card className="p-6 bg-card/60 backdrop-blur-sm border-border/50 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center">
            <Send className="h-4 w-4 text-accent" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Your Response</h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Textarea
            placeholder="Type your response..."
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            className="flex-1 min-h-[120px] resize-none bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/25 rounded-xl"
          />
          <Button
            onClick={onSendMessage}
            disabled={!message.trim()}
            className="self-end sm:self-start h-12 px-6 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
}
