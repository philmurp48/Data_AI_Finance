# Navigation & Menu Design Patterns

**Best-in-class navigation patterns for enterprise applications**

---

## Overview

This document provides professional navigation and menu design patterns based on actual Accenture project implementations and UX best practices.

---

## Top Navigation Pattern (Recommended)

### Description
Horizontal navigation bar with primary navigation items, dropdown submenus, and user profile menu.

### When to Use
- Enterprise applications with 5-10 main sections
- Applications requiring quick access to multiple modules
- Dashboard-style applications

### Anatomy

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Logo/Brand]  Nav Item 1  Nav Item 2 ▼  Nav Item 3  ...  [Actions] [User] │
└─────────────────────────────────────────────────────────────────────────┘
```

### Implementation Example

Based on `acn-o2c-prototype-fresh` project:

```tsx
// Top Navigation Component Structure
<nav className="bg-[#002244] sticky top-0 z-50">
  <div className="flex items-center h-16 px-6">
    {/* Logo Section */}
    <div className="flex-shrink-0">
      <Link href="/" className="flex items-center space-x-3">
        <img src="/logo.png" alt="Logo" className="h-12 w-12" />
        <div>
          <h1 className="text-white font-bold">Application Name</h1>
          <p className="text-xs text-white opacity-80">Tagline</p>
        </div>
      </Link>
    </div>

    {/* Main Navigation - Centered */}
    <nav className="flex-1 flex items-center justify-center space-x-2">
      {mainNavigation.map((item) => (
        <NavItem key={item.name} item={item} />
      ))}
    </nav>

    {/* Actions & User Menu - Right */}
    <div className="flex items-center space-x-4">
      <ActionButton />
      <UserMenu user={user} />
    </div>
  </div>
</nav>
```

### Navigation Item States

#### Default State
```tsx
className="flex items-center px-4 py-2 rounded-md text-sm font-semibold text-gray-300 hover:bg-[#003366] hover:text-white transition-all"
```

#### Active State
```tsx
className="flex items-center px-4 py-2 rounded-md text-sm font-semibold bg-[#00A3E0] text-white shadow-md"
```

#### Disabled/Coming Soon
```tsx
className="flex items-center px-4 py-2 rounded-md text-sm font-semibold text-white opacity-50 cursor-not-allowed"
```

### Dropdown Menu Pattern

For navigation items with sub-items:

```tsx
// Parent Button
<button 
  className="flex items-center px-4 py-2 rounded-md text-sm font-semibold"
  onMouseEnter={() => setDropdownOpen(true)}
  onMouseLeave={() => setDropdownOpen(false)}
>
  <Icon className="h-4 w-4 mr-1.5" />
  {item.name}
  <ChevronDown className="h-3 w-3 ml-1 transition-transform" />
</button>

// Dropdown Panel
{isDropdownOpen && (
  <div className="absolute top-full left-0 pt-2 z-50">
    <div className="w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
      {item.children.map((child) => (
        <Link 
          key={child.name}
          href={child.href}
          className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap"
        >
          <ChildIcon className="h-4 w-4 mr-3" />
          {child.name}
        </Link>
      ))}
    </div>
  </div>
)}
```

### User Menu Pattern

```tsx
<div className="relative">
  <button 
    onClick={() => setShowUserMenu(!showUserMenu)}
    className="flex items-center space-x-2 hover:bg-[#003366] rounded-lg px-3 py-2"
  >
    <div className="h-8 w-8 bg-[#00A3E0] rounded-full flex items-center justify-center">
      <User className="h-4 w-4 text-white" />
    </div>
    <div className="text-left">
      <p className="text-sm font-bold text-white">{user.name}</p>
      <p className="text-xs text-white opacity-90">{user.role}</p>
    </div>
    <ChevronDown className="h-4 w-4 text-white" />
  </button>

  {showUserMenu && (
    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
      <div className="px-4 py-3 border-b border-gray-200">
        <p className="text-sm font-bold">{user.name}</p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>
      <button className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
        <Settings className="h-4 w-4 mr-3" />
        Settings
      </button>
      <button className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center">
        <LogOut className="h-4 w-4 mr-3" />
        Sign Out
      </button>
    </div>
  )}
</div>
```

---

## Sidebar Navigation Pattern

### Description
Vertical sidebar with hierarchical navigation structure.

### When to Use
- Applications with deep navigation hierarchies
- Admin panels or configuration interfaces
- Applications with secondary navigation needs

### Anatomy

```
┌────────┬──────────────────────────────┐
│        │                              │
│  [>]   │  Main Content Area           │
│        │                              │
│  Nav 1 │                              │
│  Nav 2 │                              │
│  Nav 3 │                              │
│   └─   │                              │
│  Sub 1 │                              │
│  Sub 2 │                              │
│        │                              │
│  Nav 4 │                              │
│        │                              │
└────────┴──────────────────────────────┘
```

### Implementation Example

```tsx
// Sidebar Navigation
<aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
  <nav className="p-4 space-y-1">
    {navigation.map((item) => (
      <div key={item.name}>
        {/* Main Item */}
        <Link
          href={item.href}
          className={cn(
            "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            isActive 
              ? "bg-primary-50 text-primary-600" 
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          <item.icon className="h-5 w-5 mr-3" />
          {item.name}
          {item.children && (
            <ChevronRight className={cn(
              "h-4 w-4 ml-auto transition-transform",
              isExpanded && "rotate-90"
            )} />
          )}
        </Link>

        {/* Children (if expanded) */}
        {item.children && isExpanded && (
          <div className="ml-9 mt-1 space-y-1">
            {item.children.map((child) => (
              <Link
                key={child.name}
                href={child.href}
                className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
              >
                {child.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    ))}
  </nav>
</aside>
```

---

## Breadcrumb Navigation

### Description
Hierarchical trail showing current location in the application.

### When to Use
- Multi-level applications
- E-commerce or content management systems
- Anywhere users navigate deep hierarchies

### Implementation Example

```tsx
<nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
  <Link href="/" className="hover:text-primary-600">
    <Home className="h-4 w-4" />
  </Link>
  <ChevronRight className="h-4 w-4" />
  <Link href="/category" className="hover:text-primary-600">
    Category
  </Link>
  <ChevronRight className="h-4 w-4" />
  <span className="text-gray-900 font-medium">Current Page</span>
</nav>
```

---

## Tab Navigation

### Description
Horizontal tabs for switching between related views or sections.

### When to Use
- Settings pages with multiple sections
- Profile pages with different tabs
- Dashboard filters or views

### Implementation Example

```tsx
<div className="border-b border-gray-200">
  <nav className="flex space-x-8">
    {tabs.map((tab) => (
      <button
        key={tab.name}
        onClick={() => setActiveTab(tab.id)}
        className={cn(
          "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
          activeTab === tab.id
            ? "border-primary-500 text-primary-600"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        )}
      >
        {tab.name}
      </button>
    ))}
  </nav>
</div>
```

---

## Mobile Navigation Pattern

### Description
Responsive navigation that adapts for mobile devices.

### Implementation Approaches

#### Hamburger Menu
```tsx
<button
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  className="lg:hidden p-2"
>
  {mobileMenuOpen ? (
    <X className="h-6 w-6" />
  ) : (
    <Menu className="h-6 w-6" />
  )}
</button>

{/* Mobile Menu Overlay */}
{mobileMenuOpen && (
  <>
    {/* Backdrop */}
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      onClick={() => setMobileMenuOpen(false)}
    />
    
    {/* Slide-out Menu */}
    <div className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-xl z-50 lg:hidden">
      <nav className="p-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  </>
)}
```

#### Bottom Tab Bar (Mobile Apps)
```tsx
<nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
  <div className="flex justify-around items-center h-16">
    {navigation.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className={cn(
          "flex flex-col items-center justify-center flex-1 py-2",
          isActive ? "text-primary-600" : "text-gray-400"
        )}
      >
        <item.icon className="h-6 w-6" />
        <span className="text-xs mt-1">{item.name}</span>
      </Link>
    ))}
  </div>
</nav>
```

---

## Navigation Best Practices

### 1. Consistency
- Use the same navigation pattern throughout the application
- Keep navigation placement consistent across all pages
- Maintain consistent labeling and icon usage

### 2. Clarity
- Use clear, descriptive labels (no jargon)
- Show current location with active states
- Provide visual feedback on hover and interaction

### 3. Hierarchy
- Limit top-level navigation to 5-9 items (7±2 rule)
- Use logical grouping for dropdown items
- Show clear parent-child relationships

### 4. Accessibility
- Include ARIA labels and roles
- Support keyboard navigation (Tab, Enter, Escape)
- Ensure sufficient color contrast (WCAG AA minimum)
- Provide skip navigation links

```tsx
// Skip Navigation Link
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white"
>
  Skip to main content
</a>
```

### 5. Performance
- Lazy load dropdown content when possible
- Debounce search inputs in navigation
- Cache navigation state to prevent unnecessary re-renders
- Use React.memo for navigation components

### 6. Mobile Responsiveness
- Always provide mobile navigation solution
- Test touch targets (minimum 44x44 pixels)
- Consider thumb-reach zones for mobile
- Use appropriate gestures (swipe, tap)

---

## Visual Design Standards

### Colors

#### Light Mode (Default)
```css
Background: #002244 (dark blue/navy)
Text: #FFFFFF (white)
Hover: #003366 (darker blue)
Active: #00A3E0 (bright blue)
Dropdown: #FFFFFF (white background)
```

#### Dark Mode
```css
Background: #1a202e (dark slate)
Text: #f3f4f6 (light gray)
Hover: #334155 (medium slate)
Active: #A100FF (Accenture purple)
Dropdown: #1e293b (dark slate)
```

### Spacing
```
Height: 4rem (64px) for top navigation
Padding: 1rem (16px) horizontal for nav items
Gap: 0.5rem (8px) between nav items
Icon size: 1rem (16px) h/w
```

### Typography
```
Font: Graphik Semibold
Size: 0.875rem (14px)
Weight: 600
Line height: 1.25
```

### Transitions
```
Duration: 200ms (standard)
Easing: cubic-bezier(0.4, 0, 0.2, 1)
Properties: background-color, color, transform, box-shadow
```

---

## Navigation Data Structure

### Recommended Schema

```typescript
interface NavigationItem {
  name: string;
  href?: string;
  icon: React.ComponentType;
  hasDropdown?: boolean;
  children?: NavigationItem[];
  comingSoon?: boolean;
  badge?: {
    text: string;
    variant: 'info' | 'warning' | 'success';
  };
  permission?: string; // For role-based access
}

const navigation: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Orders',
    icon: Package,
    hasDropdown: true,
    children: [
      { name: 'All Orders', href: '/orders', icon: Package },
      { name: 'Pending', href: '/orders/pending', icon: Clock, badge: { text: '12', variant: 'warning' } },
      { name: 'Completed', href: '/orders/completed', icon: CheckCircle },
    ],
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    permission: 'admin',
  },
];
```

---

## Testing Checklist

### Functionality
- [ ] All navigation links work correctly
- [ ] Active states highlight current page
- [ ] Dropdowns open/close properly
- [ ] Mobile menu toggles correctly
- [ ] Back button navigates correctly

### Accessibility
- [ ] Keyboard navigation works (Tab, Shift+Tab, Enter, Escape)
- [ ] Screen reader announces navigation structure
- [ ] Focus indicators visible
- [ ] ARIA labels present and accurate
- [ ] Skip navigation link works

### Responsive Design
- [ ] Navigation adapts to mobile breakpoints
- [ ] Touch targets minimum 44x44 pixels
- [ ] No horizontal scrolling on small screens
- [ ] Hamburger menu accessible on mobile

### Performance
- [ ] Navigation doesn't cause layout shift
- [ ] Dropdown menus render quickly
- [ ] No unnecessary re-renders
- [ ] Smooth transitions and animations

### Visual Design
- [ ] Follows brand guidelines
- [ ] Consistent spacing and alignment
- [ ] Proper color contrast
- [ ] Icons render correctly
- [ ] Hover states provide clear feedback

---

## Examples from Actual Projects

### Order-to-Cash Prototype
- **Pattern:** Top navigation with dropdown menus
- **Key Features:** Lifecycle-based grouping, "Coming Soon" labels, Agent Ask action button
- **File:** `acn-o2c-prototype-fresh/src/components/layout/top-nav.tsx`

### Finance 360 Management Reporting
- **Pattern:** Top navigation with simplified structure
- **Key Features:** Dashboard-centric, minimal navigation items
- **Focus:** Clear information hierarchy

### Macy's Analytics AI
- **Pattern:** Sidebar + top bar combination
- **Key Features:** Deep navigation hierarchy, contextual actions
- **Focus:** Data exploration and analysis

---

**Navigation is critical for user experience. Invest time to get it right.**

