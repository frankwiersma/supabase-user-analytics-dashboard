import { groupBy } from 'lodash';
import type { 
  DashboardData, 
  ProcessedData, 
  TimeStats, 
  DomainStats, 
  WeeklyActivity, 
  EngagementLevels,
  MonthlyStats 
} from '@/types/dashboard';

export function processCSVDataUtil(data: any[]): DashboardData {
  const processedData: ProcessedData[] = data.map(row => ({
    date: new Date(row.created_at).toISOString(),
    hour: new Date(row.created_at).getHours(),
    dayOfWeek: new Date(row.created_at).getDay(),
    provider: row.provider || 'email',
    hasAvatar: Boolean(row.avatar_url),
    fullName: row.full_name || '',
    email: row.email,
    domain: row.email.split('@')[1],
    engagement: calculateEngagement(row),
    timeOfDay: getTimeOfDay(new Date(row.created_at).getHours())
  }));

  const totalUsers = processedData.length;
  const activeUsers = processedData.filter(u => u.engagement > 0).length;
  const profileComplete = processedData.filter(u => u.hasAvatar && u.fullName).length;
  const completionRate = totalUsers ? Math.round((profileComplete / totalUsers) * 100) : 0;

  return {
    rawData: processedData,
    timeStats: calculateTimeStats(processedData),
    domains: calculateDomainStats(processedData),
    weekActivity: calculateWeeklyActivity(processedData),
    engagement: calculateEngagementLevels(processedData),
    monthlyStats: calculateMonthlyStats(processedData),
    totalUsers,
    activeUsers,
    profileComplete,
    completionRate,
    domainsCount: calculateDomainStats(processedData).length,
    peakActivity: getPeakActivity(processedData),
    monthlySignups: processedData.length,
    monthlyGrowth: calculateMonthlyGrowth(processedData)
  };
}

function calculateEngagement(row: any): number {
  let score = 0;
  
  // Basic profile completion
  if (row.avatar_url) score += 2;
  if (row.full_name) score += 1;
  
  // Activity indicators
  if (row.last_sign_in_at) {
    const lastSignIn = new Date(row.last_sign_in_at);
    const now = new Date();
    const daysSinceLastSignIn = Math.floor((now.getTime() - lastSignIn.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastSignIn < 7) score += 3;
    else if (daysSinceLastSignIn < 30) score += 2;
    else if (daysSinceLastSignIn < 90) score += 1;
  }

  return score;
}

function getTimeOfDay(hour: number): string {
  if (hour >= 5 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 17) return 'Afternoon';
  if (hour >= 17 && hour < 21) return 'Evening';
  return 'Night';
}

function calculateTimeStats(data: ProcessedData[]): TimeStats[] {
  const timeGroups = groupBy(data, 'timeOfDay');
  return Object.entries(timeGroups).map(([time, users]) => ({
    name: time,
    value: users.length
  }));
}

function calculateDomainStats(data: ProcessedData[]): DomainStats[] {
  const domainGroups = groupBy(data, 'domain');
  return Object.entries(domainGroups)
    .map(([domain, users]) => ({
      name: domain,
      users: users.length
    }))
    .sort((a, b) => b.users - a.users)
    .slice(0, 5);
}

function calculateWeeklyActivity(data: ProcessedData[]): WeeklyActivity[] {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayGroups = groupBy(data, 'dayOfWeek');

  return days.map((name, index) => ({
    name,
    total: (dayGroups[index] || []).length,
    withProfile: (dayGroups[index] || []).filter(user => 
      user.hasAvatar && Boolean(user.fullName)
    ).length
  }));
}

function calculateEngagementLevels(data: ProcessedData[]): EngagementLevels {
  return {
    high: data.filter(user => user.engagement >= 4).length,
    medium: data.filter(user => user.engagement >= 2 && user.engagement < 4).length,
    low: data.filter(user => user.engagement < 2).length
  };
}

function calculateMonthlyStats(data: ProcessedData[]): MonthlyStats {
  const now = new Date();
  const thisMonth = data.filter(user => {
    const userDate = new Date(user.date);
    return userDate.getMonth() === now.getMonth() && 
           userDate.getFullYear() === now.getFullYear();
  }).length;

  const lastMonth = data.filter(user => {
    const userDate = new Date(user.date);
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1);
    return userDate.getMonth() === lastMonthDate.getMonth() && 
           userDate.getFullYear() === lastMonthDate.getFullYear();
  }).length;

  const growth = lastMonth ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0;

  return {
    thisMonth,
    monthlyGrowth: `${growth.toFixed(1)}%`
  };
}

function getPeakActivity(data: ProcessedData[]): string {
  const timeStats = calculateTimeStats(data);
  return timeStats.reduce((peak, current) => 
    current.value > peak.value ? current : peak
  ).name;
}

function calculateMonthlyGrowth(data: ProcessedData[]): string {
  const stats = calculateMonthlyStats(data);
  return stats.monthlyGrowth;
}

// Utility function to format dates consistently
export function formatDate(date: Date): string {
  return date.toISOString();
}

// Utility function to calculate percentage
export function calculatePercentage(part: number, total: number): number {
  return total > 0 ? Math.round((part / total) * 100) : 0;
}