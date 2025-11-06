import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const providers = [
  {
    id: 1,
    companyName: "MetallWerk Russo GmbH",
    category: "Metal Fabrication",
    reliabilityScore: 4.8,
    contactEmail: "contact@metallwerk-russo.de",
    phone: "+49 30 1234567",
  },
  {
    id: 2,
    companyName: "Peres Industrial Solutions",
    category: "Industrial Equipment",
    reliabilityScore: 4.6,
    contactEmail: "info@peres-industrial.com",
    phone: "+49 40 9876543",
  },
];

const activeOrders = [
  {
    orderId: "ORD-2024-001",
    providerName: "MetallWerk Russo GmbH",
    items: [
      { name: "Steel Plates", category: "Raw Materials", units: 100, unitPrice: 45.50 },
      { name: "Aluminum Sheets", category: "Raw Materials", units: 50, unitPrice: 38.00 },
    ],
    estimatedDelivery: "2025-10-15",
    status: "In Transit",
  },
  {
    orderId: "ORD-2024-002",
    providerName: "Peres Industrial Solutions",
    items: [
      { name: "Hydraulic Press", category: "Equipment", units: 1, unitPrice: 12500.00 },
    ],
    estimatedDelivery: "2025-10-20",
    status: "Processing",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Transit":
      return "bg-accent text-accent-foreground";
    case "Processing":
      return "bg-warning text-warning-foreground";
    case "Delivered":
      return "bg-success text-success-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function ProvidersPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Providers</h1>
        <p className="text-muted-foreground">Manage your supplier relationships</p>
      </div>

      <div className="space-y-8">
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Providers List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Reliability Score</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providers.map((provider) => (
                  <TableRow key={provider.id}>
                    <TableCell className="font-medium">{provider.companyName}</TableCell>
                    <TableCell>{provider.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-accent">
                          {provider.reliabilityScore}
                        </span>
                        <span className="text-muted-foreground">/ 5.0</span>
                      </div>
                    </TableCell>
                    <TableCell>{provider.contactEmail}</TableCell>
                    <TableCell>{provider.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activeOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="border border-border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{order.orderId}</h3>
                      <p className="text-sm text-muted-foreground">{order.providerName}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>

                  <div className="border-t border-border pt-3">
                    <h4 className="text-sm font-medium text-foreground mb-2">Items Ordered</h4>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-sm bg-muted/50 p-2 rounded"
                        >
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-foreground">{item.name}</span>
                            <span className="text-muted-foreground">{item.category}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-muted-foreground">
                              {item.units} units × €{item.unitPrice.toFixed(2)}
                            </span>
                            <span className="font-semibold text-foreground">
                              €{(item.units * item.unitPrice).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                    <span className="text-muted-foreground">Estimated Delivery</span>
                    <span className="font-medium text-foreground">
                      {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
