import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
import { defaultTheme, getChartConfig } from '@/lib/visualization';
export default function LineChart({ data, dataKeys, height = 400, theme = defaultTheme, formatYAxis, formatTooltip, }) {
    const config = getChartConfig(theme);
    return (<div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RechartsLineChart data={data} {...config.lineChart}>
          <CartesianGrid {...config.lineChart.grid}/>
          <XAxis dataKey={dataKeys.xAxis} tick={{ fill: theme.colors.text }}/>
          <YAxis tick={{ fill: theme.colors.text }} tickFormatter={formatYAxis}/>
          <Tooltip formatter={formatTooltip} contentStyle={config.lineChart.tooltip.contentStyle}/>
          <Legend />
          {dataKeys.lines.map((line) => (<Line key={line.key} type="monotone" dataKey={line.key} name={line.name} stroke={line.color} dot={false}/>))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>);
}
