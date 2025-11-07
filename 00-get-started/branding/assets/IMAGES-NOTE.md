# Branding Images - Setup Instructions

**Important:** The official Accenture branding guideline images you shared need to be manually saved to this folder.

---

## Required Images

### From Accenture Branding Guidelines (July 2025)

Save these images to `get-started/branding/assets/brand-guideline-images/`:

1. **brand-voice.png** - Brand voice attributes page (Bold, Optimistic, Agile, Human, Ingenious)
2. **weekend-language.png** - Weekend language importance and examples
3. **weekend-language-examples.png** - From/To transformation examples
4. **audience-needs.png** - Speaking directly to audience needs examples
5. **content-tone.png** - Tone guidelines and examples
6. **logo-greater-than.png** - Greater Than symbol specifications and usage
7. **logo-backgrounds.png** - Logo on different backgrounds
8. **logo-usage-rules.png** - When to use Accenture logo vs Greater Than symbol
9. **co-branding.png** - Co-branding spacing and layout rules
10. **typography-primary.png** - Graphik typeface details
11. **typography-secondary.png** - GT Sectra Fine typeface details
12. **typography-hierarchy-golden.png** - Golden ratio type scale
13. **typography-hierarchy-fifth.png** - Perfect fifth type scale
14. **color-purple-spectrum.png** - Purple color palette with hex codes
15. **color-neutral-secondary.png** - Neutral and secondary colors
16. **color-light-dark-mode.png** - Light mode vs dark mode usage
17. **color-usage-percentages.png** - Color usage guidelines (30-40% purple, 60-70% neutrals)
18. **color-contrast-guide.png** - Contrast standards and approved combinations
19. **color-examples.png** - Purple spectrum use cases in designs
20. **color-donts.png** - What not to do with colors
21. **gradients.png** - Gradient usage examples
22. **brand-aesthetic.png** - Overall brand aesthetic principles
23. **photography.png** - Photography style guidelines
24. **icons.png** - Icon usage and style rules

### Logos

Save logo files to `get-started/branding/assets/logos/`:

1. **accenture-logo.png** - Full Accenture logo with text
2. **greater-than-purple.svg** - Greater Than symbol in purple (#A100FF)
3. **greater-than-black.svg** - Greater Than symbol in black
4. **greater-than-white.svg** - Greater Than symbol in white
5. **greater-than-light-purple.svg** - Greater Than in light purple (#E6DCFF)

Note: These should be high-quality vector files (SVG preferred) or high-resolution PNGs (at least 2x size for retina displays).

---

## How to Save Images

### Option 1: From PDF/PowerPoint
If you have the official Accenture branding guidelines in PDF or PowerPoint format:

1. Open the file
2. Export each page/slide as a PNG image
3. Save with the filenames listed above
4. Place in `get-started/branding/assets/brand-guideline-images/`

### Option 2: From Screenshots
If you only have screenshots:

1. Take high-quality screenshots of each relevant page
2. Crop to remove unnecessary borders/margins
3. Save as PNG format
4. Name according to list above
5. Place in appropriate folder

### Option 3: Request from Brand Team
Contact brandequitymanagement@accenture.com to request:
- Official logo files (SVG format)
- Brand guideline PDF
- Photography guidelines
- Icon library

---

## Image Quality Standards

### For Reference Images (brand guideline pages)
- **Format:** PNG
- **Resolution:** At least 1920x1080 pixels
- **DPI:** 72 for screen, 300 for print
- **Color Mode:** RGB

### For Logo Files
- **Format:** SVG (vector) preferred, or PNG with transparent background
- **Resolution:** PNG should be at least 1000px width for the larger dimension
- **Formats needed:** SVG, PNG (2x retina), PNG (1x standard)
- **Background:** Transparent

### For Photography
- **Format:** JPG or PNG
- **Resolution:** At least 1920x1080 for hero images
- **Optimization:** Compress for web (use tools like TinyPNG)
- **Alt text:** Always include descriptive alt text

---

## File Structure

After saving images, your folder structure should look like:

```
get-started/branding/assets/
├── IMAGES-NOTE.md (this file)
│
├── logos/
│   ├── accenture-logo.png
│   ├── accenture-logo.svg
│   ├── greater-than-purple.svg
│   ├── greater-than-black.svg
│   ├── greater-than-white.svg
│   ├── greater-than-light-purple.svg
│   └── LOGO-GUIDE.md
│
├── brand-guideline-images/
│   ├── brand-voice.png
│   ├── weekend-language.png
│   ├── logo-greater-than.png
│   ├── typography-primary.png
│   ├── color-purple-spectrum.png
│   ├── photography.png
│   └── ... (all reference images)
│
└── examples/
    ├── accenture-prototype-screenshots/
    └── client-prototype-examples/
```

---

## Using Images in Documentation

### In Markdown Files

```markdown
![Brand Voice Attributes](./assets/brand-guideline-images/brand-voice.png)

Reference the official brand voice attributes from Accenture guidelines.
```

### In React Components

```tsx
import Image from 'next/image';

<Image 
  src="/get-started/branding/assets/logos/accenture-logo.png"
  alt="Accenture Logo"
  width={200}
  height={50}
  priority
/>
```

### In CSS/Tailwind

```tsx
<div 
  className="bg-cover bg-center h-64"
  style={{ backgroundImage: `url('/get-started/branding/assets/brand-guideline-images/brand-aesthetic.png')` }}
>
  {/* Content */}
</div>
```

---

## Copyright & Usage

### Accenture Assets
- All Accenture logos and brand assets are proprietary
- Use only for Accenture projects and demos
- Do not share publicly or use for non-Accenture purposes
- Follow brand guidelines for all usage

### Client Assets
- Obtain written permission before using client logos
- Store securely and do not share
- Follow client brand guidelines
- Remove from public repositories

---

## Next Steps

1. **Collect images** from your source files or screenshots
2. **Save to appropriate folders** using the filenames above
3. **Verify quality** - check resolution and clarity
4. **Update references** if you use different filenames
5. **Test in application** - ensure images load correctly

---

## Troubleshooting

### Images not showing in Next.js
- Ensure images are in `/public/` folder or use absolute imports
- Check file paths are correct
- Verify Next.js Image component configuration
- Clear `.next` cache and restart dev server

### Images too large (slow loading)
- Use image optimization tools (TinyPNG, ImageOptim)
- Implement Next.js Image component (automatic optimization)
- Use appropriate format (SVG for logos, WebP for photos)
- Consider lazy loading for below-the-fold images

### Brand colors don't match
- Verify hex codes in `brand-tokens.json`
- Check color profiles (use RGB, not CMYK)
- Test on multiple devices and screens
- Compare side-by-side with official guidelines

---

**Once images are saved, this folder will serve as the complete visual reference for all branding needs.**

