import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ReportOptions {
  title: string;
  period: string;
  metrics: any;
  includeCharts?: boolean;
}

export function generatePDFReport({ title, period, metrics, includeCharts = true }: ReportOptions) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Title
  doc.setFontSize(20);
  doc.text(title, pageWidth / 2, 20, { align: 'center' });
  
  // Period
  doc.setFontSize(12);
  doc.text(`Report Period: ${period}`, pageWidth / 2, 30, { align: 'center' });

  let yOffset = 40;

  // User Metrics Section
  doc.setFontSize(16);
  doc.text('User Metrics', 14, yOffset);
  yOffset += 10;

  // User Stats Table
  const userStatsData = [
    ['Total Users', metrics.userMetrics.totalUsers],
    ['New Users (Period)', metrics.userMetrics.newUsers],
    ['Active Users', metrics.userMetrics.activeUsers],
    ['Retention Rate', `${metrics.userMetrics.retentionRate}%`]
  ];

  autoTable(doc, {
    startY: yOffset,
    head: [['Metric', 'Value']],
    body: userStatsData,
    theme: 'grid'
  });

  yOffset = (doc as any).lastAutoTable.finalY + 15;

  // Content Metrics Section
  doc.setFontSize(16);
  doc.text('Content Metrics', 14, yOffset);
  yOffset += 10;

  const contentStatsData = [
    ['Total Posts', metrics.contentMetrics.totalPosts],
    ['New Posts (Period)', metrics.contentMetrics.newPosts],
    ['Total Views', metrics.contentMetrics.totalViews],
    ['Average Engagement Rate', `${metrics.contentMetrics.avgEngagement}%`]
  ];

  autoTable(doc, {
    startY: yOffset,
    head: [['Metric', 'Value']],
    body: contentStatsData,
    theme: 'grid'
  });

  yOffset = (doc as any).lastAutoTable.finalY + 15;

  // Top Content Table
  if (metrics.contentMetrics.topPosts) {
    doc.setFontSize(14);
    doc.text('Top Performing Content', 14, yOffset);
    yOffset += 10;

    const topPostsData = metrics.contentMetrics.topPosts.map((post: any) => [
      post.title,
      post.views,
      post.engagement + '%'
    ]);

    autoTable(doc, {
      startY: yOffset,
      head: [['Title', 'Views', 'Engagement']],
      body: topPostsData,
      theme: 'grid'
    });
  }

  // Add summary and recommendations
  doc.addPage();
  doc.setFontSize(16);
  doc.text('Summary & Recommendations', 14, 20);
  
  const summary = metrics.summary.split('\n');
  let summaryOffset = 30;
  doc.setFontSize(12);
  summary.forEach((line: string) => {
    doc.text(line, 14, summaryOffset);
    summaryOffset += 7;
  });

  return doc;
}

export function generateCSVReport(metrics: any) {
  const rows = [
    ['Metric', 'Value'],
    ['Period Start', metrics.periodStart],
    ['Period End', metrics.periodEnd],
    ['Total Users', metrics.userMetrics.totalUsers],
    ['New Users', metrics.userMetrics.newUsers],
    ['Active Users', metrics.userMetrics.activeUsers],
    ['Retention Rate', metrics.userMetrics.retentionRate],
    ['Total Posts', metrics.contentMetrics.totalPosts],
    ['New Posts', metrics.contentMetrics.newPosts],
    ['Total Views', metrics.contentMetrics.totalViews],
    ['Average Engagement', metrics.contentMetrics.avgEngagement]
  ];

  return rows.map(row => row.join(',')).join('\n');
}