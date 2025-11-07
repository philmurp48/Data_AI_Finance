# Button Comprehensive Guide

**Complete button design system for all use cases**

---

## Button Variants

### Primary (Action Buttons)

**When to use:** Main call-to-action, submit forms, important actions

```tsx
<Button variant="primary">
  Run Scenario
</Button>

// Styling
className="
  px-6 py-2.5 rounded-lg
  bg-gradient-to-r from-purple-500 to-purple-600
  text-white font-semibold
  hover:from-purple-600 hover:to-purple-700
  active:scale-95
  transition-all
  shadow-md hover:shadow-lg
"
```

**Examples from your projects:**
- "Run Scenario" button
- "AI Search" button
- "Save" button
- "Approve" button

---

### Secondary (Less Emphasis)

**When to use:** Secondary actions, cancel, alternative actions

```tsx
<Button variant="secondary">
  Reset
</Button>

// Styling
className="
  px-6 py-2.5 rounded-lg
  bg-white text-gray-700 font-semibold
  border-2 border-gray-300
  hover:bg-gray-50 hover:border-gray-400
  active:scale-95
  transition-all
"
```

**Examples from your projects:**
- "Reset" button
- "Cancel" button

---

### Outline (Tertiary Actions)

**When to use:** Less important actions, view details, secondary navigation

```tsx
<Button variant="outline">
  View Details
</Button>

// Styling
className="
  px-4 py-2 rounded-lg
  bg-transparent text-primary-600 font-medium text-sm
  border border-primary-300
  hover:bg-primary-50 hover:border-primary-500
  transition-colors
"
```

**Examples from your projects:**
- "View Details" links in agent cards
- "Export" buttons
- "Filter" buttons

---

### Ghost/Text (Minimal)

**When to use:** Low-emphasis actions, in-line actions, tertiary options

```tsx
<Button variant="ghost">
  Show Details
</Button>

// Styling
className="
  px-3 py-1.5 rounded-lg
  bg-transparent text-gray-600 font-medium text-sm
  hover:bg-gray-100 hover:text-gray-900
  transition-colors
"
```

---

### Success (Positive Actions)

**When to use:** Approve, confirm, complete, post

```tsx
<Button variant="success">
  Approve
</Button>

// Styling
className="
  px-6 py-2.5 rounded-lg
  bg-gradient-to-r from-green-500 to-green-600
  text-white font-semibold
  hover:from-green-600 hover:to-green-700
  transition-all
  shadow-md
"
```

**Examples from your projects:**
- "Approve" buttons in workflows
- "Complete" actions
- Status: "Posted", "Approved"

---

### Danger (Destructive Actions)

**When to use:** Delete, reject, cancel critical operations

```tsx
<Button variant="danger">
  Reject
</Button>

// Styling
className="
  px-6 py-2.5 rounded-lg
  bg-gradient-to-r from-red-500 to-red-600
  text-white font-semibold
  hover:from-red-600 hover:to-red-700
  transition-all
  shadow-md
"
```

---

## Button Sizes

### Small
```tsx
<Button size="sm">Small Button</Button>

// Dimensions
className="px-3 py-1.5 text-xs h-8"
```

### Medium (Default)
```tsx
<Button size="md">Medium Button</Button>

// Dimensions
className="px-6 py-2.5 text-sm h-10"
```

### Large
```tsx
<Button size="lg">Large Button</Button>

// Dimensions
className="px-8 py-3 text-base h-12"
```

---

## Button States

### Loading State

```tsx
<Button disabled>
  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
  Processing...
</Button>

// Styling
className="opacity-60 cursor-not-allowed"
```

### Disabled State

```tsx
<Button disabled>
  Disabled
</Button>

// Styling
className="opacity-50 cursor-not-allowed pointer-events-none"
```

### With Icon

```tsx
// Icon left
<Button>
  <Plus className="h-4 w-4 mr-2" />
  Add Item
</Button>

// Icon right
<Button>
  Continue
  <ArrowRight className="h-4 w-4 ml-2" />
</Button>

// Icon only
<Button size="icon" aria-label="Close">
  <X className="h-5 w-5" />
</Button>
```

---

## Button Groups

### Horizontal Group

```tsx
<div className="flex items-center space-x-2">
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
</div>
```

### Button Bar (Attached)

```tsx
<div className="inline-flex rounded-lg shadow-sm" role="group">
  <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50">
    Day
  </button>
  <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-300 hover:bg-gray-50">
    Week
  </button>
  <button className="px-4 py-2 text-sm font-medium text-white bg-primary-500 border border-primary-500 rounded-r-lg">
    Month
  </button>
</div>
```

---

## Action Patterns

### Form Actions (Right-aligned)

```tsx
<div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
  <Button variant="secondary">
    Cancel
  </Button>
  <Button variant="primary" type="submit">
    Save Changes
  </Button>
</div>
```

### Page Header Actions

```tsx
<div className="flex items-center justify-between mb-6">
  <h1 className="text-2xl font-bold">Page Title</h1>
  <div className="flex items-center space-x-2">
    <Button variant="outline" size="sm">
      <Download className="h-4 w-4 mr-2" />
      Export
    </Button>
    <Button variant="primary" size="sm">
      <Plus className="h-4 w-4 mr-2" />
      New Item
    </Button>
  </div>
</div>
```

---

## Button Labels

### Good Labels (Clear, Action-Oriented)

From your projects:
- ✅ "Run Scenario"
- ✅ "AI Search"  
- ✅ "View Details"
- ✅ "Approve"
- ✅ "Reject"
- ✅ "Save"
- ✅ "Pause"
- ✅ "Reset"

### Avoid (Generic, Unclear)

- ❌ "Submit"
- ❌ "Click Here"
- ❌ "OK"
- ❌ "Yes/No"
- ❌ "Go"

---

## Accessibility

### Requirements

```tsx
<button
  type="button"
  aria-label="Descriptive label"
  disabled={isDisabled}
  onClick={handleClick}
>
  Button Text
</button>
```

### Loading State Announcement

```tsx
<button aria-busy={isLoading}>
  {isLoading ? (
    <>
      <span className="sr-only">Loading...</span>
      <Loader2 className="h-4 w-4 animate-spin" />
    </>
  ) : (
    'Submit'
  )}
</button>
```

---

## Responsive Behavior

### Mobile Adjustments

```tsx
// Full width on mobile, auto on desktop
className="w-full sm:w-auto"

// Smaller on mobile, normal on desktop
className="text-sm px-4 py-2 sm:text-base sm:px-6 sm:py-2.5"

// Stack vertically on mobile
<div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</div>
```

---

## Complete Button Component

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 shadow-md hover:shadow-lg",
        secondary: "bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400",
        outline: "bg-transparent text-primary-600 border border-primary-300 hover:bg-primary-50 hover:border-primary-500",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        success: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-md",
        danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md",
      },
      size: {
        sm: "text-xs px-3 py-1.5 h-8",
        md: "text-sm px-6 py-2.5 h-10",
        lg: "text-base px-8 py-3 h-12",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
```

---

**Buttons are one of the most important UI elements. Get them right for a professional feel.**

