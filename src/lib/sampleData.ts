export const generateSampleData = () => {
  const timeStats = [
    { name: 'Morning', value: 45 },
    { name: 'Afternoon', value: 78 },
    { name: 'Evening', value: 32 }
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

  return {
    timeStats,
    domains,
    weekActivity,
    engagement,
    totalUsers: 250,
    activeUsers: 180,
    profileComplete: 145,
    completionRate: 58,
    domainsCount: 12,
    peakActivity: 'Afternoon'
  };
};