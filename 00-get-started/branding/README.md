# Branding System

**Complete brand package for professional Accenture and client prototypes**

---

## Overview

This branding system provides everything you need to create consistent, professional prototypes that match Accenture standards or adapt to client branding requirements.

### What's Included

- **Official Accenture Brand Guidelines** - Complete visual identity standards
- **Flexible Brand Tokens** - Adaptable color, typography, and design system
- **Logo Assets** - Accenture Greater Than symbol and logo variations
- **UI Component Library** - Pre-built, brand-compliant components
- **Brand Configuration** - Easy switching between Accenture and client branding

---

## Quick Reference

### Accenture Brand Identity

#### Primary Elements
- **Color:** Purple #A100FF (core purple)
- **Logo:** Greater Than symbol (>)
- **Typography:** Graphik (primary), GT Sectra Fine (secondary)
- **Voice:** Bold, Optimistic, Agile, Human, Ingenious

#### Usage
- Default to **core purple** #A100FF for most applications
- Purple spectrum provides flexibility for light/dark modes
- Use Greater Than symbol for established brand recognition
- Use full Accenture logo for first brand interaction

---

## File Structure

```
branding/
├── README.md                           # This file
├── accenture-brand-guide.md           # Complete Accenture guidelines
├── brand-config.json                  # Project branding configuration
├── brand-tokens.json                  # Design system tokens
├── writing-style-guide.md             # Content and voice guidelines
│
├── assets/                            # Brand assets
│   ├── logos/                        # Logo files
│   │   ├── accenture-logo.png       # Full Accenture logo
│   │   ├── greater-than-purple.svg  # Greater Than symbol (purple)
│   │   ├── greater-than-black.svg   # Greater Than symbol (black)
│   │   ├── greater-than-white.svg   # Greater Than symbol (white)
│   │   └── LOGO-GUIDE.md           # Logo usage instructions
│   │
│   ├── brand-guideline-images/     # Official guideline reference images
│   │   ├── brand-voice.png         # Brand voice attributes
│   │   ├── typography.png          # Typography standards
│   │   ├── color-palette.png       # Color specifications
│   │   ├── logo-usage.png          # Logo placement rules
│   │   └── ...                     # Additional reference images
│   │
│   └── examples/                   # Brand application examples
│       ├── accenture-prototype/   # Accenture branding example
│       └── client-prototype/      # Client branding example
│
└── ui/                             # Component library
    ├── index.ts                   # Component exports
    ├── header.tsx                 # Brand-compliant header
    ├── premium-card.tsx           # Card components
    ├── chart-frame.tsx            # Chart wrappers
    ├── agent-badge.tsx            # AI agent indicators
    ├── section.tsx                # Page section layouts
    └── data-table-frame.tsx       # Data table wrappers
```

---

## Usage Instructions

### For Accenture Prototypes

1. **Use default configuration** - No changes needed
2. **Import components:**
   ```tsx
   import { BrandHeader, PremiumCard } from './get-started/branding/ui';
   ```
3. **Apply Accenture purple:**
   ```tsx
   className="bg-[#A100FF] text-white"
   ```
4. **Follow brand voice** - Bold, optimistic, agile, human, ingenious

### For Client Prototypes

1. **Update brand configuration:**
   - Edit `brand-config.json`
   - Set `mode: "client"`
   - Add client name, colors, logo path

2. **Update brand tokens:**
   - Edit `brand-tokens.json`
   - Replace primary color with client color
   - Update semantic colors if needed

3. **Add client logo:**
   - Save to `/public/client-logo.png`
   - Update logo path in `brand-config.json`

4. **Test branding:**
   - Verify all components show client branding
   - Check color contrast meets WCAG AA
   - Review with client brand guidelines

### Co-Branding (Accenture + Client)

For projects requiring both Accenture and client logos:

1. **Review co-branding rules** in `assets/logos/LOGO-GUIDE.md`
2. **Position logos side-by-side** with vertical separator
3. **Maintain equal sizing** (Accenture first, then separator, then client)
4. **Use spacing guide** from logo guide document
5. **Get pre-approval** from brandequitymanagement@accenture.com if required

---

## Brand Tokens

### Colors

#### Accenture Purple Spectrum
```
Darkest Purple:  #460073
Dark Purple:     #7500C0
Core Purple:     #A100FF  ← PRIMARY
Light Purple:    #C2A3FF
Lightest Purple: #E6DCFF
```

#### Neutral Colors
```
Black:       #000000
Dark Gray:   #818180
Medium Gray: #CFCFCF
Light Gray:  #F1F1EF
White:       #FFFFFF
```

#### Secondary Colors (Use Sparingly <5%)
```
Pink:  #FF50A0
Blue:  #224BFF
Aqua:  #05F2DB
```

### Typography

#### Font Families
```
Primary:   Graphik (Semibold for headlines, Regular for body)
Secondary: GT Sectra Fine (for call-outs and quotes)
Monospace: Courier (when monospaced font required)
```

#### Fallbacks for Web
```
font-family: 'Graphik', 'Arial', sans-serif;
```

Note: Use Graphik Medium (not bold) for font sizes below 12pt on dark backgrounds

### Type Hierarchy

#### Golden Ratio Scale
```
Headline 1:  80pt (Graphik Semibold)
Headline 2:  32pt (Graphik Regular)
Headline 3:  20pt (Graphik Semibold)
Body Copy:   12pt (Graphik Regular)
Footnotes:   8pt (Graphik Regular)
```

#### Perfect Fifth Scale  
```
Headline 1:  90pt (Graphik Semibold)
Headline 2:  40pt (Graphik Regular)
Headline 3:  27pt (Graphik Semibold)
Body Copy:   12pt (Graphik Regular)
Footnotes:   8pt (Graphik Regular)
```

---

## Design Principles

### Color Usage Guidelines

#### Light Mode (Preferred for readability)
- **Purple spectrum (darker end):** 30-40%
- **Neutrals (black, grays, white):** 60-70%
- **Secondary palette:** <5%

#### Dark Mode (Digital assets primarily)
- **Purple spectrum (lighter end):** 30-40%
- **Neutrals (black, white):** 60-70%
- **Secondary palette:** <5%

### Contrast Standards
- Follow WCAG 2.2 guidelines for accessibility
- See contrast guide in `accenture-brand-guide.md` for approved combinations
- Test with actual content in target environment

### Brand Aesthetic
- **Simple and subtractive design** - Project confidence, communicate clearly
- **Use grids and margins consistently** - Professional structure
- **Square not circles** - Geometric, modern feel
- **Light and dark modes** - Content adapts to different color schemes
- **Purple with purpose** - Highlight key information, use as accent

---

## Component Library

### Available Components

All components in `ui/` folder are brand-compliant and ready to use:

#### Layout Components
- `BrandHeader` - Header with logo and branding
- `Section` - Page section with consistent spacing
- `TopNav` - Horizontal navigation bar

#### Content Components
- `PremiumCard` - Enhanced cards with brand styling
- `ChartFrame` - Chart wrapper with consistent styling
- `DataTableFrame` - Data table wrapper with pagination
- `AgentBadge` - AI agent indicators

#### Using Components
```tsx
import {
  BrandHeader,
  Section,
  PremiumCard,
  ChartFrame,
  AgentBadge
} from './get-started/branding/ui';

// Import brand constants
import { BRAND_COLORS, CHART_COLORS } from './get-started/branding/ui';
```

---

## Brand Voice & Writing Style

### Accenture Brand Voice Attributes

#### Bold
- **What we do:** Celebrate progress, change, value created, success shared
- **How we write:** Back statements with solid proof points, use active voice

#### Optimistic
- **What we do:** Look forward with confidence and resolve
- **How we write:** Flip negative constructs to affirmative, don't attack competitors

#### Agile
- **What we do:** Adapt to audiences, make complex simple
- **How we write:** Be succinct, fast communication with graphics and visuals

#### Human
- **What we do:** Celebrate ideas, creativity, knowledge, expertise, diversity of thought and voices
- **How we write:** Write how people speak, avoid industry jargon, celebrate ingenuity, write to include

#### Ingenious
- **What we do:** Look for the new, bring it to light, refresh the familiar
- **How we write:** Measure performance, predict audience needs, always have human in loop with gen AI

### Weekend Language

Use "weekend language" to make technology accessible:
- **Avoid jargon** - Break down specialized terms
- **Be conversational** - Write how people speak
- **Make it relatable** - Connect abstract concepts to real-world applications

Example transformation:
- **From:** "We operate at the forefront of driving transformative innovation..."
- **To:** "We work at the heart of change."

---

## Photography Guidelines

### Style Principles
- **Neutral palette, natural tones** - Complement purples, make them stand out
- **Real scenes, real people** - Authentic moments, avoid posed/staged
- **Clear, crisp, high contrast** - Sharp focus, emphasize main subject
- **Sense of motion** - Use motion blur, panning, fast shutter speeds intentionally
- **Technology in use** - Show it being used in relatable ways, not for decoration

### Don'ts
- No colorizing photography with purple overlay
- No stock photo feel
- No technology for the sake of showing technology

---

## Icon Usage

### Guidelines
- Use icons from official Accenture library only
- Icons must use brand colors and contrast from background
- No gradients, masks, or textures in icons
- Icons are visual shorthand - use to enhance understood stories
- Universal understanding - ensure anyone can connect concept to icon
- Add clarity - align with messaging, don't muddy the message

### Icon Color
Accenture brand colors only:
- Purple variations for brand consistency
- Black, gray, or white for neutral contexts
- No multi-colored icons

---

## Resources

### Official Documents
- `accenture-brand-guide.md` - Complete brand guidelines
- `writing-style-guide.md` - Voice, tone, and content standards
- `assets/brand-guideline-images/` - Visual reference images

### Templates and Examples
- `../templates/` - Code templates with branding
- `assets/examples/` - Example implementations
- `../project-examples/` - Real project references

### Support
- Brand inquiries: brandequitymanagement@accenture.com
- Co-branding approvals: brandequitymanagement@accenture.com

---

## Checklist: Branding Review

Before launching any prototype, verify:

### Visual Identity
- [ ] Correct logo displayed (Accenture or client)
- [ ] Primary brand color used consistently
- [ ] Typography follows brand standards
- [ ] Color contrast meets WCAG AA minimum

### Brand Voice
- [ ] Content embodies brand attributes (bold, optimistic, agile, human, ingenious)
- [ ] "Weekend language" used (clear, conversational, jargon-free)
- [ ] Professional tone throughout (no emojis in production)

### Component Usage
- [ ] Using brand-compliant components from library
- [ ] Consistent spacing and layout
- [ ] Icons from official library only
- [ ] Photography follows style guidelines (if applicable)

### Client Projects
- [ ] Client logo and colors correctly applied
- [ ] Co-branding rules followed (if applicable)
- [ ] Client brand guidelines respected
- [ ] Pre-approval obtained if required

---

**Everything you need to create consistent, professional, brand-compliant prototypes.**

