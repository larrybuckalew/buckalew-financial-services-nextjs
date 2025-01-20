# Chart Components Documentation

This document provides comprehensive documentation for the available chart components and their features.

## Available Chart Types

### Basic Charts
1. LineChart - For trend visualization
2. BarChart - For comparison between categories
3. StackedAreaChart - For part-to-whole relationships over time
4. PieChart - For composition visualization
5. RadarChart - For multivariate data visualization

### Advanced Charts
1. BubbleChart - For three-dimensional data visualization
2. CompositeChart - For combining multiple chart types
3. TreemapChart - For hierarchical data visualization

## Common Features

All charts share these common features:
- Responsive design
- Light/Dark theme support
- Customizable colors and styles
- Interactive tooltips
- Legend support
- Accessibility features

## Usage Examples

### Basic Line Chart
```tsx
import { LineChart } from '@/components/charts';

const MyComponent = () => {
  const data = [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 200 },
    // ...
  ];

  return (
    <LineChart
      data={data}
      dataKeys={{
        xAxis: 'month',
        lines: [
          { key: 'value', name: 'Value', color: '#3b82f6' }
        ]
      }}
      formatYAxis={(value) => `$${value}`}
    />
  );
};
```

### Composite Chart
```tsx
import { CompositeChart } from '@/components/charts';

const MyComponent = () => {
  const data = [
    { month: 'Jan', revenue: 1000, expenses: 800, profit: 200 },
    // ...
  ];

  return (
    <CompositeChart
      data={data}
      series={[
        { type: 'bar', dataKey: 'revenue', name: 'Revenue', color: '#3b82f6' },
        { type: 'bar', dataKey: 'expenses', name: 'Expenses', color: '#ef4444' },
        { type: 'line', dataKey: 'profit', name: 'Profit', color: '#22c55e' }
      ]}
      xAxisDataKey="month"
      formatLeftAxis={(value) => `$${value}`}
    />
  );
};
```

## Customization

### Theme Customization
```tsx
import { ChartTheme } from '@/lib/visualization';

const customTheme: ChartTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#22c55e',
    tertiary: '#ef4444',
    background: '#ffffff',
    text: '#1f2937',
    grid: '#e5e7eb',
  },
  fonts: {
    base: 'Inter, system-ui, sans-serif',
  },
};
```

### Chart Controls
All charts support the ChartControls component for:
- Switching between chart types
- Toggling themes
- Exporting data

## Best Practices

1. Chart Selection:
   - Use Line charts for trends over time
   - Use Bar charts for comparisons
   - Use Pie charts for composition (less than 7 categories)
   - Use Treemap for hierarchical data
   - Use Bubble charts for 3-variable relationships

2. Data Formatting:
   - Always provide proper data formatting functions
   - Use appropriate number formats for different types of data
   - Consider localization requirements

3. Accessibility:
   - Provide meaningful labels and titles
   - Use colorblind-friendly color schemes
   - Include alternative text descriptions

## Performance Considerations

1. Data Volume:
   - For large datasets (>1000 points), consider data aggregation
   - Use windowing techniques for real-time data
   - Implement pagination for historical data

2. Rendering:
   - Utilize memo and useMemo for complex calculations
   - Implement virtual scrolling for large datasets
   - Consider lazy loading for advanced chart types

## Error Handling

All charts implement error boundaries and provide fallback UI for:
- Missing or invalid data
- Network errors
- Rendering errors

## Examples

Check the `__tests__` directory for comprehensive examples of each chart type and their features.