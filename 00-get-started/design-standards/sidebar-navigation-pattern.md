# Sidebar Navigation Pattern

**Hierarchical sidebar navigation for complex enterprise applications**

---

## When to Use

Use sidebar navigation when your application has:
- Deep navigation hierarchies (3+ levels)
- Many sections and subsections
- Contextual navigation that changes based on section
- Need for persistent navigation while browsing

**Examples from your projects:**
- Finance360 (sidebar with collapsible sections)
- Controller AI Workbench (sidebar with nested navigation)

---

## Standard Sidebar Pattern

### Implementation

Based on Finance360 and Controller AI Workbench:

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface NavItem {
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
  badge?: string | number;
}

const navigation: NavItem[] = [
  {
    name: 'Command Center',
    href: '/command-center',
    icon: LayoutDashboard,
  },
  {
    name: 'Transactions',
    icon: ArrowLeftRight,
    children: [
      { name: 'Journal Entries', href: '/transactions/journal-entries', icon: FileText },
      { name: 'Cash & Treasury', href: '/transactions/cash-treasury', icon: DollarSign },
      { name: 'Fixed Assets', href: '/transactions/fixed-assets', icon: Building },
      { name: 'Equity Accounting', href: '/transactions/equity', icon: TrendingUp },
    ],
  },
  {
    name: 'Close Management',
    icon: Calendar,
    children: [
      { name: 'Close Tasks', href: '/close/tasks', icon: CheckSquare },
      { name: 'Intercompany', href: '/close/intercompany', icon: Repeat },
      { name: 'Consolidation', href: '/close/consolidation', icon: Layers },
    ],
  },
  {
    name: 'Reconciliations',
    icon: Scale,
    children: [
      { name: 'Balance Sheet', href: '/reconciliations/balance-sheet', icon: FileText },
      { name: 'Working Capital', href: '/reconciliations/working-capital', icon: Wallet },
    ],
  },
  {
    name: 'Reporting',
    icon: FileBarChart,
    children: [
      { name: 'Variance Analysis', href: '/reporting/variance', icon: TrendingUp },
      { name: 'External Reporting', href: '/reporting/external', icon: FileText },
      { name: 'Management Reports', href: '/reporting/management', icon: Presentation },
    ],
  },
  {
    name: 'Master Data',
    href: '/master-data',
    icon: Database,
  },
  {
    name: 'Compliance',
    href: '/compliance',
    icon: ShieldCheck,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(['Transactions']);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionName)
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const isParentActive = (item: NavItem) => {
    if (item.href && isActive(item.href)) return true;
    if (item.children) {
      return item.children.some(child => child.href && isActive(child.href));
    }
    return false;
  };

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-[#1a1f2e] border-r border-gray-800 overflow-y-auto">
      <nav className="p-3 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedSections.includes(item.name);
          const isItemActive = isParentActive(item);

          return (
            <div key={item.name}>
              {/* Parent Item */}
              {item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isItemActive
                      ? "bg-primary-500 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => hasChildren && toggleSection(item.name)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isItemActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </div>
                  {hasChildren && (
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isExpanded && "rotate-90"
                      )}
                    />
                  )}
                </button>
              )}

              {/* Children Items */}
              {hasChildren && isExpanded && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children!.map((child) => {
                    const ChildIcon = child.icon;
                    const isChildActive = child.href && isActive(child.href);

                    return (
                      <Link
                        key={child.name}
                        href={child.href!}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                          isChildActive
                            ? "bg-primary-500 text-white font-medium"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        )}
                      >
                        <span className="text-xs opacity-60">{child.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
```

---

## Sidebar Styling

### Colors (Dark Theme)

```css
Background:     #1a1f2e (dark blue-gray)
Border:         #2d3748 (medium gray)
Text Default:   #e2e8f0 (light gray)
Text Hover:     #ffffff (white)
Active BG:      #A100FF (Accenture purple)
Active Text:    #ffffff (white)
Hover BG:       #2d3748 (medium gray)
```

### Dimensions

```
Width: 16rem (256px)
Top: 4rem (64px) - below header
Position: Fixed left
Overflow: Auto (scrollable)
Padding: 0.75rem (12px)
```

### Item Spacing

```
Gap between items: 0.25rem (4px)
Padding per item: 0.625rem 0.75rem (10px 12px)
Border radius: 0.5rem (8px)
Icon size: 1.25rem (20px)
```

---

## Collapsible Sections

### Expand/Collapse Behavior

```tsx
// Auto-expand when child is active
useEffect(() => {
  navigation.forEach(item => {
    if (item.children) {
      const hasActiveChild = item.children.some(
        child => child.href && pathname.startsWith(child.href)
      );
      if (hasActiveChild && !expandedSections.includes(item.name)) {
        setExpandedSections(prev => [...prev, item.name]);
      }
    }
  });
}, [pathname]);
```

### Animation

```tsx
<motion.div
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: 'auto', opacity: 1 }}
  exit={{ height: 0, opacity: 0 }}
  transition={{ duration: 0.2 }}
>
  {/* Children items */}
</motion.div>
```

---

## Sidebar with Profile Footer

### User Profile Section

```tsx
<div className="absolute bottom-0 left-0 right-0 p-3 bg-[#141824] border-t border-gray-800">
  <div className="flex items-center space-x-3">
    <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
      <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-semibold text-white truncate">
        {user.name}
      </div>
      <div className="text-xs text-gray-400 truncate">
        {user.role}
      </div>
    </div>
    <button className="text-gray-400 hover:text-white">
      <MoreVertical className="h-5 w-5" />
    </button>
  </div>

  {/* Quick Actions */}
  <div className="mt-3 pt-3 border-t border-gray-800">
    <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white">
      <Sparkles className="h-4 w-4" />
      <span>AI Alert System</span>
    </button>
    <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white">
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </button>
  </div>
</div>
```

---

## Mobile Sidebar

### Overlay Pattern

```tsx
'use client';

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-gray-900 text-white"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 w-64 bg-[#1a1f2e] z-50 transition-transform lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-white font-bold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Navigation (same as desktop) */}
        <Sidebar />
      </aside>
    </>
  );
}
```

---

## Layout with Sidebar

### Page Structure

```tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 ml-64 pt-16 p-8">
          {/* Add ml-64 to account for fixed sidebar */}
          {/* Add pt-16 to account for fixed header */}
          {children}
        </main>
      </div>
    </div>
  );
}
```

---

## Sidebar Checklist

### Visual Design
- [ ] Dark background (#1a1f2e or similar)
- [ ] Light text for contrast
- [ ] Clear active state (purple highlight)
- [ ] Hover states defined
- [ ] Icons consistently sized (h-5 w-5)
- [ ] Proper spacing between items

### Functionality
- [ ] Collapsible sections work
- [ ] Active page highlighted
- [ ] Parent section auto-expands when child active
- [ ] Smooth animations on expand/collapse
- [ ] Scrollable when content exceeds viewport

### Accessibility
- [ ] Keyboard navigation (Tab, Enter, Arrow keys)
- [ ] ARIA labels for expand/collapse
- [ ] Focus indicators visible
- [ ] Screen reader announces navigation structure

### Responsive
- [ ] Sidebar hidden on mobile (< lg breakpoint)
- [ ] Mobile menu button visible
- [ ] Overlay menu works on mobile
- [ ] Touch-friendly tap targets

---

**Sidebar navigation is perfect for complex applications with many sections. Use it when top navigation would be too crowded.**

