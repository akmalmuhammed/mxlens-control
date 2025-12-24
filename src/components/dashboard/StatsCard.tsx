import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: "success" | "warning" | "error" | "neutral";
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  status = "neutral",
  className,
}: StatsCardProps) {
  const statusColors = {
    success: "text-success",
    warning: "text-warning",
    error: "text-destructive",
    neutral: "text-primary",
  };

  const statusBgColors = {
    success: "bg-success/10",
    warning: "bg-warning/10",
    error: "bg-destructive/10",
    neutral: "bg-primary/10",
  };

  return (
    <div
      className={cn(
        "stats-card group animate-fade-in",
        className
      )}
    >
      <div className="relative z-10 flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
            statusBgColors[status]
          )}
        >
          <Icon className={cn("h-5 w-5", statusColors[status])} />
        </div>
      </div>
    </div>
  );
}
