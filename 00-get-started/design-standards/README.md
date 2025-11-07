# Design Standards

**Professional UI/UX best practices for enterprise applications**

---

## Overview

This folder contains comprehensive design standards to ensure all projects maintain professional, accessible, and user-centered design quality.

---

## Contents

### Core Documents
- `ui-ux-principles.md` - Foundational design principles and philosophy
- `navigation-patterns.md` - Navigation and menu design patterns
- `component-patterns.md` - Common UI component patterns and best practices
- `accessibility-standards.md` - WCAG AA compliance guidelines
- `writing-style-guide.md` - Content and microcopy standards
- `design-checklist.md` - Pre-launch design review checklist

### Design Philosophy

Our design approach is built on these pillars:

1. **Person-Centered Design** - Users and their needs drive all decisions
2. **Accessibility First** - WCAG AA minimum, AAA where possible
3. **Professional Polish** - Enterprise-grade quality, no shortcuts
4. **Consistent Experience** - Patterns users recognize and trust
5. **Performance Matters** - Fast, responsive, delightful interactions

---

## Quick Reference

### Design Principles Summary

#### 1. Clarity Over Cleverness
- Use familiar patterns users already understand
- Clear labels, no jargon or industry speak
- Obvious next actions and CTAs
- Helpful error messages and feedback

#### 2. Consistency Builds Trust
- Same patterns across all pages
- Consistent spacing, colors, typography
- Predictable interactions and behaviors
- Unified voice and tone

#### 3. Accessibility is Non-Negotiable
- WCAG AA minimum standard
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast
- Semantic HTML structure

#### 4. Performance is UX
- Fast page loads (<3 seconds)
- Smooth animations and transitions
- No layout shift or jank
- Optimized images and assets

#### 5. Mobile-First, Desktop-Enhanced
- Design for smallest screen first
- Progressive enhancement for larger screens
- Touch-friendly targets (minimum 44x44px)
- Thumb-reach zones for mobile

---

## Design System Components

### Layout & Structure

#### Spacing Scale
Use consistent spacing based on 4px grid:
```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px
```

#### Breakpoints
```
sm:  640px  (mobile landscape, small tablet)
md:  768px  (tablet portrait)
lg:  1024px (tablet landscape, small desktop)
xl:  1280px (desktop)
2xl: 1536px (large desktop)
```

#### Container Widths
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### Typography

#### Font Families
```
Sans:    Graphik, Inter, system-ui, Arial, sans-serif
Serif:   GT Sectra Fine, Georgia, serif
Mono:    Courier, JetBrains Mono, Monaco, monospace
```

#### Type Scale
```
xs:   0.75rem (12px)
sm:   0.875rem (14px)
base: 1rem (16px)
lg:   1.125rem (18px)
xl:   1.25rem (20px)
2xl:  1.5rem (24px)
3xl:  1.875rem (30px)
4xl:  2.25rem (36px)
5xl:  3rem (48px)
```

#### Line Heights
```
tight:   1.25
normal:  1.5
relaxed: 1.625
loose:   2
```

### Colors

#### Primary (Accenture Purple)
```
Core:     #A100FF
Dark:     #7500C0
Darkest:  #460073
Light:    #C2A3FF
Lightest: #E6DCFF
```

#### Semantic
```
Success: #10b981 (green)
Warning: #f59e0b (amber)
Danger:  #ef4444 (red)
Info:    #3b82f6 (blue)
```

#### Neutrals
```
Black:  #000000
Gray:   #818180, #CFCFCF, #F1F1EF
White:  #FFFFFF
```

### Shadows

```css
sm:      0 1px 2px 0 rgba(0, 0, 0, 0.05)
default: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
md:      0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg:      0 10px 15px -3px rgba(0, 0, 0, 0.1)
xl:      0 20px 25px -5px rgba(0, 0, 0, 0.1)
2xl:     0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

### Border Radius

```
sm:  0.125rem (2px)
md:  0.375rem (6px)
lg:  0.5rem (8px)
xl:  0.75rem (12px)
2xl: 1rem (16px)
full: 9999px
```

---

## Component Standards

### Buttons

#### Sizes
```
sm:  h-9 (36px) px-4 text-sm
md:  h-10 (40px) px-6 text-base
lg:  h-12 (48px) px-8 text-lg
```

#### Variants
```
Primary:   Purple gradient background, white text
Secondary: White background, gray border, gray text
Outline:   Transparent background, purple border, purple text
Ghost:     Transparent background, no border, gray text
Danger:    Red background, white text
```

#### States
```
Default:  Base styling
Hover:    Slightly darker, subtle lift
Active:   Pressed down effect
Focus:    Ring outline for accessibility
Disabled: Reduced opacity, no interaction
Loading:  Spinner + disabled state
```

### Form Inputs

#### Requirements
- Label above input (not placeholder-only)
- Helper text below when needed
- Error message replace helper text
- Clear focus states with ring
- Appropriate input types (email, tel, number, etc.)

#### Sizes
```
sm: h-8 (32px)
md: h-10 (40px)
lg: h-12 (48px)
```

### Cards

#### Standard Card
```tsx
<div className="bg-white rounded-xl border border-gray-200 shadow-md p-6">
  {/* Card content */}
</div>
```

#### Premium Card (with hover)
```tsx
<div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 transition-all hover:shadow-xl hover:-translate-y-1">
  {/* Card content */}
</div>
```

### Data Tables

#### Requirements
- Sortable columns (when applicable)
- Pagination for large datasets
- Search/filter capabilities
- Loading states
- Empty states
- Row hover states
- Responsive (stack on mobile)

### Modals/Dialogs

#### Requirements
- Backdrop overlay (semi-transparent)
- Focus trap (keyboard users stay in modal)
- ESC key to close
- Close button visible
- Prevent body scroll when open
- Smooth enter/exit animations

---

## Interaction Patterns

### Loading States

#### Skeleton Loaders
Use for content that will load quickly (<2 seconds):
```tsx
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
</div>
```

#### Spinners
Use for actions or content taking longer:
```tsx
<div className="flex items-center justify-center">
  <div className="animate-spin h-8 w-8 border-4 border-primary-200 border-t-primary-600 rounded-full"></div>
</div>
```

### Empty States

Always include:
- Icon or illustration
- Heading describing what's empty
- Brief explanation why
- Clear next action (CTA button)

```tsx
<div className="text-center py-12">
  <Icon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
  <h3 className="text-lg font-semibold text-gray-900 mb-2">No items yet</h3>
  <p className="text-gray-600 mb-6">Get started by creating your first item.</p>
  <Button>Create Item</Button>
</div>
```

### Error States

#### Inline Errors (Form Fields)
```tsx
<div>
  <label>Email</label>
  <input 
    className="border-red-500 focus:ring-red-500"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <p id="email-error" className="text-sm text-red-600 mt-1">
    Please enter a valid email address
  </p>
</div>
```

#### Page-Level Errors
Include:
- Error icon
- Clear error message
- Suggested resolution
- Retry button (if retryable)
- Support contact (if needed)

---

## Responsive Design

### Mobile-First Approach

Start with mobile, enhance for desktop:

```tsx
// Mobile default, desktop enhancement
<div className="flex flex-col lg:flex-row">
  <aside className="w-full lg:w-64">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>
```

### Responsive Typography

```tsx
className="text-sm md:text-base lg:text-lg"
```

### Responsive Spacing

```tsx
className="p-4 md:p-6 lg:p-8"
className="gap-4 md:gap-6 lg:gap-8"
```

### Responsive Grid

```tsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
```

---

## Animation Guidelines

### Duration
```
Fast:    150ms (micro-interactions)
Normal:  200ms (most transitions)
Slow:    300ms (complex animations)
Slower:  500ms (page transitions)
```

### Easing
```
ease-out:   Decelerating (most UI transitions)
ease-in:    Accelerating (exit animations)
ease-in-out: Both (complex movements)
linear:     Constant speed (loaders, spinners)
```

### What to Animate
- ✅ Opacity
- ✅ Transform (translate, scale, rotate)
- ✅ Box shadow
- ✅ Background color
- ✅ Border color
- ❌ Width/height (use transform scale instead)
- ❌ Layout properties (causes reflow)

### Performance
- Use `transform` and `opacity` for best performance
- Avoid animating properties that cause layout recalculation
- Use `will-change` sparingly for complex animations
- Test on low-end devices

---

## Dark Mode Considerations

### Implementation
```tsx
// Tailwind dark mode classes
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  {/* Content */}
</div>
```

### Color Adjustments
- Reduce contrast in dark mode (use gray-200 instead of white)
- Increase contrast for text (use white or gray-100)
- Adjust shadow colors (use lighter shadows)
- Test all color combinations for accessibility

---

## Documentation Standards

### Component Documentation

Every component should include:
```tsx
/**
 * Button Component
 * 
 * A flexible button component with multiple variants and sizes.
 * 
 * @param variant - Visual style (primary, secondary, outline, ghost, danger)
 * @param size - Button size (sm, md, lg)
 * @param disabled - Whether button is disabled
 * @param loading - Shows loading spinner and disables interaction
 * @param onClick - Click handler function
 * @param children - Button label/content
 * 
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click Me
 * </Button>
 */
```

---

## Resources

### Internal Documents
- `navigation-patterns.md` - Navigation design patterns
- `component-patterns.md` - Common component patterns
- `accessibility-standards.md` - Accessibility requirements
- `writing-style-guide.md` - Content and microcopy guide
- `design-checklist.md` - Pre-launch review checklist

### External Resources
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design](https://m3.material.io/) - Reference for interaction patterns
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) - iOS/macOS patterns
- [Nielsen Norman Group](https://www.nngroup.com/) - UX research and guidelines

---

## Review Process

### Before Launch Checklist

#### Design Quality
- [ ] Follows brand guidelines
- [ ] Consistent spacing and alignment
- [ ] Professional polish (no placeholder content)
- [ ] No emojis or unprofessional elements
- [ ] High-quality images (optimized)

#### Functionality
- [ ] All interactions work as expected
- [ ] Forms validate properly
- [ ] Error states handled gracefully
- [ ] Loading states implemented
- [ ] Empty states designed

#### Accessibility
- [ ] WCAG AA compliant
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Color contrast verified
- [ ] Focus indicators visible

#### Responsive Design
- [ ] Works on mobile (320px+)
- [ ] Works on tablet (768px+)
- [ ] Works on desktop (1024px+)
- [ ] No horizontal scrolling
- [ ] Touch targets appropriate size

#### Performance
- [ ] Page loads quickly (<3s)
- [ ] No layout shift
- [ ] Smooth animations
- [ ] Images optimized
- [ ] Minimal bundle size

---

**Quality design is not an accident. It's the result of following proven principles and patterns consistently.**

