import React, { useState, useEffect } from 'react';
import { LineChart, BarChart } from '@/components/charts';
import { Card } from '@/components/ui/card';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Select } from '@/components/ui/select';

interface EmailAnalytics {
  totalSent: number;
  totalOpened: number;
  totalClicks: number;
  openRate: number;
  clickRate: number;
}

interface TemplatePerformance {
  templateName: string;
  sentCount: number;
  openRate: number;
  clickRate: number;
}

export const EmailAnalyticsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [analytics, setAnalytics] = useState<EmailAnalytics | null>(null);
  const [templatePerformance, setTemplatePerformance] = useState<TemplatePerformance[]>([]);

  const fetchAnalytics = async () => {
    try {
      const params = new URLSearchParams();
      if (dateRange?.from) params.append('startDate', dateRange.from.toISOString());
      if (dateRange?.to) params.append('endDate', dateRange.to.toISOString());
      if (selectedTemplate) params.append('templateName', selectedTemplate);

      const response = await fetch(`/api/email/analytics?${params}`);
      const data = await response.json();

      setAnalytics(data.analytics);
      setTemplatePerformance(data.templatePerformance);
    } catch (error) {
      console.error('Failed to fetch email analytics:', error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange, selectedTemplate]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <DateRangePicker
          from={dateRange?.from}
          to={dateRange?.to}
          onSelect={(range) => setDateRange(range)}
        />
        <Select
          value={selectedTemplate}
          onValueChange={setSelectedTemplate}
          placeholder="All Templates"
        >
          <option value="">All Templates</option>
          {templatePerformance.map((template) => (
            <option key={template.templateName} value={template.templateName}>
              {template.templateName}
            </option>
          ))}
        </Select>
      </div>

      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium">Total Sent</h3>
            <p className="text-2xl font-bold">{analytics.totalSent}</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium">Open Rate</h3>
            <p className="text-2xl font-bold">{analytics.openRate.toFixed(1)}%</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium">Click Rate</h3>
            <p className="text-2xl font-bold">{analytics.clickRate.toFixed(1)}%</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium">Total Clicks</h3>
            <p className="text-2xl font-bold">{analytics.totalClicks}</p>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Template Performance</h3>
          <BarChart
            data={templatePerformance}
            xAxis="templateName"
            series={[
              { key: 'openRate', name: 'Open Rate' },
              { key: 'clickRate', name: 'Click Rate' }
            ]}
          />
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Engagement Over Time</h3>
          <LineChart
            data={[]} // This would need time-series data
            xAxis="date"
            series={[
              { key: 'opens', name: 'Opens' },
              { key: 'clicks', name: 'Clicks' }
            ]}
          />
        </Card>
      </div>
    </div>
  );
};