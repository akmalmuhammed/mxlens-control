import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Building2,
  Users,
  CreditCard,
  BarChart3,
  UserPlus,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const mockOrg = {
  id: "1",
  name: "Acme Corp",
  ownerEmail: "ceo@acme.com",
  plan: "enterprise",
  membersCount: 47,
  createdAt: "2023-06-15",
  stripeSubscriptionId: "sub_1N2m3O4p5Q6r7S8t",
  mrr: 2350,
};

const mockMembers = [
  { id: "1", name: "John CEO", email: "ceo@acme.com", role: "owner", joinedAt: "2023-06-15" },
  { id: "2", name: "Sarah CTO", email: "cto@acme.com", role: "admin", joinedAt: "2023-06-16" },
  { id: "3", name: "Mike Dev", email: "mike@acme.com", role: "member", joinedAt: "2023-07-01" },
  { id: "4", name: "Emma HR", email: "emma@acme.com", role: "member", joinedAt: "2023-08-15" },
];

const roleColors = {
  owner: "bg-success/15 text-success",
  admin: "bg-primary/15 text-primary",
  member: "bg-muted text-muted-foreground",
};

export default function OrganizationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="page-container">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-4 -ml-2 mt-16 lg:mt-0"
          onClick={() => navigate("/organizations")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Organizations
        </Button>

        {/* Page Header */}
        <header className="page-header flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="page-title">{mockOrg.name}</h1>
              <p className="page-description">{mockOrg.ownerEmail}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Edit Quota
            </Button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-lg font-semibold text-foreground capitalize">
                {mockOrg.plan}
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-lg font-semibold text-foreground">
                {mockOrg.membersCount}
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                MRR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-lg font-semibold text-success">
                ${mockOrg.mrr.toLocaleString()}
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Created
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-sm text-foreground">{mockOrg.createdAt}</span>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Team Members */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase">
                        Member
                      </th>
                      <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase">
                        Role
                      </th>
                      <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {mockMembers.map((member) => (
                      <tr key={member.id}>
                        <td className="py-3">
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {member.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {member.email}
                            </p>
                          </div>
                        </td>
                        <td className="py-3">
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                              roleColors[member.role as keyof typeof roleColors]
                            )}
                          >
                            {member.role}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-muted-foreground">
                          {member.joinedAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Billing Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Billing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Stripe Subscription ID
                </span>
                <span className="text-sm font-mono text-foreground">
                  {mockOrg.stripeSubscriptionId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">MRR</span>
                <span className="text-sm font-semibold text-success">
                  ${mockOrg.mrr.toLocaleString()}/mo
                </span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Change Plan
              </Button>
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
                <span className="text-sm text-muted-foreground">
                  Total Analyses
                </span>
                <span className="text-sm font-semibold text-foreground">
                  12,847
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Quota Used
                </span>
                <span className="text-sm text-foreground">64%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: "64%" }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
