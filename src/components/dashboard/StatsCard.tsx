import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

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
  delay?: number;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  status = "neutral",
  className,
  delay = 0,
}: StatsCardProps) {
  const statusConfig = {
    success: {
      iconBg: "bg-success/10",
      iconColor: "text-success",
      glow: "group-hover:shadow-[0_0_30px_-5px_hsl(var(--success)/0.3)]",
    },
    warning: {
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
      glow: "group-hover:shadow-[0_0_30px_-5px_hsl(var(--warning)/0.3)]",
    },
    error: {
      iconBg: "bg-destructive/10",
      iconColor: "text-destructive",
      glow: "group-hover:shadow-[0_0_30px_-5px_hsl(var(--destructive)/0.3)]",
    },
    neutral: {
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      glow: "group-hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "stats-card group",
        config.glow,
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground tracking-wide">
            {title}
          </p>
          <div className="space-y-1">
            <p className="text-3xl font-semibold tracking-tight text-foreground">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {trend && (
            <div className="flex items-center gap-1.5">
              <div className={cn(
                "flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-md",
                trend.isPositive 
                  ? "text-success bg-success/10" 
                  : "text-destructive bg-destructive/10"
              )}>
                {trend.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </div>
              <span className="text-xs text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
            config.iconBg
          )}
        >
          <Icon className={cn("h-6 w-6 transition-colors duration-300", config.iconColor)} />
        </div>
      </div>
    </div>
  );
}
