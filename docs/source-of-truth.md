# Finance360 - Source of Truth

## Project Overview
Finance360 is an AI-powered management reporting platform built with Next.js, React, and Tailwind CSS, featuring Accenture branding.

## Recent Changes

### 2025-11-14: Safari Animation Fix
**Issue**: Safari browser experiencing page-wide pulsing/flickering due to opacity-based animations
**Root Cause**: Tailwind's default `animate-pulse` uses opacity transitions which Safari handles poorly, causing rendering issues
**Solution**: Created Safari-optimized pulse animation using `transform: scale()` instead of opacity

**Files Modified**:
1. `app/globals.css`
   - Added `@keyframes safari-pulse` animation using transform-based scaling
   - Added `.animate-safari-pulse` class with GPU acceleration hints
   - Used `translateZ(0)` and `will-change: transform` for smoother Safari rendering

2. `app/management-layout.tsx`
   - Replaced `animate-pulse` with `animate-safari-pulse` on menu toggle button (line 120)

3. `app/login/page.tsx`
   - Replaced `animate-pulse` with `animate-safari-pulse` on all animated background dots (lines 42-45)

**Technical Details**:
- Safari has known issues with opacity-based animations causing repaints
- Transform-based animations are hardware-accelerated and perform better
- Added `-webkit-transform: translateZ(0)` to force GPU acceleration
- Used `will-change: transform` to hint browser optimization

**Testing**: Should be tested in Safari on macOS to verify pulsing issue is resolved

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

