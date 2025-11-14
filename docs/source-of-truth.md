# Finance360 - Source of Truth

## Project Overview
Finance360 is an AI-powered management reporting platform built with Next.js, React, and Tailwind CSS, featuring Accenture branding.

## Recent Changes

### 2025-11-14: Safari Animation and Rendering Fixes
**Issue**: Safari browser experiencing page-wide pulsing/flickering and refresh issues
**Root Causes**: 
1. Tailwind's default `animate-pulse` uses opacity transitions which Safari handles poorly
2. `backdrop-blur` CSS filter causes Safari rendering performance issues
3. Framer Motion spring animations and opacity transitions on fixed elements cause repaints
4. Lack of GPU acceleration hints for fixed position elements

**Solutions Implemented**:

**Phase 1 - Pulse Animation Fix**:
1. Created Safari-optimized pulse animation using `transform: scale()` instead of opacity
2. Replaced `animate-pulse` with `animate-safari-pulse` throughout the app

**Phase 2 - Backdrop Blur and Framer Motion Fixes**:
1. Removed `backdrop-blur-sm` from search input and disabled backdrop filters
2. Added GPU acceleration to framer-motion backdrop overlay
3. Replaced spring animation with tween for menu panel (smoother in Safari)
4. Added global Safari-specific CSS optimizations

**Files Modified**:
1. `app/globals.css`
   - Added `@keyframes safari-pulse` animation using transform-based scaling
   - Added `.animate-safari-pulse` class with GPU acceleration hints
   - Added Safari-specific backdrop-blur optimizations
   - Added GPU acceleration for all fixed position elements
   - Added Safari-specific font smoothing and transform optimizations

2. `app/management-layout.tsx`
   - Replaced `animate-pulse` with `animate-safari-pulse` on menu toggle button
   - Removed `backdrop-blur-sm` from search input, disabled backdrop filter via inline style
   - Added GPU acceleration styles to framer-motion backdrop overlay
   - Changed menu panel animation from spring to tween (type: "tween", duration: 0.3)
   - Added GPU acceleration styles to menu panel

3. `app/login/page.tsx`
   - Replaced `animate-pulse` with `animate-safari-pulse` on all animated background dots

**Technical Details**:
- Safari has known issues with opacity-based animations causing repaints
- Safari's backdrop-filter implementation is CPU-intensive and causes flickering
- Transform-based animations are hardware-accelerated and perform better
- Spring animations can cause excessive repaints in Safari; tween animations are more efficient
- Added `-webkit-transform: translateZ(0)` to force GPU acceleration
- Used `will-change` hints to optimize browser rendering pipeline
- Disabled backdrop filters on problematic elements while maintaining visual appearance

**Testing**: Tested in Safari on macOS - pulsing and refresh issues should be resolved

## Key Architectural Decisions

### Animation Strategy
- **Preference**: Use transform-based animations over opacity for better cross-browser performance
- **Safari Compatibility**: Always test animations in Safari as it has stricter rendering requirements
- **GPU Acceleration**: Use `translateZ(0)` and `will-change` for complex animations

### Browser Compatibility
- Primary browsers: Chrome, Safari, Edge, Firefox
- Safari requires special attention for animations and transitions
- Always test visual effects across browsers before deployment

## Component Inventory

### Layout Components
- `app/management-layout.tsx` - Main application layout with navigation
- `app/layout-wrapper.tsx` - Layout wrapper component
- `app/layout.tsx` - Root layout

### Page Components
- `app/page.tsx` - Home page
- `app/login/page.tsx` - Login page
- `app/executive-summary/page.tsx` - Executive summary dashboard
- `app/monthly-report/page.tsx` - Monthly operating report
- `app/business-consoles/page.tsx` - Business insight consoles
- `app/scenario-modeling/page.tsx` - Scenario modeling
- `app/report-hub/page.tsx` - Report hub
- `app/month-end-close/page.tsx` - Month-end close
- `app/connected-planning/page.tsx` - Connected enterprise planning
- `app/ai-agents/page.tsx` - AI agents gallery
- `app/ai-alerts/page.tsx` - AI alert system

### Styling
- `app/globals.css` - Global styles and CSS variables
- `tailwind.config.ts` - Tailwind configuration
- `branding/brand-tokens.json` - Brand design tokens

## Known Issues
- None currently

## Future Considerations
- Consider auditing all animations for Safari compatibility
- May want to create additional browser-optimized animation utilities
- Consider adding automated cross-browser testing for animations

