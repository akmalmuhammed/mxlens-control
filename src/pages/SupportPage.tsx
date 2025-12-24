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
  Plus,
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Ticket {
  id: string;
  subject: string;
  userEmail: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  assignedTo?: string;
}

// Mock data
const mockTickets: Ticket[] = [
  {
    id: "TKT-001",
    subject: "Unable to access email analysis feature",
    userEmail: "john@company.com",
    status: "open",
    priority: "high",
    createdAt: "2 hours ago",
  },
  {
    id: "TKT-002",
    subject: "Billing question about enterprise plan",
    userEmail: "finance@acme.com",
    status: "in_progress",
    priority: "medium",
    createdAt: "5 hours ago",
    assignedTo: "support@mxlens.com",
  },
  {
    id: "TKT-003",
    subject: "Request for API rate limit increase",
    userEmail: "developer@startup.io",
    status: "open",
    priority: "low",
    createdAt: "1 day ago",
  },
  {
    id: "TKT-004",
    subject: "Account compromised - urgent security issue",
    userEmail: "security@corp.net",
    status: "in_progress",
    priority: "urgent",
    createdAt: "30 minutes ago",
    assignedTo: "secops@mxlens.com",
  },
  {
    id: "TKT-005",
    subject: "Feature request: Export analytics data",
    userEmail: "product@techco.com",
    status: "closed",
    priority: "low",
    createdAt: "3 days ago",
    assignedTo: "support@mxlens.com",
  },
];

const statusConfig = {
  open: { icon: MessageSquare, color: "status-badge-warning", label: "Open" },
  in_progress: { icon: Clock, color: "status-badge-neutral", label: "In Progress" },
  closed: { icon: CheckCircle, color: "status-badge-success", label: "Closed" },
};

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-primary/15 text-primary",
  high: "bg-warning/15 text-warning",
  urgent: "bg-destructive/15 text-destructive",
};

export default function SupportPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
      ticket.userEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="page-container">
        {/* Page Header */}
        <header className="page-header pt-16 lg:pt-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Support Tickets</h1>
            <p className="page-description">
              Manage customer support requests and internal issues
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Ticket
          </Button>
        </header>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tickets List */}
        <div className="space-y-3">
          {filteredTickets.map((ticket) => {
            const statusInfo = statusConfig[ticket.status];
            const StatusIcon = statusInfo.icon;
            return (
              <div
                key={ticket.id}
                className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/30 cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-muted-foreground">
                        {ticket.id}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                          priorityColors[ticket.priority]
                        )}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      {ticket.subject}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {ticket.userEmail}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={cn("status-badge", statusInfo.color)}>
                      <StatusIcon className="h-3 w-3" />
                      {statusInfo.label}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {ticket.createdAt}
                    </span>
                  </div>
                </div>
                {ticket.assignedTo && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Assigned to: <span className="text-foreground">{ticket.assignedTo}</span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
