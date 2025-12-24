import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Organization {
  id: string;
  name: string;
  ownerEmail: string;
  plan: "pro" | "business" | "enterprise";
  membersCount: number;
  createdAt: string;
}

// Mock data - will be replaced with Supabase query
const mockOrganizations: Organization[] = [
  {
    id: "1",
    name: "Acme Corp",
    ownerEmail: "ceo@acme.com",
    plan: "enterprise",
    membersCount: 47,
    createdAt: "2023-06-15",
  },
  {
    id: "2",
    name: "Tech Solutions",
    ownerEmail: "admin@techsolutions.com",
    plan: "business",
    membersCount: 12,
    createdAt: "2023-09-22",
  },
  {
    id: "3",
    name: "StartupXYZ",
    ownerEmail: "founder@startupxyz.io",
    plan: "pro",
    membersCount: 5,
    createdAt: "2024-01-10",
  },
  {
    id: "4",
    name: "Global Industries",
    ownerEmail: "it@globalind.com",
    plan: "enterprise",
    membersCount: 156,
    createdAt: "2022-11-05",
  },
];

const planColors = {
  pro: "bg-primary/15 text-primary",
  business: "bg-warning/15 text-warning",
  enterprise: "bg-success/15 text-success",
};

export default function OrganizationsPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredOrgs = mockOrganizations.filter(
    (org) =>
      org.name.toLowerCase().includes(search.toLowerCase()) ||
      org.ownerEmail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="page-container">
        {/* Page Header */}
        <header className="page-header pt-16 lg:pt-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Organizations</h1>
            <p className="page-description">
              Manage team accounts and subscriptions
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Organization
          </Button>
        </header>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by company name or domain..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Organizations Table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Organization
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Members
                  </th>
                  <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrgs.map((org) => (
                  <tr
                    key={org.id}
                    className="table-row-interactive"
                    onClick={() => navigate(`/organizations/${org.id}`)}
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {org.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {org.ownerEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                          planColors[org.plan]
                        )}
                      >
                        {org.plan}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">
                          {org.membersCount}
                        </span>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-4 py-4 text-sm text-muted-foreground">
                      {org.createdAt}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/organizations/${org.id}`);
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Users className="mr-2 h-4 w-4" />
                            View Members
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Settings className="mr-2 h-4 w-4" />
                            Edit Quota
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Showing 1-4 of {filteredOrgs.length} organizations
            </p>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
