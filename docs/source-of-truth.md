# Finance360 - Source of Truth

## Project Overview
Finance360 is an AI-powered management reporting platform built with Next.js, React, and Tailwind CSS, featuring Accenture branding.

## Recent Changes

### 2025-11-24: Final Logo Standardization
**Change**: Simplified logo path to root `/logo.png` to resolve all potential path/caching issues
**Implementation**:
1. Copied logo to `public/logo.png`
2. Updated `branding/ui/header.tsx` default prop
3. Updated `app/login/page.tsx`
4. Updated `app/management-layout.tsx` (header and menu)
5. Updated `branding/brand-tokens.json`

**Files Modified**:
1. `public/logo.png`
2. `branding/ui/header.tsx`
3. `app/login/page.tsx`
4. `app/management-layout.tsx`
5. `branding/brand-tokens.json`

### 2025-11-24: Fix Logo Path (Attempt 2)
**Change**: Renamed logo file to remove spaces and updated all references
**Implementation**:
1. Renamed `public/images/Accenture Logo.png` to `public/images/acn-logo.png`
2. Removed duplicate/conflicting files
3. Updated all references in Login, Layout, and Brand Tokens to use `/images/acn-logo.png`
4. This eliminates URL encoding issues with spaces and ensures a fresh cache

**Files Modified**:
1. `public/images/acn-logo.png` (renamed from Accenture Logo.png)
2. `app/login/page.tsx`
3. `app/management-layout.tsx`
4. `branding/brand-tokens.json`

### 2025-11-24: Fix Logo Path
**Change**: Standardized logo usage to use safe filename
**Implementation**:
1. Updated logo path in login page and management layout
2. Switched from `/images/Accenture Logo.png` (with spaces) to `/accenture-logo.png` (dashes, root)
3. Ensures consistent rendering across all environments

**Files Modified**:
1. `app/login/page.tsx`
2. `app/management-layout.tsx`

### 2025-11-24: Added Accenture Logo to Login Page
**Change**: Added Accenture logo at the top of the login page
**Implementation**:
1. Added Image import from next/image
2. Added Accenture logo above the Finance360 title
3. Logo is centered and sized at 200x200px with object-contain
4. Added priority loading for faster logo display
5. Increased bottom margin to mb-12 for better spacing

**Files Modified**:
1. `app/login/page.tsx`
   - Added `Image` import from 'next/image'
   - Added logo section above title with centered flex layout
   - Logo path: `/images/acn-logo.png` (renamed from `Accenture Logo.png` to avoid space/path issues)
   - Logo dimensions: 200x200px (increased from 120x120px for better visibility)
   - Added `priority` prop to Image component for faster loading

### 2025-11-24: Simplified Authentication
**Change**: Updated login to only require password (removed username field)
**Implementation**:
1. Removed username field from login form
2. Removed username state and User icon import
3. Updated authentication logic to only check password against "Seethefuture"
4. Updated error message to "Invalid password" instead of "Invalid username or password"

**Files Modified**:
1. `app/login/page.tsx`
   - Removed `username` state variable
   - Removed `User` icon from lucide-react imports
   - Removed username input field and its container div
   - Changed authentication check from `username === 'ACNFinance' && password === 'Seethefuture'` to `password === 'Seethefuture'`
   - Updated error message to "Invalid password"

**Security Note**: Password is "Seethefuture" (case-sensitive)

### 2025-11-17: Header and Menu Branding Update
**Change**: Updated header and menu layouts to match Controller AI Workbench branding
**Implementation**:
1. Added Accenture logo to header (positioned between hamburger menu and title)
2. Updated title to "Finance360" with bold white text
3. Added subtitle "AI-Powered Management Reporting" in purple-400 color
4. Organized header elements: hamburger menu → Accenture logo → title/subtitle stack
5. Added Accenture logo to slide-out menu header (positioned left of Finance360 title)

**Files Modified**:
1. `app/management-layout.tsx`
   - Added Image import from next/image
   - Added Accenture logo display in header (h-10 w-10, object-contain)
   - Restructured header title section to include two-line layout with title and subtitle
   - Used purple-400 color for subtitle to match Accenture brand purple
   - Added Accenture logo to menu panel header (h-8 w-8, object-contain)
   - Wrapped menu title in flex container with logo

**Visual Design**:
- Header Logo: 40x40px, flex-shrink-0 to prevent squishing
- Menu Logo: 32x32px, flex-shrink-0
- Title: text-lg (header) / text-xl (menu), font-bold, white color, leading-tight
- Subtitle: text-xs, purple-400, font-medium, leading-tight
- Maintains consistent spacing with space-x-3/4 between elements

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

