import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, XCircle, Activity } from "lucide-react";

interface HealthItem {
  name: string;
  status: "healthy" | "degraded" | "down";
  latency?: string;
}

// Mock data - will be replaced with real health checks
const healthItems: HealthItem[] = [
  { name: "API Gateway", status: "healthy", latency: "23ms" },
  { name: "Database", status: "healthy", latency: "12ms" },
  { name: "Auth Service", status: "healthy", latency: "45ms" },
  { name: "Analysis Engine", status: "healthy", latency: "156ms" },
  { name: "Email Service", status: "degraded", latency: "1.2s" },
  { name: "CDN", status: "healthy", latency: "8ms" },
];

const statusConfig = {
  healthy: {
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
    dotClass: "dot-success",
    label: "Operational",
  },
  degraded: {
    icon: AlertCircle,
    color: "text-warning",
    bgColor: "bg-warning/10",
    dotClass: "dot-warning",
    label: "Degraded",
  },
  down: {
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    dotClass: "dot-error",
    label: "Down",
  },
};

export function SystemHealth() {
  const allHealthy = healthItems.every((item) => item.status === "healthy");
  const hasDegraded = healthItems.some((item) => item.status === "degraded");

  return (
    <div className="glass-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border/50 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">System Health</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Real-time service status</p>
          </div>
        </div>
        <div
          className={cn(
            "status-badge",
            allHealthy
              ? "status-badge-success"
              : hasDegraded
              ? "status-badge-warning"
              : "status-badge-error"
          )}
        >
          <span
            className={cn(
              "dot-indicator",
              allHealthy ? "dot-success" : hasDegraded ? "dot-warning" : "dot-error"
            )}
          />
          {allHealthy ? "All Operational" : hasDegraded ? "Partial Outage" : "Major Outage"}
        </div>
      </div>
      <div className="divide-y divide-border/30">
        {healthItems.map((item, index) => {
          const config = statusConfig[item.status];
          const Icon = config.icon;
          return (
            <div
              key={item.name}
              className="group flex items-center justify-between px-5 py-4 transition-all duration-300 hover:bg-accent/30 animate-fade-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110",
                  config.bgColor
                )}>
                  <Icon className={cn("h-4 w-4", config.color)} />
                </div>
                <span className="text-sm font-medium text-foreground">{item.name}</span>
              </div>
              <div className="flex items-center gap-4">
                {item.latency && (
                  <span className={cn(
                    "text-xs font-mono px-2 py-1 rounded-md transition-colors duration-300",
                    item.status === "degraded" 
                      ? "text-warning bg-warning/10" 
                      : "text-muted-foreground bg-muted/50"
                  )}>
                    {item.latency}
                  </span>
                )}
                <span className={cn("text-xs font-medium min-w-[80px] text-right", config.color)}>
                  {config.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
