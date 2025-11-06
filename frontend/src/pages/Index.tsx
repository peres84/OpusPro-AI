import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ticket, Package, BarChart3, Users, Truck, ArrowRight } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Ticket,
      title: "Support Tickets",
      description: "Manage and respond to customer tickets efficiently",
      href: "/",
      gradient: "from-primary/20 to-accent/10",
    },
    {
      icon: Package,
      title: "Inventory",
      description: "Track and manage your inventory in real-time",
      href: "/inventory",
      gradient: "from-success/20 to-primary/10",
    },
    {
      icon: BarChart3,
      title: "Metrics",
      description: "Visualize your performance with detailed analytics",
      href: "/metrics",
      gradient: "from-accent/20 to-destructive/10",
    },
    {
      icon: Users,
      title: "Providers",
      description: "Manage your provider relationships seamlessly",
      href: "/providers",
      gradient: "from-warning/20 to-success/10",
    },
    {
      icon: Truck,
      title: "Logistics",
      description: "Optimize your supply chain and deliveries",
      href: "/logistics",
      gradient: "from-destructive/20 to-warning/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent leading-tight animate-gradient mb-6">
            Welcome to OpusPro
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Your all-in-one platform for managing operations, support, and logistics with elegance
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Link key={index} to={feature.href}>
              <Card className="group p-8 bg-card/60 backdrop-blur-sm border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                <div className="space-y-4">
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                    Explore
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="inline-block p-8 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 backdrop-blur-sm border-primary/20 shadow-2xl">
            <p className="text-muted-foreground mb-4">Ready to get started?</p>
            <Link to="/">
              <Button size="lg" className="shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                <Ticket className="h-5 w-5 mr-2" />
                View Support Tickets
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
