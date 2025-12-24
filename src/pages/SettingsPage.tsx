import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Settings,
  ToggleLeft,
  Gauge,
  AlertTriangle,
  Server,
  Save,
  Zap,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

// Mock data
const mockFeatureFlags: FeatureFlag[] = [
  {
    id: "advanced_analytics",
    name: "Advanced Analytics",
    description: "Enable detailed email analysis insights and reports",
    enabled: true,
  },
  {
    id: "ai_threat_detection",
    name: "AI Threat Detection",
    description: "Use machine learning for enhanced threat detection",
    enabled: true,
  },
  {
    id: "bulk_import",
    name: "Bulk Import",
    description: "Allow organizations to bulk import team members",
    enabled: false,
  },
  {
    id: "api_v2",
    name: "API v2 Beta",
    description: "Enable access to the new API version",
    enabled: false,
  },
];

const mockRateLimits = {
  analysisPerMinute: 100,
  apiRequestsPerHour: 1000,
  loginAttemptsPerHour: 10,
};

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="page-container">
        {/* Page Header */}
        <header className="page-header pt-16 lg:pt-0 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="page-title">System Settings</h1>
              <p className="page-description">
                Configure global platform settings and feature flags
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Feature Flags */}
          <div className="lg:col-span-2 glass-card overflow-hidden animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="border-b border-border/50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
                  <ToggleLeft className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Feature Flags</h3>
                  <p className="text-sm text-muted-foreground">
                    Toggle features on/off globally. Changes take effect immediately.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {mockFeatureFlags.map((flag, index) => (
                  <div
                    key={flag.id}
                    className="group flex items-center justify-between rounded-xl border border-border/50 bg-accent/20 p-4 transition-all duration-300 hover:border-primary/30 hover:bg-accent/40 animate-fade-in"
                    style={{ animationDelay: `${150 + index * 50}ms` }}
                  >
                    <div className="space-y-1 pr-4">
                      <Label htmlFor={flag.id} className="text-sm font-medium text-foreground cursor-pointer">
                        {flag.name}
                      </Label>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {flag.description}
                      </p>
                    </div>
                    <Switch 
                      id={flag.id} 
                      checked={flag.enabled}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rate Limits */}
          <div className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="border-b border-border/50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-warning/20 to-warning/5">
                  <Gauge className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Rate Limits</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure API and service rate limits
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="analysis_limit" className="text-sm font-medium">
                  Analysis per minute (per user)
                </Label>
                <Input
                  id="analysis_limit"
                  type="number"
                  defaultValue={mockRateLimits.analysisPerMinute}
                  className="input-premium"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api_limit" className="text-sm font-medium">
                  API requests per hour (per key)
                </Label>
                <Input
                  id="api_limit"
                  type="number"
                  defaultValue={mockRateLimits.apiRequestsPerHour}
                  className="input-premium"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login_limit" className="text-sm font-medium">
                  Login attempts per hour (per IP)
                </Label>
                <Input
                  id="login_limit"
                  type="number"
                  defaultValue={mockRateLimits.loginAttemptsPerHour}
                  className="input-premium"
                />
              </div>
              <Button className="w-full btn-glow group">
                <Save className="mr-2 h-4 w-4" />
                <span>Save Rate Limits</span>
              </Button>
            </div>
          </div>

          {/* Maintenance Mode */}
          <div className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="border-b border-border/50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-warning/20 to-warning/5">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Maintenance Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Temporarily disable access for maintenance
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between rounded-xl border border-warning/20 bg-gradient-to-r from-warning/10 to-warning/5 p-4">
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-foreground">
                    Maintenance Mode
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Users will see a maintenance page
                  </p>
                </div>
                <Switch className="data-[state=checked]:bg-warning" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Status Page URL
                </Label>
                <Input
                  placeholder="https://status.mxlens.com"
                  defaultValue="https://status.mxlens.com"
                  className="input-premium"
                />
              </div>
            </div>
          </div>

          {/* API Status */}
          <div className="lg:col-span-2 glass-card overflow-hidden animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="border-b border-border/50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
                  <Server className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">API Status Indicators</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time status of all API endpoints and services
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { name: "Analysis API", status: "operational", latency: "45ms", icon: Zap },
                  { name: "Auth API", status: "operational", latency: "23ms", icon: Shield },
                  { name: "Billing API", status: "operational", latency: "67ms", icon: Server },
                  { name: "Webhooks", status: "degraded", latency: "234ms", icon: Server },
                ].map((api, index) => (
                  <div
                    key={api.name}
                    className="group relative rounded-xl border border-border/50 bg-accent/20 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-accent/40 animate-fade-in"
                    style={{ animationDelay: `${450 + index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 group-hover:scale-110 transition-transform duration-300">
                        <api.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span
                        className={cn(
                          "dot-indicator",
                          api.status === "operational" ? "dot-success" : "dot-warning"
                        )}
                      />
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {api.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "text-xs font-medium capitalize",
                          api.status === "operational" ? "text-success" : "text-warning"
                        )}
                      >
                        {api.status}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground px-2 py-1 rounded-md bg-muted/50">
                        {api.latency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
