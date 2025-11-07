# How to Update Your Projects to Official Branding

**Step-by-step guide to align Finance360 and Controller AI Workbench with official Accenture brand guidelines**

---

## Understanding the Situation

### Current State
- ✅ Finance360 and R2R Workbench have **great UI patterns**
- ⚠️ But they may use **unofficial colors, fonts, or styling**
- 🎯 Need to **update them** to official Accenture brand compliance

### Official Standards (Source of Truth)
- Purple: **#A100FF** (not #8b5cf6 or other purples)
- Font: **Graphik** Semibold/Regular (not Inter or others)
- Voice: **Bold, Optimistic, Agile, Human, Ingenious**
- Language: **"Weekend language"** - clear, conversational
- Usage: **30-40% purple, 60-70% neutrals, <5% secondary**

### This Folder's Purpose
**Use `00-get-started` to bring your projects into official compliance**

---

## Step-by-Step: Updating Finance360

### Phase 1: Copy Get Started Folder (5 min)

```bash
cd "Accenture - AI Powered Management Reporting"
cp -r "../00-get-started" ./
```

### Phase 2: Audit Current Branding (15 min)

**Find what needs updating:**

```bash
# Check current purple color
grep -r "#8b5cf6" . | grep -v node_modules
grep -r "bg-purple-500" . | grep -v node_modules

# Check current fonts
grep -r "font-sans" . | grep -v node_modules
grep -r "Inter" . | grep -v node_modules
```

**Make notes:**
- What purple is currently used? _________
- What font is currently used? _________
- What needs to change? _________

### Phase 3: Update Tailwind Config (30 min)

**File:** `tailwind.config.ts` or `tailwind.config.js`

**Before:**
```js
colors: {
  primary: '#8b5cf6',  // Old purple
  purple: colors.purple,  // Tailwind default
}
```

**After:**
```js
colors: {
  primary: {
    DEFAULT: '#A100FF',  // Official Accenture purple
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#A100FF',     // Core purple
    600: '#7500C0',     // Dark purple
    700: '#460073',     // Darkest purple
    800: '#3d005f',
    900: '#2d0047',
  },
  purple: {
    // Map to same official values
    DEFAULT: '#A100FF',
    500: '#A100FF',
    600: '#7500C0',
    // ... etc
  }
}
```

**Copy from:** `00-get-started/branding/brand-tokens.json`

### Phase 4: Update Global Styles (30 min)

**File:** `app/globals.css` or equivalent

**Add Graphik font:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Or use local Graphik if you have it */
@font-face {
  font-family: 'Graphik';
  src: url('/fonts/Graphik-Semibold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'Graphik';
  src: url('/fonts/Graphik-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}
```

**Update Tailwind font:**
```js
// tailwind.config.js
fontFamily: {
  sans: ['Graphik', 'Inter', 'system-ui', 'sans-serif'],
  serif: ['GT Sectra Fine', 'Georgia', 'serif'],
}
```

### Phase 5: Update Component Colors (2-4 hours)

**Find and replace systematically:**

```bash
# In VS Code or Cursor:
# Find: bg-purple-500
# Replace: bg-primary-500

# Find: text-purple-600
# Replace: text-primary-600

# Find: border-purple-500
# Replace: border-primary-500

# Find: #8b5cf6
# Replace: #A100FF

# Find: #7c3aed
# Replace: #7500C0
```

**Or use Cursor command:**
- Open Command Palette
- Type: `apply-brand-colors`
- Let Cursor help update colors

### Phase 6: Update Navigation (1-2 hours)

**Sidebar background:**
```tsx
// Before (example)
className="bg-gray-900"

// After (to match Finance360 pattern + official colors)
className="bg-[#1a1f2e]"  // Dark blue-gray

// Active states
// Before
className="bg-purple-600"

// After
className="bg-primary-500"  // Maps to #A100FF
```

### Phase 7: Update Buttons (1 hour)

**Primary buttons:**
```tsx
// Before
className="bg-blue-500 hover:bg-blue-600"
className="bg-purple-500 hover:bg-purple-600"

// After (from official branding)
className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"

// Or simpler
className="bg-primary-500 hover:bg-primary-600"
```

### Phase 8: Update AI Agent Elements (1-2 hours)

**All AI/agent elements:**
```tsx
// Ensure all use official purple
className="bg-primary-500 text-white"  // #A100FF
className="text-primary-600"            // #A100FF
className="border-primary-500"          // #A100FF
```

**Agent category colors** (from official secondary palette):
- Orchestrator: #A100FF (purple)
- Reporting: #224BFF (blue - official secondary)
- Planning: #10B981 (green - keep as semantic success)
- Analytics: #F59E0B (amber - keep as semantic warning)

### Phase 9: Verify with Checklist (2-3 hours)

**For each page, use `FRONTEND-CONSISTENCY-CHECKLIST.md`:**

```bash
cat 00-get-started/FRONTEND-CONSISTENCY-CHECKLIST.md
```

**Go through every section:**
- [ ] Branding (colors, logo, typography) = Official #A100FF
- [ ] Layout & Spacing = 4px grid
- [ ] Components = Using brand tokens
- [ ] Typography = Graphik font
- [ ] Professional polish = No emojis

---

## Step-by-Step: Updating R2R Workbench

**Same process as Finance360:**

1. Copy 00-get-started folder ✓
2. Audit current branding
3. Update Tailwind config
4. Update global styles
5. Update component colors
6. Update navigation
7. Update buttons
8. Update AI elements
9. Verify with checklist

---

## What Stays, What Changes

### ✅ Keep These (Good Patterns):

**Structure & Layout:**
- Agent gallery grid layout
- Workflow step visualization
- Sidebar navigation structure
- KPI card layouts
- Data table structures
- Modal/panel designs

**Functionality:**
- How features work
- User interactions
- Data flows
- Component behaviors

### 🔄 Update These (To Official Branding):

**Visual Branding:**
- Colors → Official palette (#A100FF, etc.)
- Typography → Graphik
- Spacing → 4px grid
- Shadows → Official shadow scale
- Border radius → Official scale

**Content:**
- Voice → Bold, Optimistic, Agile, Human, Ingenious
- Language → "Weekend language"
- Remove → Any emojis
- Tone → Professional but conversational

---

## 📋 Project Update Checklist

### Before You Start
- [ ] Copied 00-get-started folder into project
- [ ] Read EXISTING-PROJECT-MIGRATION.md
- [ ] Noted current colors/fonts used
- [ ] Created backup branch

### Branding Updates
- [ ] Updated Tailwind config with brand-tokens.json
- [ ] Updated to #A100FF purple (replaced old purple)
- [ ] Updated to Graphik typography
- [ ] Applied 4px grid spacing system
- [ ] Removed any emojis
- [ ] Updated to weekend language

### Component Updates
- [ ] Buttons use official purple (#A100FF)
- [ ] Status badges use standard color system
- [ ] Navigation uses official colors
- [ ] AI elements use #A100FF
- [ ] KPI cards updated
- [ ] Agent gallery updated
- [ ] Workflows updated

### Verification
- [ ] Every page checked with FRONTEND-CONSISTENCY-CHECKLIST
- [ ] Colors from official palette only
- [ ] Typography consistent (Graphik)
- [ ] Spacing systematic (4px grid)
- [ ] Professional polish
- [ ] Matches official brand guidelines

---

## ⚠️ Key Insight

### The Projects Are "Templates" with Wrong Branding

Think of it this way:

**Finance360 & R2R Workbench:**
- ✅ Great UX patterns
- ✅ Good functionality
- ✅ Professional structure
- ⚠️ May have non-official branding

**00-get-started folder:**
- ✅ Official Accenture branding
- ✅ Documented UI patterns from your projects
- ✅ Everything aligned to official guidelines
- ✅ Ready to apply to projects

**Result:**
- Copy folder into projects
- Keep good patterns
- Update branding to official
- Achieve consistent, compliant design

---

## ✨ Final Confirmation

### Yes, You Are 100% Correct:

1. ✅ **Official brand guidelines** = Source of truth for branding
2. ✅ **Project screenshots** = Examples of patterns, not branding reference
3. ✅ **00-get-started folder** = Aligned to official guidelines
4. ✅ **Copy into projects** = To update them to compliance
5. ✅ **Projects will need updates** = Expected and documented
6. ✅ **Result** = Consistent, professionally branded projects

---

## 🚀 You're Ready!

**The 00-get-started folder:**
- Is aligned to official Accenture brand guidelines ✅
- Documents UI patterns from your projects (structure) ✅
- Provides migration guide to update projects ✅
- Includes consistency checklist ✅
- Ready to copy and use ✅

**Start updating your projects to official brand compliance today!**

---

**Questions? See:**
- `EXISTING-PROJECT-MIGRATION.md` - How to update
- `FRONTEND-CONSISTENCY-CHECKLIST.md` - What to check
- `COMPLETE-PATTERN-INDEX.md` - What patterns are available

