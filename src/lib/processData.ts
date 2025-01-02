import _ from 'lodash';
import { startOfMonth, isWithinInterval, startOfYear } from 'date-fns';
import { TimeStats, DomainStats, WeeklyActivity, EngagementLevels, ProcessedData } from '@/types/dashboard';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface MonthlyStats {
  thisMonth: number;
  monthlyGrowth: string;
}

const getMonthlyStats = (data: ProcessedData[]): MonthlyStats => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const yearStart = startOfYear(now);
  
  const thisMonth = data.filter(user => {
    const created = new Date(user.date);
    return isWithinInterval(created, { start: monthStart, end: now });
  }).length;

  const total = data.filter(user => {
    const created = new Date(user.date);
    return isWithinInterval(created, { start: yearStart, end: now });
  }).length;

  const monthlyGrowth = total ? ((thisMonth / total) * 100).toFixed(1) : 0;

  return { thisMonth, monthlyGrowth };
};

export const processCSVData = (parsedData: Record<string, any>[]) => {
  const processedData = parsedData
    .filter(row => row.created_at && row.email)
    .map(row => {
      try {
        const created = new Date(row.created_at);
        const meta = row.raw_app_meta_data ? JSON.parse(row.raw_app_meta_data) : {};
        const userMeta = row.raw_user_meta_data ? JSON.parse(row.raw_user_meta_data) : {};
        const lastSignIn = new Date(row.last_sign_in_at || created);
        
        return {
          date: row.created_at.split(' ')[0],
          hour: created.getHours(),
          dayOfWeek: created.getDay(),
          provider: meta.provider || 'unknown',
          hasAvatar: Boolean(userMeta.avatar_url),
          fullName: userMeta.full_name || '',
          email: row.email,
          domain: row.email.split('@')[1],
          engagement: Math.max(0, (lastSignIn - created) / (1000 * 60 * 60 * 24)),
          timeOfDay: created.getHours() < 12 ? 'Morning' : 
                    created.getHours() < 17 ? 'Afternoon' : 'Evening'
        };
      } catch (error) {
        console.error('Error processing row:', error);
        return null;
      }
    })
    .filter(Boolean);

  return {
    rawData: processedData,
    timeStats: getTimeDistribution(processedData),
    domains: getDomainStats(processedData),
    weekActivity: getWeeklyActivity(processedData),
    engagement: getEngagementLevels(processedData),
    monthlyStats: getMonthlyStats(processedData)
  };
};

const getTimeDistribution = (data: ProcessedData[]): TimeStats[] => 
  _(data)
    .groupBy('timeOfDay')
    .map((users, time) => ({
      name: time,
      value: users.length
    }))
    .value();

const getDomainStats = (data: ProcessedData[]): DomainStats[] =>
  _(data)
    .groupBy('domain')
    .map((users, domain) => ({
      name: domain,
      users: users.length
    }))
    .orderBy(['users'], ['desc'])
    .take(5)
    .value();

const getWeeklyActivity = (data: ProcessedData[]): WeeklyActivity[] =>
  _(data)
    .groupBy('dayOfWeek')
    .map((users, day) => ({
      name: weekDays[day],
      total: users.length,
      withProfile: users.filter(u => u.hasAvatar && u.fullName).length
    }))
    .sortBy(d => weekDays.indexOf(d.name))
    .value();

const getEngagementLevels = (data: ProcessedData[]): EngagementLevels => ({
  high: data.filter(u => u.engagement > 7).length,
  medium: data.filter(u => u.engagement > 2 && u.engagement <= 7).length,
  low: data.filter(u => u.engagement <= 2).length
});