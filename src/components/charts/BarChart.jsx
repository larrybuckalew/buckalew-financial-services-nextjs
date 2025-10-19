import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
import { defaultTheme, getChartConfig } from '@/lib/visualization';
export default function BarChart({ data, dataKeys, height = 400, theme = defaultTheme, formatYAxis, formatTooltip, }) {
    const config = getChartConfig(theme);
    return (<div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RechartsBarChart data={data} {...config.barChart}>
          <CartesianGrid {...config.barChart.grid}/>
          <XAxis dataKey={dataKeys.xAxis} tick={{ fill: theme.colors.text }}/>
          <YAxis tick={{ fill: theme.colors.text }} tickFormatter={formatYAxis}/>
          <Tooltip formatter={formatTooltip} contentStyle={config.barChart.tooltip.contentStyle}/>
          <Legend />
          {dataKeys.bars.map((bar) => (<Bar key={bar.key} dataKey={bar.key} name={bar.name} fill={bar.color} stackId={bar.stackId}/>))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>);
}
