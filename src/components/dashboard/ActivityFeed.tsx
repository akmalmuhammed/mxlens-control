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

const activityIcons = {
  user_created: UserPlus,
  security: Shield,
  alert: AlertTriangle,
  settings: Settings,
  login: LogIn,
  password_reset: Key,
};

const activityColors = {
  user_created: "text-success bg-success/10",
  security: "text-primary bg-primary/10",
  alert: "text-warning bg-warning/10",
  settings: "text-muted-foreground bg-muted",
  login: "text-primary bg-primary/10",
  password_reset: "text-warning bg-warning/10",
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
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border p-4">
        <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
        <p className="text-xs text-muted-foreground">Last 20 admin actions</p>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        <div className="divide-y divide-border">
          {mockActivities.map((activity, index) => {
            const Icon = activityIcons[activity.type];
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-4 transition-colors hover:bg-muted/30"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    activityColors[activity.type]
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="truncate">{activity.actor}</span>
                    <span>•</span>
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
