# Project Development Rules

**Cursor AI guidance for consistent, high-quality development**

---

## Core Principles

### 1. Source-of-Truth First
- **Read** `docs/SOURCE-OF-TRUTH.md` before making changes
- **Update** SOURCE-OF-TRUTH after any significant change
- **Document** decisions, rationale, and key exports
- **Maintain** accurate file inventory

### 2. Search Before Creating
- **Semantic search** for similar functionality by meaning
- **Grep search** for exact code/symbol matches
- **Review** existing patterns before implementing new ones
- **Reuse** existing components and utilities

### 3. Edit-in-Place Bias
- **Prefer** modifying existing files over creating new ones
- **Refactor** when similar functionality exists
- **Consolidate** duplicate patterns
- **Extend** existing exports rather than creating parallel implementations

### 4. Plan Before Change
- **Outline** approach for non-trivial work
- **List** files to touch and rationale
- **Consider** impacts and side effects
- **Document** architectural decisions

---

## Brand Compliance

### MANDATORY: Use Brand System

#### Import Brand Components
```tsx
// From branding system
import { 
  BrandHeader, 
  PremiumCard, 
  ChartFrame, 
  AgentBadge 
} from '@/branding/ui';

// Brand constants
import { BRAND_COLORS, CHART_COLORS } from '@/branding/ui';
```

#### Use Brand Colors
```tsx
// ✅ Correct - Use brand tokens
className="bg-primary-500 text-white"
className="text-success border-success-light"

// ❌ Incorrect - Don't use generic colors
className="bg-blue-500 text-white"
className="text-green-500"
```

#### Typography Standards
```tsx
// ✅ Use brand fonts
className="font-sans"  // Graphik
className="font-mono tabular-nums text-right"  // For financial numbers

// ✅ Use brand text sizes
className="text-sm md:text-base lg:text-lg"
```

---

## Code Architecture

### Directory Structure

```
project-root/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (auth)/      # Auth-related pages
│   │   ├── (dashboard)/ # Main app pages
│   │   └── api/         # API routes
│   ├── components/
│   │   ├── ui/          # Base UI components
│   │   ├── shared/      # Shared across features
│   │   └── [feature]/   # Feature-specific components
│   ├── lib/
│   │   ├── types/       # TypeScript definitions
│   │   ├── utils/       # Utility functions
│   │   └── data/        # Data access layer
├── public/              # Static assets
├── branding/            # Brand system (copied from get-started)
└── docs/               # Documentation
```

### Naming Conventions

**Files:**
- `kebab-case.tsx` for component files
- `kebab-case.ts` for utilities
- `page.tsx` for Next.js pages
- `layout.tsx` for layouts
- `route.ts` for API routes

**Components:**
- `PascalCase` for component names
- `PascalCase` for type/interface names
- Match filename: `user-profile.tsx` exports `UserProfile`

**Functions/Variables:**
- `camelCase` for functions
- `camelCase` for variables
- `UPPER_SNAKE_CASE` for constants

**Examples:**
```
premium-card.tsx     → exports PremiumCard
user-settings.tsx    → exports UserSettings
api-client.ts        → exports apiClient
constants.ts         → exports API_BASE_URL
```

---

## TypeScript Standards

### Strict Mode Required
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### Interface Definitions
```tsx
// ✅ Define proper interfaces
interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
  className?: string;
}

// ❌ Avoid any types
interface BadProps {
  user: any;  // Don't do this
  onUpdate: Function;  // Too generic
}
```

### Type Exports
```tsx
// Export types for reuse
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type UserRole = 'admin' | 'user' | 'guest';
```

---

## Component Standards

### Component Structure
```tsx
/**
 * ComponentName - Brief description
 * 
 * Longer description of what this component does and when to use it.
 * 
 * @example
 * <ComponentName prop1="value" onAction={handler} />
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  // Required props first
  prop1: string;
  prop2: number;
  // Optional props last
  className?: string;
  onAction?: () => void;
}

export function ComponentName({
  prop1,
  prop2,
  className,
  onAction
}: ComponentNameProps) {
  return (
    <div className={cn("base-classes", className)}>
      {/* Component content */}
    </div>
  );
}
```

### Component Checklist
- [ ] TypeScript props interface defined
- [ ] Proper import organization
- [ ] Accessibility attributes (ARIA, semantic HTML)
- [ ] Responsive design (mobile-first)
- [ ] Error boundaries where appropriate
- [ ] Loading states for async operations
- [ ] Empty states for no data
- [ ] JSDoc comment with description

---

## Styling Rules

### MANDATORY: Use Tailwind CSS

```tsx
// ✅ Preferred - Tailwind utility classes
className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-lg"

// ❌ Avoid - Inline styles
style={{ display: 'flex', padding: '24px' }}

// ❌ Avoid - Custom CSS unless absolutely necessary
```

### Class Ordering
```tsx
// Layout → Spacing → Colors → Typography → Effects
className="
  flex items-center justify-between
  p-6 gap-4
  bg-white text-gray-900
  text-base font-semibold
  rounded-xl shadow-lg hover:shadow-xl
  transition-all
"
```

### Responsive Design
```tsx
// Mobile-first approach
className="
  flex-col          // Mobile: stack vertically
  md:flex-row       // Tablet+: horizontal layout
  gap-4 md:gap-6    // Responsive spacing
  text-sm md:text-base  // Responsive typography
"
```

---

## Data & State Management

### Data Fetching
```tsx
// Server Components (default in App Router)
export default async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}

// Client Components (when needed)
'use client';
import { useState, useEffect } from 'react';

export function ClientComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchData().then(setData).finally(() => setLoading(false));
  }, []);
  
  if (loading) return <LoadingSpinner />;
  return <div>{/* content */}</div>;
}
```

### State Management
```tsx
// Use React hooks for local state
const [value, setValue] = useState(initialValue);

// Use zustand for global state
import { create } from 'zustand';

interface StoreState {
  count: number;
  increment: () => void;
}

export const useStore = create<StoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

---

## API Routes

### Standard Structure
```tsx
// app/api/[resource]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 1. Authentication/authorization
    // 2. Input validation
    // 3. Business logic
    // 4. Return response
    
    const data = await fetchData();
    
    return NextResponse.json({ 
      success: true, 
      data 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error message' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validate input
    // Process request
    // Return response
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error message' },
      { status: 400 }
    );
  }
}
```

### Response Format
```tsx
// Success response
{
  "success": true,
  "data": { /* payload */ }
}

// Error response
{
  "success": false,
  "error": "Human-readable error message",
  "code": "ERROR_CODE"
}
```

---

## Error Handling

### Component Error Boundaries
```tsx
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary-500 text-white rounded-lg"
      >
        Try again
      </button>
    </div>
  );
}
```

### Try-Catch Patterns
```tsx
// Async operations
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;  // Re-throw to handle upstream
  }
}
```

---

## Accessibility Requirements

### Minimum Standards: WCAG AA

#### Semantic HTML
```tsx
// ✅ Use semantic elements
<header>
<nav>
<main>
<article>
<aside>
<footer>

// ❌ Avoid div soup
<div className="header">
<div className="nav">
```

#### ARIA Labels
```tsx
// Buttons with icons only
<button aria-label="Close dialog">
  <X className="h-4 w-4" />
</button>

// Links
<Link href="/dashboard" aria-label="Go to dashboard">
  <Home className="h-6 w-6" />
</Link>

// Form inputs
<label htmlFor="email">Email</label>
<input 
  id="email" 
  type="email"
  aria-describedby="email-help"
  aria-invalid={hasError}
/>
<span id="email-help">We'll never share your email</span>
```

#### Keyboard Navigation
```tsx
// Ensure all interactive elements are keyboard accessible
<button onClick={handler} onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handler();
  }
}}>
  Click me
</button>

// Focus management
const buttonRef = useRef<HTMLButtonElement>(null);
useEffect(() => {
  if (isOpen) buttonRef.current?.focus();
}, [isOpen]);
```

#### Color Contrast
```tsx
// Ensure minimum 4.5:1 contrast ratio for text
// Test with tools like:
// - WebAIM Contrast Checker
// - Chrome DevTools Accessibility panel
```

---

## Performance

### Image Optimization
```tsx
// ✅ Use Next.js Image component
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority  // For above-fold images
  loading="lazy"  // For below-fold images
/>

// ❌ Avoid regular img tags
<img src="/image.jpg" alt="Description" />
```

### Code Splitting
```tsx
// Dynamic imports for large components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false  // Disable SSR if not needed
});
```

### Memoization
```tsx
// Memoize expensive computations
const memoizedValue = useMemo(() => {
  return expensiveComputation(data);
}, [data]);

// Memoize callback functions
const memoizedCallback = useCallback(() => {
  doSomething(param);
}, [param]);

// Memoize components
export const MemoizedComponent = React.memo(Component);
```

---

## Testing Requirements

### Component Tests
```tsx
// Test user interactions
// Test accessibility
// Test responsive behavior
// Test error states
// Test loading states
```

### Manual Testing Checklist
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Responsive on mobile (320px+)
- [ ] Responsive on tablet (768px+)
- [ ] Responsive on desktop (1024px+)
- [ ] Color contrast sufficient
- [ ] Images have alt text
- [ ] Forms validate properly
- [ ] Error messages helpful
- [ ] Loading states show
- [ ] Empty states display

---

## Documentation

### Code Comments
```tsx
// Brief single-line comments for clarity
const result = calculateTotal(items);  // Sum of all item prices

// Multi-line comments for complex logic
/**
 * Calculate the total with discount and tax
 * 
 * Algorithm:
 * 1. Sum all item prices
 * 2. Apply discount percentage
 * 3. Calculate tax on discounted amount
 * 4. Return final total
 */
function calculateFinalTotal(items, discount, taxRate) {
  // Implementation
}
```

### JSDoc Comments
```tsx
/**
 * PremiumCard Component
 * 
 * A card component with enhanced styling, hover effects, and optional gradient border.
 * Use for important content that needs visual prominence.
 * 
 * @param {string} title - Card title
 * @param {React.ReactNode} children - Card content
 * @param {string} [className] - Additional CSS classes
 * @param {() => void} [onClick] - Click handler
 * 
 * @example
 * <PremiumCard title="Revenue" onClick={handleClick}>
 *   <p>$1.2M</p>
 * </PremiumCard>
 */
```

---

## Git Workflow

### Commit Messages
```
feat: Add user profile page
fix: Correct calculation in revenue chart
docs: Update API documentation
style: Improve button spacing
refactor: Simplify authentication logic
test: Add tests for user service
chore: Update dependencies
```

### Branching
```
main/master    - Production code
develop        - Development integration
feature/name   - New features
fix/name       - Bug fixes
hotfix/name    - Urgent production fixes
```

---

## Prohibited Practices

### Never Do This

❌ **Use `any` type**
```tsx
const data: any = response;  // Don't do this
```

❌ **Skip error handling**
```tsx
const data = await fetch('/api');  // What if it fails?
```

❌ **Hardcode values**
```tsx
const apiUrl = 'https://api.example.com';  // Use env variables
```

❌ **Ignore accessibility**
```tsx
<div onClick={handler}>Click me</div>  // Use button!
```

❌ **Create duplicate patterns**
```tsx
// If UserCard exists, don't create CustomerCard for same purpose
```

❌ **Skip SOURCE-OF-TRUTH updates**
```tsx
// Always document significant changes
```

---

## Quality Checklist

Before considering work complete:

### Code Quality
- [ ] TypeScript strict mode, no `any` types
- [ ] Proper error handling
- [ ] Loading states for async operations
- [ ] Empty states for no data
- [ ] Responsive design (mobile-first)

### Accessibility
- [ ] Semantic HTML used
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Color contrast sufficient (WCAG AA)
- [ ] Screen reader compatible

### Brand Compliance
- [ ] Uses brand colors from tokens
- [ ] Uses brand components where applicable
- [ ] Follows design standards
- [ ] Professional polish (no emojis)

### Documentation
- [ ] SOURCE-OF-TRUTH updated
- [ ] Complex logic commented
- [ ] Component documented (JSDoc)
- [ ] Rationale for decisions noted

---

**Following these rules ensures consistent, high-quality, maintainable code across the project.**

