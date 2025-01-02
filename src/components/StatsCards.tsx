import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, Clock, UserCheck, TrendingUp } from 'lucide-react';

interface Props {
  totalUsers: number;
  activeUsers: number;
  profileComplete: number;
  completionRate: number;
  domainsCount: number;
  peakActivity: string;
  monthlySignups: number;
  monthlyGrowth: string;
}

export const StatsCards = ({
  totalUsers,
  activeUsers,
  profileComplete,
  completionRate,
  domainsCount,
  peakActivity,
  monthlySignups,
  monthlyGrowth
}: Props) => (
  <div className="grid gap-4 md:grid-cols-5">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Monthly Signups</CardTitle>
        <TrendingUp className="h-4 w-4 text-emerald-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{monthlySignups}</div>
        <p className="text-xs text-emerald-500">+{monthlyGrowth}% this month</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
        <Users className="h-4 w-4 text-emerald-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalUsers}</div>
        <p className="text-xs text-emerald-500">Across {domainsCount} domains</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
        <Activity className="h-4 w-4 text-emerald-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{activeUsers}</div>
        <p className="text-xs text-emerald-500">{Math.round((activeUsers / totalUsers) * 100)}% engaged</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
        <UserCheck className="h-4 w-4 text-emerald-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{completionRate}%</div>
        <p className="text-xs text-emerald-500">{profileComplete} complete profiles</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Peak Activity</CardTitle>
        <Clock className="h-4 w-4 text-emerald-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{peakActivity}</div>
        <p className="text-xs text-emerald-500">Most active period</p>
      </CardContent>
    </Card>
  </div>
);