// src/components/dashboard/MetricsChart.tsx
import React from 'react';

interface MetricData {
  label: string;
  value: number;
}

interface MetricsChartProps {
  data: MetricData[];
}

export default function MetricsChart({ data }: MetricsChartProps) {
  return (
    <div>
      {data.map((metric) => (
        <div key={metric.label}>
          {metric.label}: {metric.value}
        </div>
      ))}
    </div>
  );
}