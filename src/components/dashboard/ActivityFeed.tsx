import { cn } from "@/lib/utils";
import {
  UserPlus,
  Shield,
  AlertTriangle,
  Settings,
  LogIn,
  Key,
} from "lucide-react";

interface Activity {
  id: string;
  type: "user_created" | "security" | "alert" | "settings" | "login" | "password_reset";
  message: string;
  actor: string;
  timestamp: string;
}

const activityConfig = {
  user_created: { 
    icon: UserPlus, 
    gradient: "from-success/20 to-success/5",
    iconColor: "text-success",
  },
  security: { 
    icon: Shield, 
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  alert: { 
    icon: AlertTriangle, 
    gradient: "from-warning/20 to-warning/5",
    iconColor: "text-warning",
  },
  settings: { 
    icon: Settings, 
    gradient: "from-muted to-muted/50",
    iconColor: "text-muted-foreground",
  },
  login: { 
    icon: LogIn, 
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  password_reset: { 
    icon: Key, 
    gradient: "from-warning/20 to-warning/5",
    iconColor: "text-warning",
  },
};

// Mock data - will be replaced with Supabase query
const mockActivities: Activity[] = [
  {
    id: "1",
    type: "login",
    message: "Admin logged in from new device",
    actor: "admin@mxlens.com",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    type: "user_created",
    message: "New user account created",
    actor: "support@mxlens.com",
    timestamp: "15 minutes ago",
  },
  {
    id: "3",
    type: "security",
    message: "Rate limit triggered for API endpoint",
    actor: "system",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    type: "settings",
    message: "Feature flag 'advanced_analytics' enabled",
    actor: "cto@mxlens.com",
    timestamp: "2 hours ago",
  },
  {
    id: "5",
    type: "password_reset",
    message: "Password reset approved for user",
    actor: "admin@mxlens.com",
    timestamp: "3 hours ago",
  },
  {
    id: "6",
    type: "alert",
    message: "High error rate detected on analysis endpoint",
    actor: "system",
    timestamp: "4 hours ago",
  },
];

export function ActivityFeed() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-border/50 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Last 20 admin actions</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="dot-indicator dot-success" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </div>
      <div className="max-h-[420px] overflow-y-auto">
        <div className="divide-y divide-border/30">
          {mockActivities.map((activity, index) => {
            const config = activityConfig[activity.type];
            const Icon = config.icon;
            return (
              <div
                key={activity.id}
                className="group flex items-start gap-4 p-4 transition-all duration-300 hover:bg-accent/30 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110",
                    config.gradient
                  )}
                >
                  <Icon className={cn("h-4 w-4", config.iconColor)} />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm text-foreground group-hover:text-primary transition-colors duration-300">
                    {activity.message}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="truncate font-mono">{activity.actor}</span>
                    <span className="text-border">•</span>
                    <span className="shrink-0">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
