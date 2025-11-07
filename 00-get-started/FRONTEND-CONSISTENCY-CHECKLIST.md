# Frontend Consistency Checklist

**Quick reference for maintaining consistent UI across all projects**

---

## Purpose

Use this checklist when:
- Starting a new page or component
- Reviewing code before merging
- Updating existing UI
- Ensuring brand compliance

---

## Quick Visual Check

### Does it look professional at first glance?
- [ ] Clean, not cluttered
- [ ] Consistent spacing (not random gaps)
- [ ] Proper alignment
- [ ] Good use of whitespace
- [ ] No emojis or unprofessional elements

---

## 🎨 Branding Compliance

### Colors
- [ ] Primary actions use **#A100FF** (Accenture purple)
- [ ] Success states use **#10b981** (green)
- [ ] Warning states use **#f59e0b** (amber)
- [ ] Danger/error states use **#ef4444** (red)
- [ ] Info states use **#3b82f6** (blue)
- [ ] Neutral elements use brand grays
- [ ] No random blues, greens, or colors outside brand palette

### Logo
- [ ] Accenture logo on first brand interaction
- [ ] Greater Than symbol (>) for subsequent pages
- [ ] Logo has proper clear space
- [ ] Logo not distorted or altered

### Typography
- [ ] Using Graphik or Inter font family
- [ ] Consistent font sizes from scale (sm, base, lg, xl, 2xl...)
- [ ] Financial numbers use `tabular-nums` class
- [ ] Proper font weights (semibold for headings, regular for body)

---

## 📐 Layout & Spacing

### Spacing
- [ ] Follows 4px grid: 4, 8, 12, 16, 24, 32, 48, 64...
- [ ] Consistent padding: `p-4`, `p-6`, `p-8`
- [ ] Consistent gaps: `gap-4`, `gap-6`, `gap-8`
- [ ] Consistent margins: `mt-6`, `mb-8`, etc.
- [ ] No random spacing values (no `mt-5`, `p-7`, etc.)

### Layout Structure
- [ ] Proper container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- [ ] Page has gradient background (if applicable)
- [ ] Proper sectioning with `<Section>` component
- [ ] Consistent page margins and padding

### Grid Systems
- [ ] Using Tailwind grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- [ ] Consistent gap between grid items
- [ ] Responsive grid (changes columns at breakpoints)

---

## 🧩 Component Usage

### Standard Components
- [ ] Using `PremiumCard` instead of basic card
- [ ] Using `BrandHeader` for page headers
- [ ] Using `Section` for page sections
- [ ] Using brand `Button` component with proper variants
- [ ] Charts wrapped in `ChartFrame`
- [ ] Tables use consistent styling

### Component Consistency
- [ ] Same component used for same purpose across pages
- [ ] Components imported from brand system when available
- [ ] No duplicate implementations of same pattern

---

## 📱 Responsive Design

### Breakpoints
- [ ] Works on mobile (320px - 640px)
- [ ] Works on tablet (640px - 1024px)
- [ ] Works on desktop (1024px+)
- [ ] No horizontal scrolling on small screens

### Responsive Classes
- [ ] Using responsive prefixes: `md:`, `lg:`, `xl:`
- [ ] Mobile-first approach (base styles, then `md:` overrides)
- [ ] Text sizes responsive: `text-sm md:text-base lg:text-lg`
- [ ] Spacing responsive: `p-4 md:p-6 lg:p-8`
- [ ] Grids responsive: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

### Touch Targets
- [ ] Buttons at least 44x44 pixels (h-11 minimum)
- [ ] Links have sufficient click area
- [ ] Mobile menu accessible and functional

---

## ♿ Accessibility

### Semantic HTML
- [ ] Using `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- [ ] Not using div soup
- [ ] Headings in logical order (h1 → h2 → h3)
- [ ] Lists using `<ul>` or `<ol>`

### ARIA & Labels
- [ ] Images have `alt` text (descriptive, not "image")
- [ ] Buttons have labels or `aria-label`
- [ ] Icons-only buttons have `aria-label`
- [ ] Form inputs have associated labels
- [ ] Form errors use `aria-describedby` and `aria-invalid`

### Keyboard Navigation
- [ ] All interactive elements keyboard accessible
- [ ] Tab order logical
- [ ] Focus indicators visible
- [ ] Can close modals with Escape key
- [ ] Skip navigation link present (if applicable)

### Color Contrast
- [ ] Text has at least 4.5:1 contrast ratio
- [ ] Large text (18pt+) has at least 3:1
- [ ] Interactive elements distinguishable
- [ ] Not relying on color alone to convey meaning

---

## 🎭 Interactive States

### Hover States
- [ ] Hover states defined for interactive elements
- [ ] Smooth transitions: `transition-all` or `transition-colors`
- [ ] Visual feedback on hover (color change, shadow, etc.)

### Focus States
- [ ] Visible focus ring on all interactive elements
- [ ] Focus ring uses brand color: `focus:ring-primary-500`
- [ ] Focus ring offset for clarity: `focus:ring-offset-2`

### Active States
- [ ] Active/pressed states defined
- [ ] Current page highlighted in navigation
- [ ] Selected items clearly indicated

### Disabled States
- [ ] Disabled elements have reduced opacity
- [ ] Disabled elements not keyboard accessible
- [ ] Cursor shows not-allowed: `disabled:cursor-not-allowed`

### Loading States
- [ ] Spinner or skeleton shown while loading
- [ ] Button shows loading state (spinner + disabled)
- [ ] Loading doesn't cause layout shift

### Empty States
- [ ] Icon or illustration
- [ ] Clear message explaining why empty
- [ ] Call-to-action to add first item (if applicable)

### Error States
- [ ] Clear error message
- [ ] Suggestions for resolution
- [ ] Retry option (if applicable)

---

## 📝 Content & Copy

### Writing Style
- [ ] Professional tone (no casual language)
- [ ] No emojis in production UI
- [ ] Clear, concise copy
- [ ] Action-oriented button labels
- [ ] Helpful error messages (not just "Error!")

### Consistency
- [ ] Same terminology across pages
- [ ] Consistent capitalization (Title Case or Sentence case)
- [ ] Consistent label format
- [ ] Consistent date/number formatting

---

## 🎬 Animations & Transitions

### Transitions
- [ ] Smooth transitions on interactive elements
- [ ] Duration: 150-300ms (fast to normal)
- [ ] Easing: `ease-out` or `ease-in-out`
- [ ] Only animating opacity and transform (performant)

### Animations
- [ ] Subtle, not distracting
- [ ] Purpose-driven (not just decoration)
- [ ] Can be reduced/disabled (respect prefers-reduced-motion)

---

## 🚀 Performance

### Images
- [ ] Using Next.js `<Image>` component
- [ ] Proper width and height specified
- [ ] Alt text provided
- [ ] Priority set for above-fold images
- [ ] Lazy loading for below-fold images

### Code
- [ ] No console.log in production
- [ ] No unused imports
- [ ] No commented-out code
- [ ] Components properly memoized (if needed)

### Bundle
- [ ] Only importing what's needed
- [ ] Large libraries dynamically imported
- [ ] No duplicate dependencies

---

## 🔍 Code Quality

### TypeScript
- [ ] No `any` types
- [ ] Proper interfaces defined
- [ ] Props interface matches component
- [ ] Return types specified (when not obvious)

### Structure
- [ ] Component in correct folder
- [ ] File named correctly (kebab-case)
- [ ] Component named correctly (PascalCase)
- [ ] Proper import organization

### Comments
- [ ] JSDoc comment on component
- [ ] Complex logic explained
- [ ] No obvious comments (don't comment what code does)

---

## 📄 Page-Specific Checklist

### Every Page Should Have
- [ ] `BrandHeader` with title and subtitle
- [ ] Gradient background (or appropriate background)
- [ ] Proper container width and padding
- [ ] At least one `Section`
- [ ] Consistent with other pages

### Navigation
- [ ] Current page highlighted
- [ ] All links work
- [ ] Breadcrumbs (if applicable)
- [ ] Back button (if applicable)

### Forms
- [ ] Labels for all inputs
- [ ] Validation on submit
- [ ] Clear error messages
- [ ] Success feedback
- [ ] Disabled state during submission

### Data Tables
- [ ] Sortable columns (when applicable)
- [ ] Pagination (for large datasets)
- [ ] Loading state
- [ ] Empty state
- [ ] Row hover state
- [ ] Responsive (stack on mobile)

---

## 🔧 Pre-Commit Checklist

Before committing code:
- [ ] Lint check passes: `npm run lint`
- [ ] Type check passes: `npm run type-check`
- [ ] Build succeeds: `npm run build`
- [ ] Visual check in browser
- [ ] Responsive check (DevTools device toolbar)
- [ ] Accessibility check (Lighthouse)

---

## ✅ Pre-Merge Checklist

Before merging PR:
- [ ] All checklist items above verified
- [ ] Tested on actual devices (not just DevTools)
- [ ] Screenshots added to PR (before/after if updating UI)
- [ ] SOURCE-OF-TRUTH.md updated
- [ ] Team review completed
- [ ] Deploy to preview and test

---

## 📊 Quick Quality Score

Give yourself 1 point for each section fully checked:

- Branding (3 items): ___/3
- Layout & Spacing (3 items): ___/3
- Components (2 items): ___/2
- Responsive (3 items): ___/3
- Accessibility (4 items): ___/4
- Interactive States (6 items): ___/6
- Content (2 items): ___/2
- Animations (2 items): ___/2
- Performance (3 items): ___/3
- Code Quality (3 items): ___/3

**Total: ___/31**

**Target Score:** 28+ (90%+) before merging

---

## 🎯 Common Issues & Quick Fixes

### Issue: Inconsistent colors
**Fix:** Find/replace all color classes with brand colors

### Issue: Random spacing
**Fix:** Use 4px grid values only (4, 8, 12, 16, 24, 32, 48)

### Issue: Not responsive
**Fix:** Add responsive prefixes (`md:`, `lg:`) to layout/text classes

### Issue: Poor accessibility
**Fix:** Add ARIA labels, semantic HTML, improve contrast

### Issue: Looks different from other pages
**Fix:** Use `BrandHeader`, `Section`, and brand components

### Issue: Slow performance
**Fix:** Use Next.js Image, lazy load, check bundle size

---

## 💡 Pro Tips

1. **Use this checklist WHILE coding** (not just before commit)
2. **Review others' code with this checklist**
3. **Add project-specific items** as needed
4. **Update checklist when you find new issues**
5. **Make it part of PR template**

---

## 🔗 Quick Links

- [Setup Checklist](./SETUP-CHECKLIST.md)
- [Design Standards](./design-standards/README.md)
- [Navigation Patterns](./design-standards/navigation-patterns.md)
- [Brand Tokens](./branding/brand-tokens.json)
- [Migration Guide](./EXISTING-PROJECT-MIGRATION.md)

---

**Consistency is the foundation of professional quality. Check every box, every time.**

