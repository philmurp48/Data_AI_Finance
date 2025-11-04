# Controller AI Workbench Brand System
**Complete Brand Package for Prototype Development**

**Version:** 1.0  
**Extracted From:** Controller AI Workbench R2R Platform  
**Last Updated:** October 28, 2025

---

## 🚀 **Quick Start**

**For New Prototypes:**
1. Copy this entire `branding/` folder to your new project root
2. Install dependencies (see `cursor-commands.json` for full setup)
3. Import components: `import { PremiumCard, BrandHeader } from './branding/ui'`
4. Follow guidelines in `cursor-rules.md` and `writing-style.md`

---

## 📁 **What's In This Folder**

### **📊 Complete Documentation**
- **`brand-extraction-report.md`** - Complete 12,000+ word analysis of all patterns
- **`writing-style.md`** - Voice & tone guidelines for content creation
- **`README.md`** - This file (setup instructions)

### **🎨 Design System**
- **`brand-tokens.json`** - Colors, typography, spacing, shadows, animations
  - Accenture Purple (#8b5cf6) primary color scheme
  - Complete semantic color system
  - Typography tokens (Inter, JetBrains Mono)
  - Component styling specifications

### **🧩 Component Library**
**`ui/` directory** - 6 reusable brand-compliant components:
- **`header.tsx`** - Brand header with Accenture logo
- **`section.tsx`** - Page section layout component  
- **`premium-card.tsx`** - Premium cards with KPI variants
- **`chart-frame.tsx`** - Chart wrapper with consistent styling
- **`agent-badge.tsx`** - AI agent indicators and workflows
- **`data-table-frame.tsx`** - Data table wrapper with pagination
- **`index.ts`** - Component exports and brand constants

### **⚙️ Development Tools**
- **`cursor-rules.md`** - Brand enforcement rules for development
- **`cursor-commands.json`** - 8 scaffolding commands for rapid development

---

## 🎯 **Usage Instructions**

### **1. Component Imports**
```tsx
// Import all brand components
import { 
  PremiumCard, 
  BrandHeader, 
  AgentBadge, 
  ChartFrame,
  DataTableFrame,
  Section
} from './branding/ui';

// Import brand constants
import { BRAND_COLORS, CHART_COLORS } from './branding/ui';
```

### **2. Design Tokens Usage**
```tsx
// Import design tokens
import brandTokens from './branding/brand-tokens.json';

// Use in components
const primaryColor = brandTokens.colors.primary[500]; // #8b5cf6
const successColor = brandTokens.colors.semantic.success.DEFAULT; // #10b981
```

### **3. Cursor Integration**
1. Copy `cursor-commands.json` to `.cursor/commands.json` in new project
2. Copy `cursor-rules.md` to `.cursor/rules.md` in new project
3. Use commands like `scaffold-brand-prototype`, `create-brand-page`

### **4. Required Dependencies**
```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0", 
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.1",
    "@radix-ui/react-*": "latest",
    "lucide-react": "latest",
    "recharts": "^2.12.0",
    "framer-motion": "^11.0.5",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1"
  }
}
```

---

## 🎨 **Brand Guidelines Summary**

### **Colors**
- **Primary:** #8b5cf6 (Accenture Purple)
- **Success:** #10b981 (Green)
- **Warning:** #f59e0b (Amber) 
- **Danger:** #ef4444 (Red)
- **AI/Agent:** #8b5cf6 (Purple)

### **Typography**
- **UI Text:** Inter font family
- **Financial Numbers:** JetBrains Mono (tabular-nums)
- **Gradient Text:** Purple gradients for premium branding

### **Voice & Tone**
- **Professional & Trustworthy** - Precise financial terminology
- **Action-Oriented** - Clear CTAs and task focus
- **AI-Transparent** - Show AI processes with confidence
- **Information-Dense** - Organized data presentation

### **Component Patterns**
- Use `PremiumCard` instead of base Card
- Wrap charts in `ChartFrame` 
- Use `BrandHeader` for consistent headers
- Include `AgentBadge` for AI-generated content
- Apply financial number formatting with tabular-nums

---

## 📋 **Development Checklist**

Before using this brand system:
- [ ] Read `brand-extraction-report.md` for complete context
- [ ] Review `writing-style.md` for content guidelines  
- [ ] Check `cursor-rules.md` for development standards
- [ ] Install required dependencies
- [ ] Copy Cursor files to appropriate locations
- [ ] Import brand components and tokens

---

## 🚀 **Available Scaffold Commands**

1. **`scaffold-brand-prototype`** - Complete prototype setup
2. **`create-brand-page`** - Brand-compliant page template
3. **`create-data-table`** - Financial data table components
4. **`create-kpi-card`** - KPI dashboard cards
5. **`create-chart-component`** - Chart components with branding
6. **`add-ai-agent-integration`** - AI transparency features
7. **`apply-brand-colors`** - Update existing components
8. **`create-financial-dashboard`** - Complete dashboard layouts

---

## ✅ **What This Brand System Provides**

- **🎨 Complete Visual Design System** - Colors, typography, spacing
- **🧩 Reusable Component Library** - 6 brand-compliant components  
- **📝 Content Guidelines** - Voice, tone, and messaging standards
- **💻 Development Standards** - Code patterns and architecture
- **⚙️ Automation Tools** - Cursor commands for rapid development
- **🤖 AI Integration Patterns** - Consistent AI transparency and branding

**Everything you need to create consistent, professional Controller AI Workbench-style prototypes!**

---

*This brand system was extracted from the complete Controller AI Workbench prototype to ensure consistency and professional quality across all future development.*
