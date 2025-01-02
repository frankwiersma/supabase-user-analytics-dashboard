import { DashboardData } from '@/types/dashboard';

export const generateSampleData = (): DashboardData => {
  const timeStats = [
    { name: 'Morning', value: 45 },
    { name: 'Afternoon', value: 78 },
    { name: 'Evening', value: 32 },
    { name: 'Night', value: 25 }
  ];

  const domains = [
    { name: 'gmail.com', users: 85 },
    { name: 'outlook.com', users: 45 },
    { name: 'company.com', users: 32 },
    { name: 'yahoo.com', users: 28 },
    { name: 'proton.me', users: 15 }
  ];

  const weekActivity = [
    { name: 'Mon', total: 45, withProfile: 32 },
    { name: 'Tue', total: 52, withProfile: 38 },
    { name: 'Wed', total: 58, withProfile: 42 },
    { name: 'Thu', total: 48, withProfile: 35 },
    { name: 'Fri', total: 38, withProfile: 28 },
    { name: 'Sat', total: 25, withProfile: 18 },
    { name: 'Sun', total: 22, withProfile: 15 }
  ];

  const engagement = {
    high: 85,
    medium: 120,
    low: 45
  };

  // Generate sample raw data
  const rawData = Array.from({ length: 50 }, (_, i) => ({
    date: new Date(2024, 0, i + 1).toISOString(),
    hour: Math.floor(Math.random() * 24),
    dayOfWeek: Math.floor(Math.random() * 7),
    provider: ['email', 'google', 'github'][Math.floor(Math.random() * 3)],
    hasAvatar: Math.random() > 0.5,
    fullName: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    domain: ['gmail.com', 'outlook.com', 'company.com'][Math.floor(Math.random() * 3)],
    engagement: Math.floor(Math.random() * 5),
    timeOfDay: ['Morning', 'Afternoon', 'Evening', 'Night'][Math.floor(Math.random() * 4)]
  }));

  return {
    rawData,
    timeStats,
    domains,
    weekActivity,
    engagement,
    monthlyStats: {
      thisMonth: 250,
      monthlyGrowth: '23.5%'
    },
    totalUsers: 250,
    activeUsers: 180,
    profileComplete: 145,
    completionRate: 58,
    domainsCount: 5,
    peakActivity: 'Afternoon',
    monthlySignups: 250,
    monthlyGrowth: '23.5%'
  };
};