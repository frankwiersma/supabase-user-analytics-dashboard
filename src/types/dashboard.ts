export interface ProcessedData {
  date: string;
  hour: number;
  dayOfWeek: number;
  provider: string;
  hasAvatar: boolean;
  fullName: string;
  email: string;
  domain: string;
  engagement: number;
  timeOfDay: string;
}

export interface TimeStats {
  name: string;
  value: number;
}

export interface DomainStats {
  name: string;
  users: number;
}

export interface WeeklyActivity {
  name: string;
  total: number;
  withProfile: number;
}

export interface EngagementLevels {
  high: number;
  medium: number;
  low: number;
}

export interface MonthlyStats {
  thisMonth: number;
  monthlyGrowth: string;
}

export interface DashboardData {
  rawData: ProcessedData[];
  timeStats: TimeStats[];
  domains: DomainStats[];
  weekActivity: WeeklyActivity[];
  engagement: EngagementLevels;
  monthlyStats: MonthlyStats;
  totalUsers: number;
  activeUsers: number;
  profileComplete: number;
  completionRate: number;
  domainsCount: number;
  peakActivity: string;
  monthlySignups: number;
  monthlyGrowth: string;
}