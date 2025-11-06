import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package, Euro, TrendingUp, Clock, Star, BarChart, ArrowUp, ArrowDown, Activity } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Legend,
} from "recharts";

// Mockup data for revenue trends
const revenueData = [
  { month: "Jan", revenue: 32000, orders: 245 },
  { month: "Feb", revenue: 38000, orders: 289 },
  { month: "Mar", revenue: 35000, orders: 267 },
  { month: "Apr", revenue: 42000, orders: 312 },
  { month: "May", revenue: 45000, orders: 334 },
  { month: "Jun", revenue: 48000, orders: 356 },
  { month: "Jul", revenue: 52000, orders: 389 },
];

// Mockup data for order distribution
const orderDistribution = [
  { name: "Electronics", value: 345, color: "hsl(var(--primary))" },
  { name: "Clothing", value: 289, color: "hsl(var(--accent))" },
  { name: "Food", value: 234, color: "hsl(var(--success))" },
  { name: "Home", value: 198, color: "hsl(var(--warning))" },
  { name: "Other", value: 168, color: "hsl(var(--destructive))" },
];

// Weekly performance data
const weeklyData = [
  { day: "Mon", tickets: 45, resolved: 38 },
  { day: "Tue", tickets: 52, resolved: 47 },
  { day: "Wed", tickets: 48, resolved: 42 },
  { day: "Thu", tickets: 61, resolved: 55 },
  { day: "Fri", tickets: 58, resolved: 52 },
  { day: "Sat", tickets: 34, resolved: 31 },
  { day: "Sun", tickets: 28, resolved: 25 },
];

const metrics = [
  {
    title: "Total Revenue",
    value: "€292K",
    icon: Euro,
    description: "+12.5% from last month",
    trend: "up",
    trendValue: "12.5%",
    gradient: "from-primary/20 to-accent/10",
  },
  {
    title: "Orders Completed",
    value: "2,392",
    icon: Package,
    description: "+8.2% from last month",
    trend: "up",
    trendValue: "8.2%",
    gradient: "from-success/20 to-primary/10",
  },
  {
    title: "Avg Order Value",
    value: "€122",
    icon: TrendingUp,
    description: "-2.4% from last month",
    trend: "down",
    trendValue: "2.4%",
    gradient: "from-accent/20 to-destructive/10",
  },
  {
    title: "Active Tickets",
    value: "89",
    icon: Clock,
    description: "23 resolved today",
    trend: "up",
    trendValue: "15.3%",
    gradient: "from-warning/20 to-success/10",
  },
  {
    title: "Customer Rating",
    value: "4.8/5",
    icon: Star,
    description: "Based on 1,234 reviews",
    trend: "up",
    trendValue: "3.2%",
    gradient: "from-destructive/20 to-warning/10",
  },
  {
    title: "Response Time",
    value: "2.3h",
    icon: Activity,
    description: "-18% faster than average",
    trend: "up",
    trendValue: "18%",
    gradient: "from-primary/20 to-success/10",
  },
];

export default function MetricsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-6 md:p-10">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3">
            Performance Metrics
          </h1>
          <p className="text-muted-foreground text-lg">Real-time insights into your business operations</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric) => (
            <Card
              key={metric.title}
              className="bg-card/60 backdrop-blur-sm border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </CardTitle>
                  <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                </div>
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center shadow-lg`}>
                  <metric.icon className="h-6 w-6 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm">
                  {metric.trend === "up" ? (
                    <div className="flex items-center gap-1 text-success font-semibold">
                      <ArrowUp className="h-4 w-4" />
                      {metric.trendValue}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-destructive font-semibold">
                      <ArrowDown className="h-4 w-4" />
                      {metric.trendValue}
                    </div>
                  )}
                  <span className="text-muted-foreground">{metric.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Trends */}
          <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                Revenue Trends
              </CardTitle>
              <CardDescription>Monthly revenue and order volume over the past 7 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Order Distribution */}
          <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center">
                  <BarChart className="h-4 w-4 text-accent" />
                </div>
                Order Distribution
              </CardTitle>
              <CardDescription>Product categories breakdown for the current period</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {orderDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Performance */}
        <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-success/20 to-primary/10 flex items-center justify-center">
                <Activity className="h-4 w-4 text-success" />
              </div>
              Weekly Ticket Performance
            </CardTitle>
            <CardDescription>Comparison of tickets received vs resolved over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="tickets" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                <Bar dataKey="resolved" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
