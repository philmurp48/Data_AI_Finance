# Project Examples

**Reference implementations from actual Accenture projects**

---

## Overview

This document references real Accenture projects in this repository that demonstrate best practices, patterns, and implementations you can learn from and adapt.

---

## Featured Projects

### 1. Order-to-Cash Agentic AI Demo
**Location:** `acn-o2c-prototype-fresh/`

**Description:**  
Complete order-to-cash lifecycle management system with AI agent orchestration, collections, cash application, and reconciliation capabilities.

**Key Features:**
- Advanced top navigation with dropdown menus
- Agentic AI workflow orchestration  
- Real-time data visualization
- Complex state management
- Professional dashboard layouts

**Navigation Pattern:**
- **File:** `src/components/layout/top-nav.tsx`
- **Type:** Horizontal top nav with dropdowns
- **Features:** 
  - Lifecycle-based grouping (Orders → Billing → Collections → Payments → Disputes → Credit)
  - "Coming Soon" labels for future features
  - Agent Ask action button
  - User profile menu
  - Responsive mobile menu

**Branding:**
- Dark navy header (#002244)
- Bright blue accent (#00A3E0) for active states
- Accenture logo with application subtitle
- Clean, professional interface

**What to Learn:**
- How to structure complex navigation with multiple sections
- Dropdown menu implementation with hover states
- Mobile-responsive navigation patterns
- Dashboard layout with KPIs, charts, and data tables
- AI agent transparency and workflow visualization

**Files to Review:**
```
src/components/layout/
├── top-nav.tsx              # Navigation implementation
├── sidebar.tsx              # Sidebar navigation (alternative pattern)
└── brand-header.tsx         # Header component

src/components/ui/
├── agent-badge.tsx          # AI agent indicators
├── enhanced-kpi-tile.tsx    # KPI cards
└── workflow-steps-view.tsx  # Process visualization

src/app/(dashboard)/
├── dashboard/page.tsx       # Main dashboard
├── receivables/page.tsx     # Collections workflow
└── cash-apps/page.tsx       # Cash application
```

---

### 2. AI Powered Management Reporting (Finance 360)
**Location:** `Accenture - AI Powered Management Reporting/`

**Description:**  
Financial management reporting system with AI-powered insights and variance analysis.

**Key Features:**
- Simplified navigation structure
- Financial data visualization
- Management reporting workflows
- Variance analysis
- AI-generated commentary

**Navigation Pattern:**
- Dashboard-centric design
- Minimal top-level navigation
- Focus on data presentation

**Branding:**
- Accenture purple branding
- Clean, modern interface
- Professional data presentation

**What to Learn:**
- Simplified navigation for focused applications
- Financial data table design
- Chart and visualization patterns
- Management reporting layouts

**Files to Review:**
```
app/
├── page.tsx                 # Main dashboard
├── layout.tsx               # Application layout
components/
└── [various finance-specific components]
```

---

### 3. Macy's Analytics AI
**Location:** `Macys/macys-analytics-ai/`

**Description:**  
Client-branded analytics platform demonstrating how to adapt Accenture patterns for client projects.

**Key Features:**
- Client branding (Macy's)
- Analytics and data exploration
- Custom visualizations
- Retailer-specific workflows

**Branding:**
- Macy's red brand color
- Co-branding with Accenture
- Client-specific terminology

**What to Learn:**
- How to adapt branding for client projects
- Co-branding implementation
- Client-specific customizations
- Retail analytics patterns

**Files to Review:**
```
macys-analytics-ai/
├── branding/               # Client branding files
├── docs/                   # Project documentation
└── src/                    # Application code
```

---

### 4. Controller AI Workbench (R2R Platform)
**Location:** `R2R - Controller AI Workbench/`

**Description:**  
Record-to-Report platform for finance operations with comprehensive close management, reconciliations, and journal entry workflows.

**Key Features:**
- Complex financial workflows
- Month-end close management
- Reconciliation processes
- Journal entry automation
- Audit trails

**Branding:**
- Original source of branding system in `get-started`
- Premium card styling
- Financial data presentation standards

**What to Learn:**
- Enterprise finance application patterns
- Complex workflow management
- Audit and compliance features
- Financial terminology and voice

---

## Common Patterns Across Projects

### Navigation Patterns

#### Top Navigation (Most Common)
Used in: Order-to-Cash, Finance 360
- Horizontal bar with primary nav items
- Dropdown submenus for related functions
- User menu on right
- Action buttons (search, notifications, etc.)

#### Dashboard-Centric
Used in: Finance 360, Analytics platforms
- Simplified top nav
- Focus on dashboard as main interface
- Secondary navigation in page context

#### Sidebar Navigation
Used in: Admin/Settings sections
- Vertical navigation panel
- Hierarchical structure
- Collapsible sections

### Component Patterns

#### KPI Cards
All projects use similar KPI card patterns:
- Metric value prominently displayed
- Trend indicator (up/down arrows)
- Comparison value or timeframe
- Icon or visualization
- Hover states for interactivity

**Best Example:** `acn-o2c-prototype-fresh/src/components/ui/enhanced-kpi-tile.tsx`

#### Data Tables
Common features across projects:
- Sortable columns
- Pagination
- Search/filter
- Row actions (view, edit, delete)
- Status badges
- Responsive (stacks on mobile)

**Best Example:** `acn-o2c-prototype-fresh/src/components/ui/professional-work-list.tsx`

#### Charts
Consistent chart implementation:
- Responsive containers
- Consistent color scheme
- Tooltips with formatted data
- Legend when needed
- Loading states
- Empty states

**Best Example:** `acn-o2c-prototype-fresh/src/components/charts/`

#### Modal Dialogs
Standard modal pattern:
- Backdrop overlay
- Close button (X in corner)
- Header with title
- Content area
- Footer with actions
- ESC key to close

**Best Example:** `acn-o2c-prototype-fresh/src/components/ui/enhanced-modal.tsx`

### Branding Patterns

#### Accenture Branding
- Purple primary color (now #A100FF official)
- Greater Than symbol in navigation
- Professional, polished interface
- Bold, optimistic, agile voice

#### Client Branding
- Replace purple with client primary color
- Swap logo in header
- Maintain professional quality
- Adapt voice to client preferences

### Layout Patterns

#### Dashboard Layout
```
┌─────────────────────────────────────────┐
│  Header with Nav                        │
├─────────────────────────────────────────┤
│  KPI Row (4 cards)                      │
├─────────┬───────────────────────────────┤
│ Chart 1 │ Chart 2                       │
├─────────┴───────────────────────────────┤
│  Data Table                             │
└─────────────────────────────────────────┘
```

#### Workflow Layout
```
┌─────────────────────────────────────────┐
│  Header with Nav                        │
├──────────┬──────────────────────────────┤
│ Sidebar  │  Main Content                │
│ Filters  │  - Breadcrumb                │
│ Actions  │  - Page Title                │
│          │  - Workflow Steps            │
│          │  - Form or Table             │
└──────────┴──────────────────────────────┘
```

---

## Code Examples to Reference

### Navigation Implementation
```tsx
// From: acn-o2c-prototype-fresh/src/components/layout/top-nav.tsx

const mainNavigation = [
  { name: 'My Work', href: '/my-work', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { 
    name: 'Payments', 
    icon: CreditCard,
    hasDropdown: true,
    children: [
      { name: 'Cash Application', href: '/cash-apps', icon: CreditCard },
      { name: 'Bank Reconciliation', href: '/bank-reconciliation', icon: Building2 },
    ]
  },
  // ... more items
];
```

### KPI Card Pattern
```tsx
// Pattern used across all projects
<div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 hover:shadow-xl transition-shadow">
  <div className="flex items-center justify-between mb-4">
    <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center">
      <Icon className="h-6 w-6 text-primary-600" />
    </div>
    <span className="text-sm font-medium text-green-600 flex items-center">
      <TrendingUp className="h-4 w-4 mr-1" />
      +12.5%
    </span>
  </div>
  <h3 className="text-2xl font-bold text-gray-900 mb-1">$4.2M</h3>
  <p className="text-sm text-gray-600">Total Revenue</p>
</div>
```

### Data Table Pattern
```tsx
// Pattern from multiple projects
<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
        Name {sortField === 'name' && <ChevronDown className="inline h-4 w-4" />}
      </TableHead>
      <TableHead className="text-right">Amount</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.id} className="hover:bg-gray-50 cursor-pointer">
        <TableCell className="font-medium">{item.name}</TableCell>
        <TableCell className="text-right tabular-nums">${item.amount.toLocaleString()}</TableCell>
        <TableCell>
          <StatusBadge status={item.status} />
        </TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="sm">View</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

## Adaptation Guide

### When Starting a New Project

1. **Choose a Reference Project**
   - Similar type (dashboard, workflow, analytics)?
   - Similar complexity?
   - Similar navigation needs?

2. **Review Key Files**
   - Navigation implementation
   - Layout structure
   - Component patterns
   - Branding approach

3. **Copy Patterns, Not Code**
   - Understand the pattern
   - Adapt to your needs
   - Don't copy-paste large files
   - Create your own implementation

4. **Maintain Standards**
   - Follow same design principles
   - Use consistent spacing
   - Apply same branding guidelines
   - Match quality level

---

## Project Comparison

| Feature | O2C Demo | Finance 360 | Macy's Analytics | R2R Workbench |
|---------|----------|-------------|------------------|---------------|
| **Navigation** | Top + Dropdowns | Top (Simple) | Sidebar | Top + Sidebar |
| **Branding** | Accenture | Accenture | Client (Macy's) | Accenture |
| **Complexity** | High | Medium | Medium | Very High |
| **AI Features** | Yes (Agents) | Yes (Insights) | Yes (Analytics) | Yes (Automation) |
| **Data Density** | High | Medium | High | Very High |
| **Mobile Support** | Yes | Yes | Partial | Desktop-first |
| **Best For Learning** | Navigation, AI patterns | Reporting, Charts | Client branding | Finance workflows |

---

## Contributing Examples

### If You Build Something Great

1. **Document it** in SOURCE-OF-TRUTH.md
2. **Add to this file** with description and key learnings
3. **Extract patterns** that others can reuse
4. **Create examples** in `get-started/templates/`
5. **Share with team** for feedback and improvements

---

## Additional Resources

### In This Repository
- `get-started/branding/` - Brand guidelines and components
- `get-started/design-standards/` - UI/UX best practices
- `get-started/templates/` - Reusable code templates

### External Learning
- Review actual project codebases
- Check project documentation (if available)
- Look at deployment URLs (if shared)
- Learn from both successes and mistakes

---

**Real projects are the best teachers. Study them, learn from them, adapt their patterns.**

