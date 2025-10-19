// src/components/dashboard/MetricsChart.tsx
import React from 'react';
export default function MetricsChart({ data }) {
    return (<div>
      {data.map((metric) => (<div key={metric.label}>
          {metric.label}: {metric.value}
        </div>))}
    </div>);
}
