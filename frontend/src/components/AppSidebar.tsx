import { NavLink } from "react-router-dom";
import { Ticket, Package, BarChart3, Users, Truck, Settings, User, LogOut, Bell, ShoppingCart } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { title: "Tickets", url: "/", icon: Ticket },
  { title: "Customers", url: "/customers", icon: ShoppingCart },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Metrics", url: "/metrics", icon: BarChart3 },
  { title: "Providers", url: "/providers", icon: Users },
  { title: "Logistics", url: "/logistics", icon: Truck },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border shadow-xl">
      <SidebarHeader className="border-b border-sidebar-border p-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent animate-gradient dark:from-blue-400 dark:via-teal-400 dark:to-emerald-400">
            OpusPro
          </h1>
        </div>
        <div className="flex items-center justify-between gap-2">
          <ThemeToggle />
          <button className="relative h-9 w-9 rounded-full bg-sidebar-accent hover:bg-sidebar-accent/70 flex items-center justify-center transition-all duration-200 hover:scale-110">
            <Bell className="h-4 w-4 text-sidebar-foreground" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full border-2 border-sidebar-background animate-pulse" />
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden ${
                          isActive
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                            : "text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {/* Background animation on hover */}
                          {!isActive && (
                            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          )}

                          <item.icon
                            className={`relative z-10 h-5 w-5 transition-all duration-300 ${
                              isActive
                                ? 'scale-110 text-white'
                                : 'text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:rotate-12'
                            }`}
                          />
                          <span className={`relative z-10 font-semibold tracking-wide ${isActive ? 'text-white' : 'text-sidebar-foreground'}`}>{item.title}</span>

                          {/* Active indicator */}
                          {isActive && (
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-600 dark:bg-white rounded-l-full" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sidebar-accent transition-all duration-200 hover:shadow-md group">
              <Avatar className="h-10 w-10 border-2 border-primary/20 group-hover:border-primary/40 transition-all">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=OpusPro" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                  OP
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-sidebar-foreground group-hover:text-primary transition-colors">
                  John Doe
                </p>
                <p className="text-xs text-muted-foreground">john@opuspro.com</p>
              </div>
              <Settings className="h-4 w-4 text-muted-foreground group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
