import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Mail,
  Calendar,
  Clock,
  CreditCard,
  Building2,
  BarChart3,
  Ban,
  Key,
  ScrollText,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data - will be replaced with Supabase query
const mockUser = {
  id: "1",
  email: "john@company.com",
  name: "John Smith",
  plan: "enterprise",
  status: "active",
  organization: "Acme Corp",
  createdAt: "2024-01-15",
  lastLogin: "2024-03-15 09:42:00",
  stripeCustomerId: "cus_OmN2kP3qR4sT5u",
  renewalDate: "2024-04-15",
  analysesThisMonth: 1247,
  quotaRemaining: 8753,
};

const mockRecentActivity = [
  { id: "1", type: "analysis", verdict: "safe", timestamp: "2 minutes ago" },
  { id: "2", type: "analysis", verdict: "suspicious", timestamp: "15 minutes ago" },
  { id: "3", type: "analysis", verdict: "safe", timestamp: "1 hour ago" },
  { id: "4", type: "analysis", verdict: "safe", timestamp: "2 hours ago" },
  { id: "5", type: "analysis", verdict: "phishing", timestamp: "3 hours ago" },
];

const verdictColors = {
  safe: "status-badge-success",
  suspicious: "status-badge-warning",
  phishing: "status-badge-error",
};

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="page-container">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-4 -ml-2 mt-16 lg:mt-0"
          onClick={() => navigate("/users")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>

        {/* Page Header */}
        <header className="page-header flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="page-title">{mockUser.name}</h1>
            <p className="page-description flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {mockUser.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <ScrollText className="mr-2 h-4 w-4" />
              Audit Log
            </Button>
            <Button variant="outline" size="sm">
              <Key className="mr-2 h-4 w-4" />
              Reset Password
            </Button>
            <Button variant="destructive" size="sm">
              <Ban className="mr-2 h-4 w-4" />
              Suspend
            </Button>
          </div>
        </header>

        {/* Info Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="status-badge status-badge-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Active
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-lg font-semibold text-foreground capitalize">
                {mockUser.plan}
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Created
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-sm text-foreground">{mockUser.createdAt}</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Last Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-sm text-foreground">{mockUser.lastLogin}</span>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Subscription Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Stripe Customer ID</span>
                <span className="text-sm font-mono text-foreground">
                  {mockUser.stripeCustomerId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Renewal Date</span>
                <span className="text-sm text-foreground">{mockUser.renewalDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Plan</span>
                <span className="text-sm text-foreground capitalize">{mockUser.plan}</span>
              </div>
            </CardContent>
          </Card>

          {/* Organization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Organization
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockUser.organization ? (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Company</span>
                    <span className="text-sm text-foreground">{mockUser.organization}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Organization
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  This user is not part of any organization.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Usage This Month
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Analyses</span>
                <span className="text-sm font-semibold text-foreground">
                  {mockUser.analysesThisMonth.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Quota Remaining</span>
                <span className="text-sm font-semibold text-success">
                  {mockUser.quotaRemaining.toLocaleString()}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{
                    width: `${(mockUser.analysesThisMonth / (mockUser.analysesThisMonth + mockUser.quotaRemaining)) * 100}%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "status-badge capitalize",
                          verdictColors[activity.verdict as keyof typeof verdictColors]
                        )}
                      >
                        {activity.verdict}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Email analysis
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
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
