# Migrating Existing Projects to Get Started Standards

**Guide for updating existing projects with the get-started pack**

---

## Overview

Use this guide when you want to:
- Update an existing project's UI to match standards
- Apply Accenture branding to an older project
- Improve consistency across multiple projects
- Gradually adopt best practices

---

## Migration Strategy

### Approach: Gradual Adoption

**Don't try to update everything at once!**

1. **Start with high-impact, low-effort changes** (colors, branding)
2. **Update incrementally** (page by page, component by component)
3. **Test thoroughly** after each change
4. **Document changes** in project's SOURCE-OF-TRUTH.md

---

## Step-by-Step Migration

### Phase 1: Copy Resources (30 minutes)

#### 1.1 Copy Get Started Folder
```bash
# From your workspace root
cp -r get-started ./existing-project/
```

#### 1.2 Copy Cursor Configuration
```bash
cd existing-project
mkdir -p .cursor
cp get-started/cursor-config/cursor-rules.md .cursor/rules.md
cp get-started/cursor-config/cursor-commands.json .cursor/commands.json
```

#### 1.3 Copy Brand Components (if not already present)
```bash
# Copy brand UI components to your components folder
mkdir -p components/branding
cp -r get-started/branding/ui/* components/branding/
```

#### 1.4 Update Imports
Update your imports to point to the new brand components:
```tsx
// Old
import { Card } from '@/components/ui/card';

// New (in addition to old)
import { PremiumCard } from '@/components/branding';
```

---

### Phase 2: Update Branding (1-2 hours)

#### 2.1 Update Colors in Tailwind Config

**Before:**
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6',  // Old purple
      }
    }
  }
}
```

**After:**
```js
// tailwind.config.js
// Import from brand-tokens.json or define:
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#A100FF',  // Official Accenture purple
          50: '#faf5ff',
          100: '#f3e8ff',
          // ... rest of purple spectrum
        }
      }
    }
  }
}
```

#### 2.2 Update Logo

```tsx
// Before
<img src="/old-logo.png" alt="Logo" />

// After
<img src="/accenture-logo.png" alt="Accenture" className="h-12 w-auto" />
// Or use Greater Than symbol for established pages
```

#### 2.3 Global Color Updates

**Find and replace common patterns:**
```bash
# Find old purple usage
grep -r "bg-purple-500" .
grep -r "#8b5cf6" .

# Replace with new purple
# bg-purple-500 → bg-primary-500
# #8b5cf6 → #A100FF
```

**Use Cursor command:**
- Open Command Palette (`Cmd/Ctrl + K`)
- Type: `apply-brand-colors`
- Follow prompts to update colors automatically

---

### Phase 3: Update Navigation (2-3 hours)

#### 3.1 Audit Current Navigation
- [ ] Screenshot current navigation
- [ ] List all navigation items
- [ ] Note any dropdowns or submenus
- [ ] Check mobile menu implementation

#### 3.2 Compare to Standards
- Open `get-started/design-standards/navigation-patterns.md`
- Find pattern closest to your needs
- Note differences

#### 3.3 Update Navigation Component

**Option A: Gradual Update**
```tsx
// Update just the styling first
<nav className="bg-[#002244]">  // Update background color
  {/* Keep existing structure */}
</nav>
```

**Option B: Full Replacement**
```bash
# Copy reference implementation
cp get-started/templates/navigation-template.tsx components/layout/top-nav.tsx
# Customize for your project
```

#### 3.4 Test Navigation
- [ ] All links work
- [ ] Active states show correctly
- [ ] Dropdowns work (if applicable)
- [ ] Mobile menu works
- [ ] Keyboard navigation works

---

### Phase 4: Update Key Pages (Ongoing)

#### 4.1 Prioritize Pages
**High priority** (update first):
1. Landing page / Dashboard
2. Most frequently used pages
3. Client-facing pages

**Medium priority** (update next):
4. Settings and configuration pages
5. Admin pages

**Low priority** (update last):
6. Rarely used pages
7. Internal tools

#### 4.2 Page Update Process

For each page:

1. **Create backup branch**
   ```bash
   git checkout -b ui-update/page-name
   ```

2. **Update page structure**
   ```tsx
   // Add brand header if missing
   import { BrandHeader } from '@/components/branding';
   
   <BrandHeader title="Page Title" subtitle="Description" />
   ```

3. **Update components**
   - Replace generic cards with PremiumCard
   - Update buttons to use brand colors
   - Ensure consistent spacing

4. **Test thoroughly**
   - Visual check
   - Responsive check (mobile, tablet, desktop)
   - Functionality check

5. **Commit and merge**
   ```bash
   git add .
   git commit -m "Update [page-name] UI to match brand standards"
   git push origin ui-update/page-name
   # Create PR and merge
   ```

#### 4.3 Page Update Template

**Before:**
```tsx
export default function Page() {
  return (
    <div className="p-4">
      <h1>Page Title</h1>
      <div className="grid grid-cols-3 gap-4">
        {/* Old cards */}
      </div>
    </div>
  );
}
```

**After:**
```tsx
import { BrandHeader, Section, PremiumCard } from '@/components/branding';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <BrandHeader title="Page Title" subtitle="Page Description" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Section title="Section Title">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Updated cards */}
          </div>
        </Section>
      </main>
    </div>
  );
}
```

---

### Phase 5: Update Components (Ongoing)

#### 5.1 Component Audit

Create a spreadsheet or document:
| Component | Current State | Needs Update? | Priority | Status |
|-----------|--------------|---------------|----------|--------|
| Button | Generic | Yes | High | Not Started |
| Card | Basic | Yes | High | Not Started |
| Table | Works | Maybe | Medium | Not Started |

#### 5.2 Component Update Process

1. **Identify reusable components**
   - Buttons, cards, modals, forms
   - Find all usages: `grep -r "ComponentName" .`

2. **Update one at a time**
   - Start with most-used components
   - Update to match design standards
   - Test all usages

3. **Create variants if needed**
   ```tsx
   // Use CVA for variants
   import { cva } from 'class-variance-authority';
   
   const button = cva("base-classes", {
     variants: {
       intent: {
         primary: "bg-primary-500",
         secondary: "bg-gray-500"
       }
     }
   });
   ```

#### 5.3 Common Component Updates

**Buttons:**
```tsx
// Before
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Click Me
</button>

// After
<Button variant="primary" size="md">
  Click Me
</Button>
```

**Cards:**
```tsx
// Before
<div className="bg-white p-4 rounded shadow">
  Content
</div>

// After
<PremiumCard>
  Content
</PremiumCard>
```

**Forms:**
```tsx
// Before
<input className="border p-2 rounded" />

// After
<Input 
  className="..." 
  aria-label="Field name"
  aria-describedby="field-help"
/>
```

---

### Phase 6: Improve Consistency (Ongoing)

#### 6.1 Establish Spacing System

**Before (inconsistent):**
```tsx
<div className="mt-5 mb-3 px-7">  // Random values
```

**After (consistent):**
```tsx
<div className="mt-6 mb-4 px-8">  // 4px grid: 4, 8, 12, 16, 24, 32...
```

#### 6.2 Typography Consistency

**Before:**
```tsx
<h1 className="text-xl font-bold">Title</h1>
<p className="text-base">Content</p>
```

**After:**
```tsx
<h1 className="text-2xl md:text-3xl font-bold text-gray-900">Title</h1>
<p className="text-base text-gray-600">Content</p>
```

#### 6.3 Color Usage

**Replace all color usages:**
```bash
# Find all color classes
grep -r "bg-blue-" . | grep -v node_modules
grep -r "text-blue-" . | grep -v node_modules

# Replace systematically
# blue → primary (for brand color)
# green → success
# red → danger
# yellow/amber → warning
```

---

## UI Update Checklist

### Per Page/Component

- [ ] **Colors**
  - [ ] Primary actions use Accenture purple (#A100FF)
  - [ ] Success states use brand green
  - [ ] Warning states use brand amber
  - [ ] Error states use brand red
  - [ ] Neutral elements use brand grays

- [ ] **Typography**
  - [ ] Using brand fonts (Graphik/Inter)
  - [ ] Consistent size scale
  - [ ] Proper line heights
  - [ ] Financial numbers use tabular-nums

- [ ] **Spacing**
  - [ ] Follows 4px grid (4, 8, 12, 16, 24, 32, 48...)
  - [ ] Consistent padding/margins
  - [ ] Proper gaps between elements

- [ ] **Components**
  - [ ] Using brand components where applicable
  - [ ] Cards updated to PremiumCard
  - [ ] Buttons use proper variants
  - [ ] Forms follow standards

- [ ] **Layout**
  - [ ] Responsive (mobile, tablet, desktop)
  - [ ] Proper container widths
  - [ ] Consistent page structure
  - [ ] BrandHeader included

- [ ] **Accessibility**
  - [ ] Semantic HTML
  - [ ] ARIA labels present
  - [ ] Keyboard navigation works
  - [ ] Color contrast sufficient

- [ ] **Performance**
  - [ ] Images optimized
  - [ ] No layout shift
  - [ ] Fast load time

---

## Testing After Updates

### Visual Testing
1. **Screenshot before/after** - Document improvements
2. **Check all breakpoints** - Mobile, tablet, desktop
3. **Verify brand consistency** - Colors, fonts, spacing
4. **Cross-browser test** - Chrome, Safari, Firefox

### Functional Testing
1. **All interactions work** - Clicks, hovers, focus
2. **Forms submit correctly** - Validation, error handling
3. **Navigation functions** - All links, dropdowns
4. **Loading states show** - Spinners, skeletons

### Accessibility Testing
1. **Keyboard navigation** - Tab through page
2. **Screen reader test** - Use VoiceOver or NVDA
3. **Color contrast** - Use contrast checker tool
4. **Semantic HTML** - Review structure

---

## Rollout Strategy

### Option 1: Big Bang (Not Recommended)
- Update entire project at once
- High risk
- Long testing period
- Only for small projects

### Option 2: Gradual Rollout (Recommended)
```
Week 1: Branding (colors, logo) + Navigation
Week 2: Landing/Dashboard page
Week 3-4: 2-3 high-traffic pages
Week 5-6: Remaining pages
Week 7+: Polish and refinement
```

### Option 3: Feature Flag
- Implement new UI behind feature flag
- Test with subset of users
- Gradually roll out
- Easy rollback if issues

---

## Multiple Projects Strategy

### If updating multiple projects:

#### 1. Choose Pilot Project
- Pick medium complexity project
- Test full migration process
- Document lessons learned
- Refine process

#### 2. Create Migration Playbook
- Document exact steps taken
- Note time required for each phase
- List common issues and solutions
- Create project-specific checklist

#### 3. Standardize Across Projects
- Use same folder structure
- Same component naming
- Same patterns for common features
- Shared component library (if feasible)

#### 4. Efficient Multi-Project Updates

**For each project:**
```bash
# 1. Copy get-started pack
cp -r ../get-started ./project-name/

# 2. Update colors (global find/replace)
# Use your IDE or Cursor

# 3. Update navigation
# Copy from reference project

# 4. Update pages one by one
# Use templates and examples

# 5. Test and deploy
# Use preview deployments
```

---

## Common Pitfalls

### ❌ Don't Do This

1. **Update everything at once** - Too risky, hard to debug
2. **Skip testing** - Will cause issues in production
3. **Ignore accessibility** - Required for professional quality
4. **Inconsistent application** - Defeats the purpose
5. **No documentation** - Future you will be confused

### ✅ Do This

1. **Update incrementally** - Page by page, component by component
2. **Test thoroughly** - Visual, functional, accessibility
3. **Document changes** - Update SOURCE-OF-TRUTH.md
4. **Get feedback** - From team and users
5. **Measure improvement** - Before/after screenshots, metrics

---

## Measuring Success

### Before Migration
- [ ] Screenshot key pages
- [ ] Note inconsistencies
- [ ] List pain points
- [ ] Time basic tasks

### After Migration
- [ ] Compare screenshots
- [ ] Check consistency
- [ ] Verify improvements
- [ ] Time same tasks

### Success Criteria
- ✅ All pages use brand colors
- ✅ Navigation is consistent
- ✅ Components follow standards
- ✅ Responsive on all devices
- ✅ Accessible (WCAG AA)
- ✅ Professional polish
- ✅ Team can maintain easily

---

## Support

### If you get stuck:

1. **Reference guides**
   - `get-started/design-standards/` - Design guidelines
   - `get-started/project-examples/` - Real examples
   - `get-started/templates/` - Code templates

2. **Check existing projects**
   - Look at your O2C Demo project
   - See how patterns are implemented
   - Copy and adapt

3. **Use Cursor AI**
   - Reference the rules in `.cursor/rules.md`
   - Use commands in `.cursor/commands.json`
   - Ask Cursor to help apply patterns

---

## Timeline Estimates

### Small Project (5-10 pages)
- **Phase 1-2 (Branding):** 2-3 hours
- **Phase 3 (Navigation):** 2-3 hours
- **Phase 4-5 (Pages/Components):** 8-12 hours
- **Phase 6 (Polish):** 2-4 hours
- **Total:** 14-22 hours (2-3 days)

### Medium Project (20-30 pages)
- **Phase 1-2:** 3-4 hours
- **Phase 3:** 3-4 hours
- **Phase 4-5:** 20-30 hours
- **Phase 6:** 4-6 hours
- **Total:** 30-44 hours (4-6 days)

### Large Project (50+ pages)
- **Phase 1-2:** 4-6 hours
- **Phase 3:** 4-6 hours
- **Phase 4-5:** 40-60 hours
- **Phase 6:** 8-12 hours
- **Total:** 56-84 hours (7-11 days)

**Tip:** Spread over time, update as you work on each page naturally

---

**Gradual, consistent improvement beats trying to perfect everything at once.**

