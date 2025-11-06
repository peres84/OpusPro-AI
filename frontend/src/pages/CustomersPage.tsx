import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Search, MoreVertical, Eye, Download, ShoppingBag, Package, Euro, Calendar } from "lucide-react";

// Mock customer orders data
const customerOrders = [
  {
    transactionId: "TXN-2024-001234",
    customerName: "Sarah Johnson",
    email: "sarah.j@example.com",
    items: [
      { name: "Wireless Headphones", quantity: 2, price: 89.99 },
      { name: "USB-C Cable", quantity: 3, price: 12.99 },
    ],
    totalAmount: 218.95,
    status: "completed",
    orderDate: "2024-01-15",
    paymentMethod: "Credit Card",
  },
  {
    transactionId: "TXN-2024-001235",
    customerName: "Michael Chen",
    email: "m.chen@example.com",
    items: [
      { name: "Smart Watch", quantity: 1, price: 299.99 },
      { name: "Screen Protector", quantity: 2, price: 9.99 },
    ],
    totalAmount: 319.97,
    status: "processing",
    orderDate: "2024-01-16",
    paymentMethod: "PayPal",
  },
  {
    transactionId: "TXN-2024-001236",
    customerName: "Emma Williams",
    email: "emma.w@example.com",
    items: [
      { name: "Laptop Stand", quantity: 1, price: 45.00 },
      { name: "Wireless Mouse", quantity: 1, price: 29.99 },
      { name: "Keyboard", quantity: 1, price: 79.99 },
    ],
    totalAmount: 154.98,
    status: "completed",
    orderDate: "2024-01-16",
    paymentMethod: "Credit Card",
  },
  {
    transactionId: "TXN-2024-001237",
    customerName: "James Brown",
    email: "james.b@example.com",
    items: [
      { name: "Phone Case", quantity: 1, price: 19.99 },
      { name: "Tempered Glass", quantity: 2, price: 8.99 },
    ],
    totalAmount: 37.97,
    status: "shipped",
    orderDate: "2024-01-17",
    paymentMethod: "Debit Card",
  },
  {
    transactionId: "TXN-2024-001238",
    customerName: "Olivia Garcia",
    email: "olivia.g@example.com",
    items: [
      { name: "Bluetooth Speaker", quantity: 1, price: 69.99 },
      { name: "Power Bank", quantity: 1, price: 39.99 },
    ],
    totalAmount: 109.98,
    status: "pending",
    orderDate: "2024-01-17",
    paymentMethod: "Credit Card",
  },
  {
    transactionId: "TXN-2024-001239",
    customerName: "Daniel Martinez",
    email: "d.martinez@example.com",
    items: [
      { name: "Gaming Mouse", quantity: 1, price: 59.99 },
      { name: "Mouse Pad", quantity: 1, price: 14.99 },
      { name: "HDMI Cable", quantity: 2, price: 11.99 },
    ],
    totalAmount: 98.96,
    status: "completed",
    orderDate: "2024-01-18",
    paymentMethod: "PayPal",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-success/10 text-success border-success/20 hover:bg-success/20";
    case "processing":
      return "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20";
    case "shipped":
      return "bg-accent/10 text-accent border-accent/20 hover:bg-accent/20";
    case "pending":
      return "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return "✓";
    case "processing":
      return "⟳";
    case "shipped":
      return "→";
    case "pending":
      return "○";
    default:
      return "•";
  }
};

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = customerOrders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate summary statistics
  const totalRevenue = customerOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const completedOrders = customerOrders.filter((o) => o.status === "completed").length;
  const totalOrders = customerOrders.length;
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-6 md:p-10">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3">
            Customer Orders
          </h1>
          <p className="text-muted-foreground text-lg">Track and manage all customer purchases</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-success/20 to-primary/10 flex items-center justify-center">
                <Euro className="h-5 w-5 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">€{totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">From {totalOrders} orders</p>
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">{completedOrders} completed</p>
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Order Value</CardTitle>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">€{avgOrderValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">Per transaction</p>
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Latest Order</CardTitle>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-warning/20 to-success/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{customerOrders[customerOrders.length - 1].orderDate}</div>
              <p className="text-xs text-muted-foreground mt-1 truncate">{customerOrders[customerOrders.length - 1].customerName}</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-xl">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">All Orders</CardTitle>
                <CardDescription className="mt-1">View detailed order information and customer purchases</CardDescription>
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email or transaction ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">Transaction ID</TableHead>
                    <TableHead className="font-semibold">Customer</TableHead>
                    <TableHead className="font-semibold">Items</TableHead>
                    <TableHead className="font-semibold">Total</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.transactionId} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-sm">{order.transactionId}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">{order.customerName}</span>
                          <span className="text-xs text-muted-foreground">{order.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-sm">
                              <span className="font-medium">{item.name}</span>
                              <span className="text-muted-foreground"> × {item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-foreground">€{order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          <span className="mr-1">{getStatusIcon(order.status)}</span>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{order.orderDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No orders found matching your search.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
