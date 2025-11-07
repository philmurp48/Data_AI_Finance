# Project Development Rules
## Controller AI Workbench Brand Enforcement

**Version:** 1.0  
**Last Updated:** October 28, 2025  
**Applies To:** All future prototype development using extracted patterns

---

## 🎨 **Brand Consistency Rules**

### **MANDATORY: Always use brand tokens and shared UI components**

#### **Color Usage**
- **Primary Brand Color:** MUST use `#A100FF` (Official Accenture Purple) for all primary actions and branding
- **Color Tokens:** MUST use predefined tokens from `branding/brand-tokens.json`
- **Semantic Colors:** MUST use standard semantic colors (success: `#10b981`, warning: `#f59e0b`, danger: `#ef4444`)
- **AI/Agent Colors:** MUST use agent purple (`#A100FF`) for all AI-related indicators

**✅ Correct:**
```tsx
className="bg-primary-500 text-white"
className="text-success border-success-light"
```

**❌ Incorrect:**
```tsx
className="bg-blue-500 text-white"  // Wrong brand color
className="text-green-500"          // Use success token instead
```

#### **Typography**
- **Font Family:** MUST use Inter for all UI text, JetBrains Mono for financial numbers
- **Financial Numbers:** MUST use `tabular-nums` and right alignment
- **Gradient Text:** Use brand gradient text for premium branding elements

**✅ Correct:**
```tsx
className="font-sans"                    // Inter font
className="font-mono tabular-nums text-right"  // Financial numbers
```

#### **Component Usage**
- **MUST** use shared brand components from `branding/ui/` for all common patterns
- **MUST** wrap charts in `ChartFrame` component  
- **MUST** use `PremiumCard` instead of base Card component
- **MUST** use `BrandHeader` for all page headers

---

## 🧩 **Component Architecture Rules**

### **Shared Component Priority**
1. **FIRST:** Check if `branding/ui/` has the component you need
2. **SECOND:** Use existing components from current prototype  
3. **LAST:** Create new component (and consider adding to brand library)

### **Required Imports**
```tsx
// Brand components (highest priority)
import { PremiumCard, BrandHeader, AgentBadge } from "@/branding/ui";

// Standard UI components  
import { Button, Input, Table } from "@/components/ui";

// Brand tokens (when needed)
import { BRAND_COLORS, CHART_COLORS } from "@/branding/ui";
```

### **Component Structure Standards**
- **TypeScript:** ALL components MUST be fully typed
- **Props Interface:** Define clear props interface for reusable components
- **Brand Compliance:** Use `cn()` utility for conditional classes
- **Accessibility:** Include proper ARIA attributes and semantic HTML

---

## 📝 **Writing & Content Rules**

### **MANDATORY: Follow writing style guide**

#### **Voice & Tone**
- **Professional & Trustworthy:** Use precise financial terminology
- **Action-Oriented:** Lead with action verbs, clear CTAs  
- **AI-Transparent:** Show AI processes with confidence levels
- **Information-Dense:** Organize complex data clearly

#### **Terminology Standards**
- Use "Record-to-Report (R2R)" not "Record to Report"
- Use "Journal entries" not "JEs" or "journal postings"
- Use "Month-end close" not "period close" 
- Use "AI-powered" not "AI-driven" or "AI-enabled"
- Use "Agent" not "bot" or "AI assistant"

#### **Status Labels**
```
✅ Use: "Pending Approval", "In Progress", "Completed", "Posted", "On Track"
❌ Avoid: "Awaiting Approval", "Processing", "Done", "Booked", "Green"  
```

#### **Page Title Format**
```
Pattern: [Functional Area] - [Brief Description]
Example: "Journal Entries - Manage journal entries"
```

---

## 🏗️ **Code Architecture Rules**

### **Directory Structure Standards**
```
app/                    # Next.js App Router pages
├── [module]/          # Feature-based organization
│   ├── page.tsx      # Main page component
│   └── [sub]/        # Sub-features
components/
├── ui/               # shadcn/ui base components
├── [feature]/        # Feature-specific components  
└── shared/           # Cross-feature reusable components
branding/
├── ui/               # Brand-compliant shared components
├── brand-tokens.json # Design system tokens  
└── writing-style.md  # Content guidelines
lib/
├── types/            # TypeScript definitions
├── data/             # Data access layer
└── utils.ts          # Utility functions
```

### **Naming Conventions**
- **Components:** PascalCase (`PremiumCard`, `AgentBadge`)
- **Files:** kebab-case (`premium-card.tsx`, `agent-badge.tsx`)
- **Props:** camelCase (`showSearch`, `onUserClick`)
- **Types/Interfaces:** PascalCase (`JournalEntry`, `AgentBadgeProps`)

### **Import Organization**
```tsx
// 1. External libraries
import React from "react";
import { NextPage } from "next";

// 2. Internal utilities
import { cn } from "@/lib/utils";

// 3. Types  
import type { JournalEntry } from "@/lib/types";

// 4. Brand components (priority)
import { PremiumCard, AgentBadge } from "@/branding/ui";

// 5. UI components
import { Button, Table } from "@/components/ui";

// 6. Feature components
import { DataTable } from "@/components/shared";

// 7. Data access
import { getJournalEntries } from "@/lib/data";
```

---

## 🎯 **Data & Schema Rules**

### **TypeScript Interface Standards**
```tsx
// Base entity pattern (REQUIRED)
interface BaseEntity {
  id: string;                    // UUID primary key
  [name]: string;               // Human readable name
  status: Status;               // Standardized status enum
  createdDate: Date;            // Audit trail
  lastModified: Date;           // Change tracking
}

// Approval workflow (REQUIRED for financial entities)
interface ApprovalWorkflow {
  preparedBy: string;
  preparedDate: Date;
  reviewedBy?: string;
  reviewedDate?: Date;
  approvedBy?: string;
  approvedDate?: Date;
}

// AI agent integration (REQUIRED when applicable)  
interface AgentEnhanced {
  agentGenerated: boolean;      // AI vs human created
  generatedBy?: string;         // Agent code (e.g., "Ja", "Ra")
  agentConfidence?: number;     // 0-100 confidence score
  automationStatus: "Fully Automated" | "Human Reviewed" | "Manual";
}
```

### **Status Enum Standards**
```tsx
// MUST use these exact status values
type Status = "Draft" | "Pending Approval" | "In Progress" 
  | "Completed" | "Posted" | "Reversed" | "Rejected" | "Blocked";

type Priority = "Critical" | "High" | "Medium" | "Low";
type Region = "Americas" | "EMEA" | "APAC";
```

---

## 📊 **Chart & Visualization Rules**

### **MANDATORY: Use ChartFrame wrapper**
```tsx
import { ChartFrame } from "@/branding/ui";

// ✅ Correct
<ChartFrame title="Revenue Trend" height={300}>
  <LineChart data={data} />
</ChartFrame>

// ❌ Incorrect  
<Card>
  <CardHeader>Revenue Trend</CardHeader>
  <LineChart data={data} />
</Card>
```

### **Color Standards**
```tsx
import { CHART_COLORS } from "@/branding/ui";

// MUST use brand colors for charts
const chartConfig = {
  colors: CHART_COLORS,  // [#A100FF, #3b82f6, #10b981, ...]
};
```

### **Chart Component Requirements**
- **Responsive:** All charts MUST use `ResponsiveContainer`
- **Tooltips:** Include branded tooltip styling
- **Accessibility:** Add ARIA labels for screen readers
- **Loading States:** Show loading skeleton while data loads

---

## 🚨 **AI Agent Integration Rules**

### **Agent Transparency Requirements**
- **MUST** show agent involvement with `AgentBadge` component
- **MUST** include confidence levels when available
- **MUST** provide "How AI..." explanations for complex processes
- **MUST** use agent purple color scheme (`#A100FF`)

### **Agent Badge Usage**
```tsx
import { AgentBadge } from "@/branding/ui";

// ✅ Required for AI-generated content
<AgentBadge 
  agentCode="Ja"
  status="completed"
  confidence={94}
  variant="subtle"
/>
```

### **AI Process Documentation**
```
MUST use pattern: "How AI [Action] [Object/Process]"
Examples:
- "How AI Forecasts Cash Position"
- "How AI Sequences Close Tasks"
- "How AI Matches Transactions"
```

---

## 🔧 **Development Workflow Rules**

### **Pre-Development Checklist**
- [ ] Read `docs/brand-extraction-report.md` for context
- [ ] Review `branding/writing-style.md` for content guidelines
- [ ] Check `branding/brand-tokens.json` for design tokens
- [ ] Examine `branding/ui/` for reusable components

### **Code Quality Standards**
- **TypeScript Strict Mode:** No `any` types allowed
- **Component Props:** Full TypeScript interface definitions
- **Accessibility:** WCAG 2.1 AA compliance minimum
- **Performance:** Use React.memo() for expensive components

### **Testing Requirements**
- **Visual Testing:** Components must match brand design system
- **Responsive Testing:** Test across all breakpoints (sm, md, lg, xl, 2xl)
- **Accessibility Testing:** Screen reader and keyboard navigation
- **Content Testing:** Verify writing style compliance

---

## 📱 **Responsive Design Rules**

### **Breakpoint Usage**
```tsx
// MUST use consistent breakpoints
className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
className="text-sm md:text-base xl:text-lg"  
className="p-4 md:p-6 xl:p-8"
```

### **Mobile-First Approach**
- Start with mobile layout, enhance for larger screens
- Use `hidden md:block` for desktop-only elements
- Ensure touch targets are at least 44px for mobile
- Test navigation patterns on mobile devices

---

## 🎨 **CSS & Styling Rules**

### **MANDATORY: Use Tailwind CSS classes**
```tsx
// ✅ Preferred Tailwind approach
className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-lg"

// ❌ Avoid custom CSS unless absolutely necessary
style={{ display: 'flex', alignItems: 'center' }}
```

### **Class Ordering Convention**
```tsx
// Layout → Spacing → Colors → Effects
className="flex items-center gap-4 p-6 bg-white text-gray-900 rounded-xl shadow-lg hover:shadow-xl"
```

### **Premium Effects Usage**
```tsx
// Use premium card classes
className="premium-card"

// Use gradient text for branding
className="gradient-text"  

// Use financial number formatting
className="financial-number"
```

---

## 🔒 **Security & Performance Rules**

### **Image Optimization**
```tsx
// MUST use Next.js Image component
import Image from "next/image";

<Image 
  src="/accenture-logo.png"
  alt="Accenture Logo"
  fill
  className="object-contain"
  priority  // For above-fold images
/>
```

### **Performance Standards**  
- Use `dynamic` imports for code splitting large components
- Implement proper loading states for all async operations
- Use `useMemo` and `useCallback` for expensive operations
- Lazy load data tables and charts below the fold

---

## ✅ **Compliance Checklist**

Before submitting code, ensure:

### **Brand Compliance**
- [ ] Uses Accenture purple (`#A100FF`) for primary branding
- [ ] Uses brand tokens from `branding/brand-tokens.json`
- [ ] Uses shared components from `branding/ui/`
- [ ] Follows writing style guidelines

### **Code Quality**
- [ ] Full TypeScript coverage with proper interfaces
- [ ] Follows naming conventions (PascalCase, camelCase, kebab-case)
- [ ] Uses consistent import organization
- [ ] Implements proper error handling

### **User Experience**
- [ ] Responsive across all breakpoints
- [ ] Accessible to screen readers and keyboard users
- [ ] Follows financial domain terminology
- [ ] Provides clear loading and error states

### **Performance**
- [ ] Uses Next.js Image optimization
- [ ] Implements code splitting where appropriate
- [ ] Uses proper memoization techniques
- [ ] Follows mobile-first responsive design

---

**Remember: These rules ensure consistency across all future prototypes and maintain the premium Controller AI Workbench brand experience.**
