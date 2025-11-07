# Breadcrumbs Navigation Pattern

**Hierarchical trail showing current location in application**

---

## When to Use

Use breadcrumbs when:
- Application has deep hierarchical navigation (3+ levels)
- Users navigate through multiple levels
- Users need context of where they are
- Users need to navigate back to parent sections

**Examples from your projects:**
- Controller AI Workbench: "Command Center > Reporting > External Reporting"
- Controller AI Workbench: "Command Center > Transactions"

---

## Standard Pattern

### Basic Breadcrumb

```tsx
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      {/* Home Icon */}
      <Link 
        href="/"
        className="hover:text-primary-600 transition-colors"
        aria-label="Home"
      >
        <Home className="h-4 w-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-gray-400" />
          
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="hover:text-primary-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
```

### Usage

```tsx
<Breadcrumbs items={[
  { label: 'Command Center', href: '/command-center' },
  { label: 'Reporting', href: '/reporting' },
  { label: 'External Reporting' }  // Current page (no href)
]} />
```

---

## Styling Variations

### Light Background (Default)

```tsx
className="text-gray-600"  // Default links
className="text-gray-900 font-medium"  // Current page
className="hover:text-primary-600"  // Hover state
```

### Dark Background

```tsx
className="text-gray-400"  // Default links
className="text-white font-medium"  // Current page
className="hover:text-primary-400"  // Hover state
```

---

## Breadcrumb with Dropdowns

### For Complex Hierarchies

```tsx
<nav className="flex items-center space-x-2 text-sm mb-6">
  <Link href="/" className="hover:text-primary-600">
    <Home className="h-4 w-4" />
  </Link>
  
  <ChevronRight className="h-4 w-4 text-gray-400" />
  
  {/* Dropdown for middle levels */}
  <select 
    className="border-none bg-transparent text-gray-600 hover:text-primary-600 cursor-pointer"
    onChange={(e) => router.push(e.target.value)}
  >
    <option value="/reporting">Reporting</option>
    <option value="/transactions">Transactions</option>
    <option value="/reconciliations">Reconciliations</option>
  </select>
  
  <ChevronRight className="h-4 w-4 text-gray-400" />
  
  <span className="text-gray-900 font-medium">Current Page</span>
</nav>
```

---

## Auto-Generated Breadcrumbs

### From URL Path

```tsx
'use client';

import { usePathname } from 'next/navigation';

export function AutoBreadcrumbs() {
  const pathname = usePathname();
  
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, array) => ({
      label: segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      href: '/' + array.slice(0, index + 1).join('/')
    }));

  return <Breadcrumbs items={segments} />;
}

// Example: /reporting/variance-analysis
// Generates: Home > Reporting > Variance Analysis
```

---

## Breadcrumb Placement

### Standard Position

```tsx
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
  {/* Breadcrumbs at top of page content */}
  <Breadcrumbs items={breadcrumbItems} />
  
  {/* Page Title */}
  <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-6">
    Page Title
  </h1>
  
  {/* Page Content */}
  {/* ... */}
</main>
```

---

## Mobile Responsive

### Collapse on Small Screens

```tsx
export function ResponsiveBreadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      {/* Always show home */}
      <Link href="/" className="hover:text-primary-600">
        <Home className="h-4 w-4" />
      </Link>
      
      {items.length > 2 ? (
        <>
          {/* Show ellipsis on mobile */}
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <button className="text-gray-600 hover:text-primary-600 sm:hidden">
            ...
          </button>
          
          {/* Show all items on desktop */}
          <div className="hidden sm:flex items-center space-x-2">
            {items.slice(0, -1).map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <Link href={item.href!} className="hover:text-primary-600">
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
          
          {/* Always show current page */}
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">
            {items[items.length - 1].label}
          </span>
        </>
      ) : (
        /* Show all for short paths */
        items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4 text-gray-400" />
            {item.href ? (
              <Link href={item.href} className="hover:text-primary-600">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
          </div>
        ))
      )}
    </nav>
  );
}
```

---

## Breadcrumb Best Practices

### Do's
- ✅ Keep labels concise (1-2 words when possible)
- ✅ Use sentence case
- ✅ Make all levels except current clickable
- ✅ Use consistent separator (ChevronRight)
- ✅ Include home icon as first item
- ✅ Current page in bold or different color

### Don'ts
- ❌ Don't make breadcrumbs too long (collapse if >4 levels)
- ❌ Don't use breadcrumbs for single-level navigation
- ❌ Don't style current page as link
- ❌ Don't use unfamiliar icons as separators

---

## Accessibility

### ARIA Attributes

```tsx
<nav aria-label="Breadcrumb">
  <ol className="flex items-center space-x-2">
    <li>
      <Link href="/" aria-label="Home">
        <Home className="h-4 w-4" />
      </Link>
    </li>
    <li aria-hidden="true">
      <ChevronRight className="h-4 w-4" />
    </li>
    <li>
      <Link href="/section">Section</Link>
    </li>
    <li aria-hidden="true">
      <ChevronRight className="h-4 w-4" />
    </li>
    <li aria-current="page">
      <span className="font-medium">Current Page</span>
    </li>
  </ol>
</nav>
```

---

**Breadcrumbs improve navigation in complex applications. Use them to help users understand and navigate hierarchy.**

