
import { Home, MessageSquare, Users, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/"
  },
  {
    title: "Message Generator",
    icon: MessageSquare,
    path: "/message-generator"
  },
  {
    title: "Leads",
    icon: Users,
    path: "/leads"
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings"
  }
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <span className="font-bold text-xl text-sidebar-foreground">OutFlo</span>
        </div>
        <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent" />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => cn(
                        "flex items-center gap-2",
                        isActive ? "text-sidebar-primary font-medium" : "text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 flex justify-between items-center">
        <span className="text-xs text-sidebar-foreground/70">© OutFlo 2025</span>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
