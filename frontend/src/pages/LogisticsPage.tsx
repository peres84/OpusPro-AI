import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, CheckCircle2, Truck, MapPin, Clock, Navigation } from "lucide-react";

const orders = [
  {
    orderId: "ORD-2024-101",
    productName: "Industrial Pump Model X-2000",
    customerName: "TechCorp Industries",
    customerEmail: "procurement@techcorp.com",
    deliveryTime: "2025-10-14T14:00:00",
    status: "In Transit",
    currentLocation: "Hamburg Distribution Center",
    destination: "Berlin, Germany",
    progress: 65,
    trackingSteps: [
      { label: "Order Placed", completed: true, timestamp: "2025-10-10T09:00:00", location: "Munich Warehouse" },
      { label: "Processing", completed: true, timestamp: "2025-10-10T15:30:00", location: "Munich Warehouse" },
      { label: "Shipped", completed: true, timestamp: "2025-10-11T08:00:00", location: "Frankfurt Hub" },
      { label: "In Transit", completed: true, timestamp: "2025-10-12T06:00:00", location: "Hamburg Distribution" },
      { label: "Delivered", completed: false, timestamp: null, location: "Berlin, Germany" },
    ],
  },
  {
    orderId: "ORD-2024-102",
    productName: "Precision Gear Set (24pc)",
    customerName: "ManuTech Solutions",
    customerEmail: "orders@manutech.de",
    deliveryTime: "2025-10-16T10:00:00",
    status: "Processing",
    currentLocation: "Stuttgart Facility",
    destination: "Dresden, Germany",
    progress: 20,
    trackingSteps: [
      { label: "Order Placed", completed: true, timestamp: "2025-10-11T11:00:00", location: "Stuttgart Facility" },
      { label: "Processing", completed: true, timestamp: "2025-10-11T16:00:00", location: "Stuttgart Facility" },
      { label: "Shipped", completed: false, timestamp: null, location: "Stuttgart Hub" },
      { label: "In Transit", completed: false, timestamp: null, location: "Leipzig Center" },
      { label: "Delivered", completed: false, timestamp: null, location: "Dresden, Germany" },
    ],
  },
  {
    orderId: "ORD-2024-103",
    productName: "Hydraulic Control Valve",
    customerName: "AutoFab GmbH",
    customerEmail: "supply@autofab.com",
    deliveryTime: "2025-10-13T16:00:00",
    status: "Delivered",
    currentLocation: "Cologne Destination",
    destination: "Cologne, Germany",
    progress: 100,
    trackingSteps: [
      { label: "Order Placed", completed: true, timestamp: "2025-10-08T13:00:00", location: "Dortmund Warehouse" },
      { label: "Processing", completed: true, timestamp: "2025-10-08T17:00:00", location: "Dortmund Warehouse" },
      { label: "Shipped", completed: true, timestamp: "2025-10-09T07:00:00", location: "Essen Hub" },
      { label: "In Transit", completed: true, timestamp: "2025-10-10T09:00:00", location: "Dusseldorf Center" },
      { label: "Delivered", completed: true, timestamp: "2025-10-13T15:45:00", location: "Cologne, Germany" },
    ],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-success text-success-foreground";
    case "In Transit":
      return "bg-accent text-accent-foreground";
    case "Processing":
      return "bg-warning text-warning-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function LogisticsPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-6 md:p-10">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3">
            Logistics & Tracking
          </h1>
          <p className="text-muted-foreground text-lg">Real-time shipment tracking and delivery management</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card
              key={order.orderId}
              className="bg-card/60 backdrop-blur-sm border-border/50 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center shadow-lg">
                      <Package className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground">{order.orderId}</h3>
                      <p className="text-sm text-muted-foreground">{order.productName}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} px-4 py-2 text-sm font-semibold`}>{order.status}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Customer</p>
                    <p className="font-semibold text-foreground">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Delivery Time</p>
                    <p className="font-semibold text-foreground">
                      {new Date(order.deliveryTime).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.deliveryTime).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Current Location</p>
                    <p className="font-semibold text-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {order.currentLocation}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Delivery Progress</span>
                    <span className="text-sm font-bold text-primary">{order.progress}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full"
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => toggleOrder(order.orderId)}
                  className="w-full text-sm font-medium text-primary hover:text-primary/80 flex items-center justify-center gap-2 py-2 transition-colors"
                >
                  {expandedOrder === order.orderId ? "Hide Details" : "Show Tracking Timeline"}
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${expandedOrder === order.orderId ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedOrder === order.orderId && (
                  <div className="mt-6 pt-6 border-t border-border/50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Timeline */}
                      <div>
                        <h4 className="font-bold mb-6 text-foreground flex items-center gap-2">
                          <Navigation className="h-5 w-5 text-primary" />
                          Tracking Timeline
                        </h4>
                        <div className="space-y-6">
                          {order.trackingSteps.map((step, index) => (
                            <div key={index} className="flex items-start gap-4">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`rounded-full p-2.5 ${
                                    step.completed
                                      ? "bg-success text-success-foreground shadow-lg shadow-success/25"
                                      : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {step.completed ? (
                                    <CheckCircle2 className="h-5 w-5" />
                                  ) : (
                                    <Clock className="h-5 w-5" />
                                  )}
                                </div>
                                {index < order.trackingSteps.length - 1 && (
                                  <div
                                    className={`w-0.5 h-16 ${
                                      step.completed ? "bg-success" : "bg-border"
                                    }`}
                                  />
                                )}
                              </div>
                              <div className="flex-1 pt-1">
                                <p
                                  className={`font-semibold text-base mb-1 ${
                                    step.completed ? "text-foreground" : "text-muted-foreground"
                                  }`}
                                >
                                  {step.label}
                                </p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {step.location}
                                </p>
                                {step.timestamp && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(step.timestamp).toLocaleString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Route Map Visualization */}
                      <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-lg flex flex-col h-full">
                        <div className="px-6 py-4 border-b border-primary/20">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Truck className="h-5 w-5 text-primary" />
                            Route Map
                          </h3>
                        </div>
                        <div className="flex-1 relative rounded-b-lg overflow-hidden bg-secondary/20">
                          {/* Google Maps Embed with directions */}
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${encodeURIComponent(order.currentLocation + ', Germany')}&destination=${encodeURIComponent(order.destination)}&mode=driving`}
                            title="Route Map"
                          />
                          {/* Route Information Overlay */}
                          <div className="absolute top-4 left-4 right-4 bg-background/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-border/50 z-10 pointer-events-none">
                            <p className="text-xs font-semibold text-foreground flex items-center gap-2 mb-1">
                              <MapPin className="h-3 w-3 text-primary" />
                              {order.currentLocation} → {order.destination}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Truck className="h-3 w-3" />
                                {order.progress}% complete
                              </span>
                              <span>•</span>
                              <span>{order.trackingSteps.filter(s => s.completed).length}/{order.trackingSteps.length} stops</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
