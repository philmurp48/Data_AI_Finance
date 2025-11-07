# Logo Usage Guide

**Official guidelines for Accenture logo and Greater Than symbol usage**

---

## Logo Options

### 1. Full Accenture Logo
**File:** `accenture-logo.png` or `accenture-logo.svg`

**When to use:**
- First interaction with a brand
- Presentations (cover slides)
- Marketing materials
- Official communications
- Client-facing documents

**When NOT to use:**
- Internal pages after brand is established
- Space-constrained areas
- Repeated use throughout same document

---

### 2. Greater Than Symbol (>)
**Files:** 
- `greater-than-purple.svg` (#A100FF)
- `greater-than-black.svg` (#000000)
- `greater-than-white.svg` (#FFFFFF)
- `greater-than-light-purple.svg` (#E6DCFF)

**When to use:**
- After brand is established (subsequent pages)
- Navigation headers
- Repeated branding elements
- Space-constrained areas
- Digital interfaces

**Default color:** Purple (#A100FF)

---

## Color Variations

### Purple (#A100FF) - Primary
Use for:
- Most applications
- Digital interfaces
- On white or light backgrounds
- Default choice

### Black (#000000)
Use for:
- Print materials where color not available
- High contrast needed
- On white or very light backgrounds

### White (#FFFFFF)
Use for:
- Dark backgrounds
- Photography backgrounds
- When purple doesn't provide enough contrast

### Light Purple (#E6DCFF)
Use for:
- Dark purple backgrounds (#460073, #7500C0)
- When core purple is too intense
- Subtle branding moments

---

## Background Guidelines

### Solid Color Backgrounds

#### Approved Combinations
- Purple symbol on white
- Purple symbol on light gray (#F1F1EF)
- White symbol on darkest purple (#460073)
- White symbol on black
- Black symbol on white
- White symbol on dark purple (#7500C0)

#### NOT Approved
- Light purple symbol on light backgrounds (insufficient contrast)
- Dark symbol on dark backgrounds
- Purple symbol on photographs (see below)
- Secondary colors as backgrounds (pink, blue, aqua)

### Photography Backgrounds

**Do:**
- Choose photos with neutral, muted tones
- Ensure symbol has clear space around it
- Use solid color overlay if needed for contrast
- Select darker photo areas for light symbols, lighter areas for dark symbols

**Don't:**
- Place symbol over busy/detailed photo areas
- Use gradients or textures inside the symbol
- Colorize the photo with purple overlay
- Place symbol where it blends into background

---

## Size & Spacing

### Minimum Size
**Digital:** 24px height (width scales proportionally)  
**Print:** 0.25 inches / 6mm height

Below these sizes, the symbol becomes difficult to recognize.

### Clear Space
**Minimum clear space:** Equal to the height of the symbol on all sides

Example: If symbol is 48px tall, maintain at least 48px of clear space around it.

### Proportions
The Greater Than symbol should always maintain its original aspect ratio:
- Do not stretch or compress
- Do not skew or distort
- Do not crop or alter the artwork

---

## Co-Branding with Client Logos

### Layout Rules

#### Side-by-Side (Horizontal)
```
[accenture] | [client]
```

**Spacing:**
- 3x left margin between logos
- 6x distance between logos (measured from edge of taller logo)
- Mandatory vertical line separator between logos
- 1x bottom margin
- 3x left margin on right side

#### Symbol-Only Co-Branding
For reinforcement after full logos introduced:

```
>  ★  >  ★
```

**Spacing:**
- 1x top margin from highest logo
- Mandatory vertical line between each logo
- 1x left margin
- 1x bottom margin from highest logo
- 1x right margin

### Size Requirements
- **Equal sizing:** Both logos must be equal in size
- **Accenture first:** Accenture logo always comes first (left position)
- **Separator required:** Vertical centered line between all logos
- **Consistent height:** Use the form height of the highest logo to determine spacing

### Layout for Multiple Logos
For three or more logos, use centered separator line between every logo.

### Pre-Approval Required
**All co-branding must be pre-approved** through brandequitymanagement@accenture.com

**Don'ts:**
- Don't use client logos without written permission
- Don't alter client logos
- Don't place logos without proper spacing
- Don't use unequal sizes

---

## File Formats

### SVG (Scalable Vector Graphics) - Preferred
**When to use:** Web, digital interfaces, any scalable usage  
**Advantages:** 
- Infinite scaling without quality loss
- Small file size
- CSS styleable
- Accessible

**Implementation:**
```tsx
<img src="/logos/greater-than-purple.svg" alt="Accenture" className="h-12 w-auto" />
```

### PNG (Portable Network Graphics)
**When to use:** Email signatures, presentations, raster-based designs  
**Requirements:**
- Transparent background
- At least 2x size for retina displays (e.g., 96px if displaying at 48px)
- RGB color mode

**Implementation:**
```tsx
<Image 
  src="/logos/accenture-logo.png"
  alt="Accenture"
  width={200}
  height={50}
  priority
/>
```

### JPG/JPEG - Not Recommended
- Cannot have transparent background
- Lossy compression affects quality
- Use only if absolutely necessary

---

## Implementation Examples

### React/Next.js Header
```tsx
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-[#002244] h-16 px-6">
      <div className="flex items-center h-full">
        <Link href="/" className="flex items-center space-x-3">
          {/* Greater Than Symbol */}
          <div className="h-12 w-12 flex items-center justify-center">
            <Image
              src="/logos/greater-than-purple.svg"
              alt="Accenture"
              width={48}
              height={48}
              priority
            />
          </div>
          {/* Application Name */}
          <div>
            <h1 className="text-white font-bold text-lg">Application Name</h1>
            <p className="text-xs text-white opacity-80">Subtitle</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
```

### Presentation Cover (Full Logo)
```tsx
<div className="min-h-screen bg-white flex items-center justify-center">
  <div className="text-center">
    <Image
      src="/logos/accenture-logo.png"
      alt="Accenture"
      width={400}
      height={100}
      priority
      className="mx-auto mb-8"
    />
    <h1 className="text-5xl font-bold text-[#002244] mb-4">
      Presentation Title
    </h1>
    <p className="text-xl text-gray-600">
      Subtitle or Date
    </p>
  </div>
</div>
```

### Co-Branding Header
```tsx
<header className="bg-white border-b border-gray-200 py-4 px-6">
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-8">
      {/* Accenture Logo */}
      <Image
        src="/logos/accenture-logo.png"
        alt="Accenture"
        width={120}
        height={30}
      />
      
      {/* Separator */}
      <div className="h-8 w-px bg-gray-300" />
      
      {/* Client Logo */}
      <Image
        src="/logos/client-logo.png"
        alt="Client Name"
        width={120}
        height={30}
      />
    </div>
  </div>
</header>
```

---

## Accessibility

### Alt Text Guidelines

**Full Logo:**
```html
alt="Accenture"
```

**Greater Than Symbol in Navigation:**
```html
alt="Accenture" 
<!-- or -->
alt="" role="img" aria-label="Accenture"
```

**Decorative Usage:**
```html
alt="" role="presentation"
```

### ARIA Labels
When logo is interactive (link):
```tsx
<Link href="/" aria-label="Accenture Home">
  <Image src="/logos/greater-than-purple.svg" alt="" />
</Link>
```

---

## Common Mistakes

### ❌ Don't Do This
- Rotate or flip the symbol
- Add effects (drop shadows, glows, 3D)
- Change the colors to non-approved colors
- Place on busy backgrounds without contrast
- Use outdated logo versions
- Stretch or compress disproportionately
- Add text inside the symbol
- Use low-resolution images

### ✅ Do This
- Use provided asset files as-is
- Maintain aspect ratio when scaling
- Ensure sufficient contrast with background
- Use appropriate color variation for background
- Follow spacing guidelines
- Get approval for co-branding
- Use SVG format when possible
- Test readability at actual display size

---

## File Checklist

Ensure you have these files in the `logos/` folder:

- [ ] `accenture-logo.png` (full logo, transparent)
- [ ] `accenture-logo.svg` (full logo, vector)
- [ ] `greater-than-purple.svg` (#A100FF)
- [ ] `greater-than-black.svg` (#000000)
- [ ] `greater-than-white.svg` (#FFFFFF)
- [ ] `greater-than-light-purple.svg` (#E6DCFF)

Optional but recommended:
- [ ] `accenture-logo@2x.png` (retina display)
- [ ] `greater-than-purple.png` (raster fallback)
- [ ] `greater-than-purple@2x.png` (retina raster)

---

## Support

### Questions or Requests
- Brand guidelines: brandequitymanagement@accenture.com
- Co-branding approval: brandequitymanagement@accenture.com
- Logo files request: Brand team or your project lead

---

**Proper logo usage reinforces brand recognition and maintains professional standards across all touchpoints.**

