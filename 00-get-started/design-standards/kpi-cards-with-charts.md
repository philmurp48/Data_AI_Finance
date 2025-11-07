# KPI Cards with Embedded Charts

**Design patterns for KPI cards with mini visualizations**

---

## Overview

KPI cards with embedded charts combine key metrics with visual context. They're prominent in your Finance360 and Controller AI Workbench projects.

---

## Standard KPI Card with Chart

### Pattern from Finance360

```tsx
interface KPIWithChartProps {
  title: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  category: string;
  chartType: 'sparkline' | 'bar' | 'donut' | 'gauge';
  chartData: any[];
  actionLabel?: string;
  onAction?: () => void;
}

export function KPIWithChart({
  title,
  value,
  trend,
  trendValue,
  category,
  chartType,
  chartData,
  actionLabel = 'View Details',
  onAction
}: KPIWithChartProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
      {/* Header with Icon and Trend */}
      <div className="flex items-start justify-between mb-4">
        <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
          <TrendingUp className="h-6 w-6 text-purple-600" />
        </div>
        <div className={cn(
          "text-sm font-semibold flex items-center",
          trend === 'up' && "text-green-600",
          trend === 'down' && "text-red-600",
          trend === 'neutral' && "text-gray-600"
        )}>
          {trend === 'up' && <ArrowUp className="h-4 w-4 mr-1" />}
          {trend === 'down' && <ArrowDown className="h-4 w-4 mr-1" />}
          {trendValue}
        </div>
      </div>

      {/* Main Metric */}
      <div className="mb-3">
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {value}
        </div>
        <div className="text-sm text-gray-600">
          {title}
        </div>
      </div>

      {/* Mini Chart */}
      <div className="h-16 mb-4">
        {chartType === 'sparkline' && <Sparkline data={chartData} />}
        {chartType === 'bar' && <MiniBarChart data={chartData} />}
        {chartType === 'donut' && <MiniDonut data={chartData} />}
        {chartType === 'gauge' && <MiniGauge value={chartData[0]} />}
      </div>

      {/* Detail Text */}
      <div className="text-xs text-gray-500 mb-3">
        {category}
      </div>

      {/* Action Link */}
      <button
        onClick={onAction}
        className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
      >
        {actionLabel}
        <ChevronRight className="h-4 w-4 ml-1" />
      </button>
    </div>
  );
}
```

---

## Mini Chart Components

### Sparkline Chart

```tsx
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineProps {
  data: number[];
  color?: string;
}

export function Sparkline({ data, color = '#A100FF' }: SparklineProps) {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

### Mini Bar Chart

```tsx
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

interface MiniBarChartProps {
  data: Array<{ value: number }>;
  color?: string;
}

export function MiniBarChart({ data, color = '#A100FF' }: MiniBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <Bar 
          dataKey="value" 
          fill={color}
          radius={[4, 4, 0, 0]}
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

### Mini Donut Chart

```tsx
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface MiniDonutProps {
  value: number;  // Percentage 0-100
  color?: string;
}

export function MiniDonut({ value, color = '#10B981' }: MiniDonutProps) {
  const data = [
    { name: 'Complete', value: value },
    { name: 'Remaining', value: 100 - value }
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="90%"
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          isAnimationActive={false}
        >
          <Cell fill={color} />
          <Cell fill="#E5E7EB" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
```

### Simple Color Bars

```tsx
// From Finance360 - Simple colored bars indicator
export function MiniColorBars({ values }: { values: number[] }) {
  const colors = ['#A100FF', '#FFBF00', '#00A3E0'];
  
  return (
    <div className="flex items-end space-x-1 h-16">
      {values.map((value, index) => (
        <div
          key={index}
          className="flex-1 rounded-t"
          style={{
            height: `${value}%`,
            backgroundColor: colors[index % colors.length]
          }}
        />
      ))}
    </div>
  );
}
```

---

## Card Layouts

### Single Metric with Chart

```tsx
<div className="bg-white rounded-xl p-6 border border-gray-200">
  {/* Icon */}
  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
    <DollarSign className="h-6 w-6 text-blue-600" />
  </div>
  
  {/* Metric */}
  <div className="text-3xl font-bold text-gray-900">$55.2K</div>
  <div className="text-sm text-gray-600 mb-4">Revenue/Unit Rising</div>
  
  {/* Trend */}
  <div className="text-sm font-semibold text-green-600 mb-4">
    +3.2%
  </div>
  
  {/* Chart */}
  <div className="h-16">
    <Sparkline data={[45, 52, 48, 55, 59, 62, 58]} color="#10B981" />
  </div>
  
  {/* Detail */}
  <div className="mt-4 text-xs text-gray-500">
    ATP up $1,500 vs mix
  </div>
  
  {/* Action */}
  <button className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium">
    Pricing • View Details →
  </button>
</div>
```

### Status Indicator Card

```tsx
<div className="bg-white rounded-xl p-6 border-l-4 border-red-500">
  {/* Alert Icon */}
  <div className="flex items-start justify-between mb-3">
    <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
      <AlertTriangle className="h-6 w-6 text-red-600" />
    </div>
    <span className="text-sm font-semibold text-red-600">-0.3%</span>
  </div>

  {/* Metric */}
  <div className="text-3xl font-bold text-gray-900 mb-1">18.2%</div>
  <div className="text-sm text-gray-600 mb-3">Market Share Declining</div>

  {/* Simple Indicator */}
  <div className="h-3 w-3 rounded-full bg-red-500 mb-3" />

  {/* Detail */}
  <div className="text-xs text-gray-500">Lost 0.3% to new EV entrants</div>

  {/* Category and Action */}
  <div className="mt-4 flex items-center justify-between">
    <span className="text-xs text-gray-500">Market</span>
    <button className="text-sm text-primary-600 font-medium">View Details →</button>
  </div>
</div>
```

---

## Grid Layouts

### 5-Column Grid (Finance360 Style)

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
  {kpis.map((kpi) => (
    <KPIWithChart key={kpi.id} {...kpi} />
  ))}
</div>
```

### 4-Column Grid (Standard)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  {kpis.map((kpi) => (
    <KPIWithChart key={kpi.id} {...kpi} />
  ))}
</div>
```

### 3-Column Grid (Larger Cards)

```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {kpis.map((kpi) => (
    <KPIWithChart key={kpi.id} {...kpi} />
  ))}
</div>
```

---

## Status Border Colors

### Left Border Indicators

Based on metric status:

```tsx
const getBorderColor = (status: string) => {
  switch (status) {
    case 'critical': return 'border-l-4 border-red-500';
    case 'warning': return 'border-l-4 border-yellow-500';
    case 'good': return 'border-l-4 border-green-500';
    case 'info': return 'border-l-4 border-blue-500';
    default: return 'border-l-4 border-gray-300';
  }
};
```

### Top Bar Indicators

```tsx
// Thin colored bar at top of card
<div className="relative">
  <div className={cn(
    "absolute top-0 left-0 right-0 h-1 rounded-t-xl",
    getStatusColor(status)
  )} />
  
  <div className="pt-4 px-6 pb-6">
    {/* Card content */}
  </div>
</div>
```

---

## Number Formatting

### Financial Values

```tsx
// Use tabular-nums for alignment
className="text-3xl font-bold tabular-nums text-right"

// Format with locale
{value.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})}
// Result: $55,200

// Abbreviated format
{value >= 1000000 
  ? `$${(value / 1000000).toFixed(1)}M`
  : value >= 1000
  ? `$${(value / 1000).toFixed(1)}K`
  : `$${value}`
}
// Result: $55.2K
```

### Percentages

```tsx
{value.toFixed(1)}%
// Result: 18.2%

// With trend indicator
{trend === 'up' ? '+' : ''}{value.toFixed(1)}%
// Result: +3.2% or -0.3%
```

---

## Animation and Interaction

### Hover Effects

```tsx
className="
  transition-all duration-200
  hover:shadow-lg hover:-translate-y-1
  cursor-pointer
"
```

### Click to Expand

```tsx
export function ExpandableKPICard({ kpi }: { kpi: KPI }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer transition-all hover:shadow-lg"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Summary View */}
      <div>
        {/* Icon, metric, title, chart */}
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Last Month:</span>
              <span className="font-semibold">$52.1K</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Target:</span>
              <span className="font-semibold">$60.0K</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">YTD:</span>
              <span className="font-semibold">$550K</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Loading State

### Skeleton Loader

```tsx
export function KPICardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="h-10 w-10 bg-gray-200 rounded-lg" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>
      <div className="h-8 w-24 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
      <div className="h-16 bg-gray-200 rounded mb-3" />
      <div className="h-3 w-20 bg-gray-200 rounded" />
    </div>
  );
}
```

---

## Responsive Behavior

### Grid Breakpoints

```tsx
// 1 column mobile, 2 tablet, 3 desktop, 5 wide desktop
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"

// Adjust card size at breakpoints
<div className="p-4 sm:p-5 lg:p-6">
  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
    {value}
  </div>
</div>
```

---

## Examples from Your Projects

### Finance360 Insights Grid

**Layout:**
- 5 columns on wide screens
- Colorful top status bar
- Icon in rounded square
- Trend percentage
- Mini chart (bars or sparkline)
- Category label
- View Details link

**Colors by Status:**
- Critical (Red top bar)
- Warning (Yellow top bar)
- Good (Green top bar)
- Info (Blue top bar)

### Controller AI Workbench KPIs

**Layout:**
- 4 columns standard
- Larger metric display
- Progress indicators
- Agent attribution when applicable
- "On Track" / "At Risk" labels

---

**KPI cards with charts provide immediate insight and context. Use them on dashboards for maximum impact.**

