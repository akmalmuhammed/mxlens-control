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
        <header className="page-header pt-16 lg:pt-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Settings className="h-5 w-5 text-primary" />
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
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ToggleLeft className="h-5 w-5 text-primary" />
                Feature Flags
              </CardTitle>
              <CardDescription>
                Toggle features on/off globally. Changes take effect immediately.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFeatureFlags.map((flag) => (
                  <div
                    key={flag.id}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="space-y-1">
                      <Label htmlFor={flag.id} className="text-sm font-medium text-foreground">
                        {flag.name}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {flag.description}
                      </p>
                    </div>
                    <Switch id={flag.id} checked={flag.enabled} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rate Limits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-primary" />
                Rate Limits
              </CardTitle>
              <CardDescription>
                Configure API and service rate limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="analysis_limit" className="text-sm">
                  Analysis per minute (per user)
                </Label>
                <Input
                  id="analysis_limit"
                  type="number"
                  defaultValue={mockRateLimits.analysisPerMinute}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api_limit" className="text-sm">
                  API requests per hour (per key)
                </Label>
                <Input
                  id="api_limit"
                  type="number"
                  defaultValue={mockRateLimits.apiRequestsPerHour}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login_limit" className="text-sm">
                  Login attempts per hour (per IP)
                </Label>
                <Input
                  id="login_limit"
                  type="number"
                  defaultValue={mockRateLimits.loginAttemptsPerHour}
                />
              </div>
              <Button className="w-full mt-4">
                <Save className="mr-2 h-4 w-4" />
                Save Rate Limits
              </Button>
            </CardContent>
          </Card>

          {/* Maintenance Mode */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Maintenance Mode
              </CardTitle>
              <CardDescription>
                Enable maintenance mode to temporarily disable access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4 bg-warning/5">
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-foreground">
                    Maintenance Mode
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    When enabled, users will see a maintenance page
                  </p>
                </div>
                <Switch />
              </div>
              <div className="rounded-lg border border-border p-4">
                <Label className="text-sm font-medium text-foreground mb-2 block">
                  Status Page URL
                </Label>
                <Input
                  placeholder="https://status.mxlens.com"
                  defaultValue="https://status.mxlens.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* API Status */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                API Status Indicators
              </CardTitle>
              <CardDescription>
                Real-time status of all API endpoints and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { name: "Analysis API", status: "operational", latency: "45ms" },
                  { name: "Auth API", status: "operational", latency: "23ms" },
                  { name: "Billing API", status: "operational", latency: "67ms" },
                  { name: "Webhooks", status: "degraded", latency: "234ms" },
                ].map((api) => (
                  <div
                    key={api.name}
                    className="rounded-lg border border-border p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {api.name}
                      </span>
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full animate-pulse-subtle",
                          api.status === "operational"
                            ? "bg-success"
                            : "bg-warning"
                        )}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "text-xs capitalize",
                          api.status === "operational"
                            ? "text-success"
                            : "text-warning"
                        )}
                      >
                        {api.status}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {api.latency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
