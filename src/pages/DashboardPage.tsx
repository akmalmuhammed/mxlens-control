import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { SystemHealth } from "@/components/dashboard/SystemHealth";
import {
  Users,
  Building2,
  BarChart3,
  LifeBuoy,
  TrendingUp,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="page-container">
        {/* Page Header */}
        <header className="page-header pt-16 lg:pt-0 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="page-title">Dashboard</h1>
              <p className="page-description">
                Welcome back. Here's what's happening with MXLens today.
              </p>
            </div>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
          <StatsCard
            title="Total Users"
            value="12,847"
            subtitle="Active accounts"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            status="success"
            delay={0}
          />
          <StatsCard
            title="Organizations"
            value="342"
            subtitle="Active teams"
            icon={Building2}
            trend={{ value: 8, isPositive: true }}
            status="neutral"
            delay={100}
          />
          <StatsCard
            title="Analyses Today"
            value="45,231"
            subtitle="Email scans processed"
            icon={BarChart3}
            trend={{ value: 23, isPositive: true }}
            status="success"
            delay={200}
          />
          <StatsCard
            title="Open Tickets"
            value="7"
            subtitle="Awaiting response"
            icon={LifeBuoy}
            status="warning"
            delay={300}
          />
        </div>

        {/* Secondary Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          <StatsCard
            title="Error Rate"
            value="0.12%"
            subtitle="Last 24 hours"
            icon={AlertTriangle}
            status="success"
            delay={400}
          />
          <StatsCard
            title="MRR"
            value="$48,320"
            subtitle="Monthly recurring revenue"
            icon={TrendingUp}
            trend={{ value: 15, isPositive: true }}
            status="success"
            delay={500}
          />
          <StatsCard
            title="Avg Response Time"
            value="124ms"
            subtitle="API latency (p95)"
            icon={BarChart3}
            status="neutral"
            delay={600}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <SystemHealth />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
