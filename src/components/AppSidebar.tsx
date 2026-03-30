import { LayoutDashboard, Map, BarChart3, Cable, GitCompare, Wallet } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Route Planning", url: "/map", icon: Map },
  { title: "Cost Analysis", url: "/analysis", icon: BarChart3 },
  { title: "Scenarios", url: "/scenarios", icon: GitCompare },
  { title: "Budget Mode", url: "/budget", icon: Wallet },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-card">
        <div className={`p-4 ${collapsed ? "px-2" : ""}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-sm">
              <Cable className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-sm font-bold text-foreground tracking-tight">FTTP Cost</h1>
                <p className="text-[10px] text-muted-foreground font-medium">Intelligence Platform</p>
              </div>
            )}
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/70 text-[10px] uppercase tracking-widest">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === "/"} className="hover:bg-accent rounded-lg transition-colors" activeClassName="bg-primary/10 text-primary font-semibold">
                      <item.icon className="w-4 h-4 mr-2" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
