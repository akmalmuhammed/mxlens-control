import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Download,
  RefreshCw,
  ExternalLink,
  UserPlus,
  Shield,
  Settings,
  LogIn,
  Key,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorEmail: string;
  action: string;
  actionType: "user" | "security" | "settings" | "auth" | "alert";
  resource: string;
  status: "success" | "failed" | "pending";
  details?: string;
}

// Mock data
const mockLogs: AuditLogEntry[] = [
  {
    id: "1",
    timestamp: "2024-03-15 14:32:15",
    actorEmail: "admin@mxlens.com",
    action: "User account suspended",
    actionType: "user",
    resource: "user:john@spam.com",
    status: "success",
  },
  {
    id: "2",
    timestamp: "2024-03-15 14:28:00",
    actorEmail: "secops@mxlens.com",
    action: "Rate limit updated",
    actionType: "security",
    resource: "config:rate_limits",
    status: "success",
  },
  {
    id: "3",
    timestamp: "2024-03-15 14:15:22",
    actorEmail: "cto@mxlens.com",
    action: "Feature flag enabled",
    actionType: "settings",
    resource: "feature:advanced_analytics",
    status: "success",
  },
  {
    id: "4",
    timestamp: "2024-03-15 13:45:00",
    actorEmail: "support@mxlens.com",
    action: "Password reset initiated",
    actionType: "auth",
    resource: "user:customer@company.com",
    status: "pending",
    details: "Awaiting second approval",
  },
  {
    id: "5",
    timestamp: "2024-03-15 13:20:11",
    actorEmail: "admin@mxlens.com",
    action: "Failed login attempt detected",
    actionType: "alert",
    resource: "user:admin@mxlens.com",
    status: "failed",
    details: "IP: 192.168.1.100 - 5 failed attempts",
  },
];

const actionTypeConfig = {
  user: { icon: UserPlus, color: "text-primary bg-primary/10" },
  security: { icon: Shield, color: "text-warning bg-warning/10" },
  settings: { icon: Settings, color: "text-muted-foreground bg-muted" },
  auth: { icon: Key, color: "text-primary bg-primary/10" },
  alert: { icon: AlertTriangle, color: "text-destructive bg-destructive/10" },
};

const statusColors = {
  success: "status-badge-success",
  failed: "status-badge-error",
  pending: "status-badge-warning",
};

export default function AuditLogPage() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.actorEmail.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.resource.toLowerCase().includes(search.toLowerCase());
    const matchesAction =
      actionFilter === "all" || log.actionType === actionFilter;
    return matchesSearch && matchesAction;
  });

  return (
    <AdminLayout>
      <div className="page-container">
        {/* Page Header */}
        <header className="page-header pt-16 lg:pt-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Audit Log</h1>
            <p className="page-description">
              Complete history of admin actions for compliance
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </header>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by actor, action, or resource..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Action Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="settings">Settings</SelectItem>
              <SelectItem value="auth">Authentication</SelectItem>
              <SelectItem value="alert">Alert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Audit Log Table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Action
                  </th>
                  <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLogs.map((log) => {
                  const actionConfig = actionTypeConfig[log.actionType];
                  const ActionIcon = actionConfig.icon;
                  return (
                    <tr key={log.id} className="hover:bg-muted/30">
                      <td className="px-4 py-4">
                        <span className="text-sm font-mono text-muted-foreground">
                          {log.timestamp}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-foreground">
                          {log.actorEmail}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded",
                              actionConfig.color
                            )}
                          >
                            <ActionIcon className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-sm text-foreground">
                            {log.action}
                          </span>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-4 py-4">
                        <span className="text-sm font-mono text-muted-foreground">
                          {log.resource}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={cn(
                            "status-badge capitalize",
                            statusColors[log.status]
                          )}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
