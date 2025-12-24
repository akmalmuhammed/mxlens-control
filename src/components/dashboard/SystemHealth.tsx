import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

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
    label: "Operational",
  },
  degraded: {
    icon: AlertCircle,
    color: "text-warning",
    bgColor: "bg-warning/10",
    label: "Degraded",
  },
  down: {
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    label: "Down",
  },
};

export function SystemHealth() {
  const allHealthy = healthItems.every((item) => item.status === "healthy");
  const hasDegraded = healthItems.some((item) => item.status === "degraded");

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">System Health</h3>
          <p className="text-xs text-muted-foreground">Real-time service status</p>
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
              "h-1.5 w-1.5 rounded-full animate-pulse-subtle",
              allHealthy ? "bg-success" : hasDegraded ? "bg-warning" : "bg-destructive"
            )}
          />
          {allHealthy ? "All Systems Operational" : hasDegraded ? "Partial Outage" : "Major Outage"}
        </div>
      </div>
      <div className="divide-y divide-border">
        {healthItems.map((item) => {
          const config = statusConfig[item.status];
          const Icon = config.icon;
          return (
            <div
              key={item.name}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className={cn("rounded-md p-1.5", config.bgColor)}>
                  <Icon className={cn("h-3.5 w-3.5", config.color)} />
                </div>
                <span className="text-sm text-foreground">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {item.latency && (
                  <span className="text-xs text-muted-foreground font-mono">
                    {item.latency}
                  </span>
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    config.color
                  )}
                >
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
