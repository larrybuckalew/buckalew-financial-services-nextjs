import { NextResponse } from 'next/server';

// Mock data for the AnalyticsDashboard
const mockMetricsData = {
  userMetrics: {
    dailySignups: [
      { date: '2025-09-25', count: 10 },
      { date: '2025-09-26', count: 15 },
      { date: '2025-09-27', count: 20 },
      { date: '2025-09-28', count: 12 },
      { date: '2025-09-29', count: 18 },
      { date: '2025-09-30', count: 25 },
      { date: '2025-10-01', count: 30 },
    ],
    userTypes: [
      { type: 'Admin', count: 5 },
      { type: 'Agent', count: 20 },
      { type: 'Client', count: 75 },
    ],
    retentionRate: [
      { date: '2025-07-01', rate: 0.85 },
      { date: '2025-08-01', rate: 0.82 },
      { date: '2025-09-01', rate: 0.88 },
      { date: '2025-10-01', rate: 0.90 },
    ],
  },
  contentMetrics: {
    postsByCategory: [
      { category: 'Life Insurance', count: 40 },
      { category: 'Health Insurance', count: 30 },
      { category: 'Retirement', count: 20 },
      { category: 'Mortgage', count: 10 },
    ],
    engagementOverTime: [
      { date: '2025-09-25', views: 100, comments: 5 },
      { date: '2025-09-26', views: 120, comments: 7 },
      { date: '2025-09-27', views: 150, comments: 10 },
      { date: '2025-09-28', views: 110, comments: 6 },
      { date: '2025-09-29', views: 130, comments: 8 },
      { date: '2025-09-30', views: 160, comments: 12 },
      { date: '2025-10-01', views: 180, comments: 15 },
    ],
    popularTags: [
      { tag: 'Term Life', count: 50 },
      { tag: 'Medicare', count: 45 },
      { tag: 'IRA', count: 30 },
      { tag: 'ACA', count: 25 },
    ],
  },
  financialMetrics: {
    revenue: [
      { date: '2025-07-01', amount: 5000 },
      { date: '2025-08-01', amount: 5500 },
      { date: '2025-09-01', amount: 6000 },
      { date: '2025-10-01', amount: 6500 },
    ],
    subscriptions: [
      { date: '2025-07-01', active: 100, cancelled: 5 },
      { date: '2025-08-01', active: 105, cancelled: 7 },
      { date: '2025-09-01', active: 110, cancelled: 6 },
      { date: '2025-10-01', active: 115, cancelled: 8 },
    ],
    arpu: [
      { date: '2025-07-01', value: 50 },
      { date: '2025-08-01', value: 52 },
      { date: '2025-09-01', value: 54 },
      { date: '2025-10-01', value: 56 },
    ],
  },
};

export async function GET() {
  return NextResponse.json(mockMetricsData);
}
