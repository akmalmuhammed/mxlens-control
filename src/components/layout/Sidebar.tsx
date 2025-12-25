import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  LifeBuoy,
  ScrollText,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Scan,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: string[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Users", href: "/users", icon: Users },
  { label: "Organizations", href: "/organizations", icon: Building2 },
  { label: "Support", href: "/support", icon: LifeBuoy },
  { label: "Audit Log", href: "/audit", icon: ScrollText, roles: ["SuperAdmin"] },
  { label: "Settings", href: "/settings", icon: Settings, roles: ["SuperAdmin"] },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // TODO: Replace with actual user role from auth context
  const userRole = "SuperAdmin";

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  );

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden glass-card border-border/50 backdrop-blur-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative w-5 h-5">
          <Menu 
            className={cn(
              "h-5 w-5 absolute inset-0 transition-all duration-300",
              isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            )} 
          />
          <X 
            className={cn(
              "h-5 w-5 absolute inset-0 transition-all duration-300",
              isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            )} 
          />
        </div>
      </Button>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/60 backdrop-blur-md lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-72 border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl transition-all duration-500 ease-out-expo lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-sidebar-border/50 px-6">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent border border-primary/30">
                <Scan className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success border-2 border-sidebar" />
            </div>
            <div>
              <span className="text-base font-semibold text-foreground tracking-tight">
                MXLens
              </span>
              <span className="text-xs text-muted-foreground block -mt-0.5">Admin Panel</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            <p className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-widest px-3 mb-3">
              Navigation
            </p>
            {filteredNavItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: mounted ? `${index * 50}ms` : '0ms' }}
                  className={cn(
                    "sidebar-link group",
                    mounted && "animate-slide-in-left",
                    isActive
                      ? "sidebar-link-active"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300",
                    isActive 
                      ? "bg-primary/15" 
                      : "bg-transparent group-hover:bg-accent/50"
                  )}>
                    <item.icon
                      className={cn(
                        "h-4 w-4 transition-all duration-300",
                        isActive 
                          ? "text-primary" 
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                  </div>
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight 
                    className={cn(
                      "h-4 w-4 text-muted-foreground/50 transition-all duration-300",
                      isActive 
                        ? "opacity-100 translate-x-0" 
                        : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    )} 
                  />
                </NavLink>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-sidebar-border/50 p-4">
            <div className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-sidebar-accent/50 to-transparent p-3 transition-all duration-300 hover:from-sidebar-accent cursor-pointer">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 text-primary font-medium border border-primary/20">
                  AD
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-sidebar" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  Admin User
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {userRole}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
