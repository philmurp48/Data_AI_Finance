# Status Badges Comprehensive Guide

**Complete system for status indicators across all projects**

---

## Standard Status System

### Core Status Types

From your Finance360 and Controller AI Workbench projects:

```tsx
type Status = 
  | 'completed' | 'posted' | 'approved'     // Success states
  | 'pending' | 'in-progress' | 'review'   // In-progress states  
  | 'draft' | 'not-started'                 // Not started states
  | 'blocked' | 'rejected' | 'error'        // Error states
  | 'on-track' | 'at-risk' | 'critical';   // Performance states
```

---

## Badge Component

### Standard Implementation

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        success: "bg-green-100 text-green-800 border border-green-200",
        warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
        danger: "bg-red-100 text-red-800 border border-red-200",
        info: "bg-blue-100 text-blue-800 border border-blue-200",
        purple: "bg-purple-100 text-purple-800 border border-purple-200",
        gray: "bg-gray-100 text-gray-800 border border-gray-200",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-2.5 py-0.5",
        lg: "text-base px-3 py-1",
      }
    },
    defaultVariants: {
      variant: "gray",
      size: "sm",
    }
  }
);

interface StatusBadgeProps extends VariantProps<typeof badgeVariants> {
  status: Status;
  className?: string;
  showDot?: boolean;
}

export function StatusBadge({ status, className, size, showDot = false }: StatusBadgeProps) {
  const config = getStatusConfig(status);
  
  return (
    <span className={cn(badgeVariants({ variant: config.variant, size }), className)}>
      {showDot && (
        <span className={cn("h-1.5 w-1.5 rounded-full mr-1.5", config.dotColor)} />
      )}
      {config.label}
    </span>
  );
}

// Status configuration
function getStatusConfig(status: Status) {
  const configs = {
    // Success states
    'completed': { label: 'Completed', variant: 'success', dotColor: 'bg-green-500' },
    'posted': { label: 'Posted', variant: 'success', dotColor: 'bg-green-500' },
    'approved': { label: 'Approved', variant: 'success', dotColor: 'bg-green-500' },
    
    // In-progress states
    'pending': { label: 'Pending Approval', variant: 'warning', dotColor: 'bg-yellow-500' },
    'in-progress': { label: 'In Progress', variant: 'info', dotColor: 'bg-blue-500' },
    'review': { label: 'Under Review', variant: 'warning', dotColor: 'bg-yellow-500' },
    
    // Not started
    'draft': { label: 'Draft', variant: 'gray', dotColor: 'bg-gray-500' },
    'not-started': { label: 'Not Started', variant: 'gray', dotColor: 'bg-gray-400' },
    
    // Error states
    'blocked': { label: 'Blocked', variant: 'danger', dotColor: 'bg-red-500' },
    'rejected': { label: 'Rejected', variant: 'danger', dotColor: 'bg-red-500' },
    'error': { label: 'Error', variant: 'danger', dotColor: 'bg-red-500' },
    
    // Performance states
    'on-track': { label: 'On Track', variant: 'success', dotColor: 'bg-green-500' },
    'at-risk': { label: 'At Risk', variant: 'warning', dotColor: 'bg-yellow-500' },
    'critical': { label: 'Critical', variant: 'danger', dotColor: 'bg-red-500' },
  };
  
  return configs[status] || { label: status, variant: 'gray', dotColor: 'bg-gray-500' };
}
```

---

## Badge Variants

### Solid (Default)

```tsx
<StatusBadge status="completed" />
// Green background, darker green text
```

### Outline

```tsx
<span className="px-2.5 py-0.5 rounded-full text-xs font-medium border-2 border-green-500 text-green-700 bg-transparent">
  Completed
</span>
```

### Dot Only

```tsx
<span className="flex items-center">
  <span className="h-2 w-2 rounded-full bg-green-500 mr-2" />
  <span className="text-sm text-gray-700">Completed</span>
</span>
```

### Pill with Count

```tsx
<span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
  <Sparkles className="h-4 w-4 mr-2" />
  AI-Generated
  <span className="ml-2 px-1.5 py-0.5 rounded-full bg-purple-200 text-purple-900 text-xs font-bold">
    12
  </span>
</span>
```

---

## Usage in Tables

### Table Cell Badge

```tsx
<TableCell>
  <StatusBadge status={row.status} />
</TableCell>
```

### Multiple Badges

```tsx
<TableCell>
  <div className="flex items-center space-x-2">
    <StatusBadge status={row.status} />
    {row.aiGenerated && (
      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs">
        AI
      </span>
    )}
    {row.urgent && (
      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs">
        Urgent
      </span>
    )}
  </div>
</TableCell>
```

---

## Progress Status Pattern

### From Finance360 External Reporting

```tsx
interface ProgressStatusProps {
  quarter: string;
  year: string;
  progress: number;  // 0-100
  status: 'not-started' | 'in-progress' | 'ready';
  dueDate: string;
  stage: string;
}

export function ProgressStatus({
  quarter,
  year,
  progress,
  status,
  dueDate,
  stage
}: ProgressStatusProps) {
  return (
    <div className="bg-white rounded-xl border-2 border-purple-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs text-gray-500">FY {year}</div>
          <div className="text-2xl font-bold text-gray-900">{quarter}</div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Progress</span>
          <span className="font-semibold text-gray-900">{progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Due:</span>
          <span className="font-medium text-gray-900">{dueDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Stage:</span>
          <span className="font-medium text-gray-900">{stage}</span>
        </div>
      </div>
    </div>
  );
}
```

---

## Category Tags

### From Finance360 Agent Categories

```tsx
<div className="flex flex-wrap gap-2">
  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium border border-purple-200">
    Insights & Discovery
  </span>
  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium border border-blue-200">
    Reporting & Narratives
  </span>
  <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium border border-green-200">
    Planning & Forecasting
  </span>
</div>
```

---

## Interactive Badges

### Clickable Filter Pills

```tsx
const [activeCategory, setActiveCategory] = useState('all');

<div className="flex items-center space-x-2">
  <button
    onClick={() => setActiveCategory('all')}
    className={cn(
      "px-4 py-2 rounded-full text-sm font-medium transition-colors",
      activeCategory === 'all'
        ? "bg-primary-500 text-white"
        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
    )}
  >
    All Workflows
  </button>
  <button
    onClick={() => setActiveCategory('insights')}
    className={cn(
      "px-4 py-2 rounded-full text-sm font-medium transition-colors",
      activeCategory === 'insights'
        ? "bg-primary-500 text-white"
        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
    )}
  >
    Insights & Discovery
  </button>
</div>
```

---

## Checklist: Status Badge Implementation

### Every Status Badge Should
- [ ] Use consistent color scheme (green=success, red=danger, etc.)
- [ ] Have clear, descriptive label
- [ ] Match status semantics across application
- [ ] Be appropriately sized for context
- [ ] Have sufficient color contrast (WCAG AA)
- [ ] Use pill shape (rounded-full)
- [ ] Include border for definition

---

**Consistent status representation helps users quickly understand state across the entire application.**

