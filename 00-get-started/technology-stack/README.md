# Technology Stack

**Recommended technologies and implementation guides**

---

## Overview

This folder contains comprehensive guidance on technology choices, setup procedures, and deployment strategies for professional Cursor AI projects.

---

## Contents

- `tech-stack.md` - Recommended technology stack and rationale
- `local-development.md` - Local development environment setup
- `github-workflow.md` - Git workflow and collaboration standards
- `deployment-vercel.md` - Vercel deployment guide (recommended platform)
- `environment-setup.md` - Environment variables and configuration
- `dependencies.md` - Package recommendations and management

---

## Recommended Stack

### Core Technologies

**Framework:** Next.js 14+  
**Why:** Built-in optimizations, great DX, perfect for prototypes and production

**Language:** TypeScript  
**Why:** Type safety, better tooling, fewer bugs, professional standard

**Styling:** Tailwind CSS  
**Why:** Rapid development, consistent design, easy customization

**UI Components:** shadcn/ui  
**Why:** Copy-paste components, full control, Tailwind-based

**Icons:** lucide-react  
**Why:** Beautiful, consistent, tree-shakeable, large library

### Additional Libraries

**Charts:** Recharts  
**Why:** React-first, composable, great for dashboards

**State Management:** Zustand (when needed)  
**Why:** Simple, performant, less boilerplate than Redux

**Forms:** react-hook-form (when needed)  
**Why:** Performant, great validation, TypeScript support

**Animations:** Framer Motion (when needed)  
**Why:** Powerful, declarative, great for complex animations

---

## Stack Benefits

### For Prototypes
- **Fast setup** - Get started in minutes
- **Rapid iteration** - See changes instantly
- **Easy deployment** - Push to deploy
- **Professional quality** - Production-ready from day one

### For Production
- **Performance** - Excellent Core Web Vitals
- **Scalability** - Handles growth well
- **Maintainability** - Clean codebase, easy to update
- **SEO** - Built-in optimization

### For Teams
- **Familiar** - Popular, well-documented stack
- **Hiring** - Easy to find developers
- **Tooling** - Excellent dev tools and extensions
- **Community** - Large community, many resources

---

## Quick Start

### Prerequisites
```bash
# Node.js 18+ required
node --version  # Should be v18.0.0 or higher

# npm (comes with Node.js)
npm --version
```

### Create New Project
```bash
# Create Next.js project with recommended settings
npx create-next-app@latest my-project --typescript --tailwind --app --use-npm

cd my-project
```

### Install Additional Dependencies
```bash
# UI Components and utilities
npm install lucide-react
npm install class-variance-authority clsx tailwind-merge

# Charts (if needed)
npm install recharts

# State management (if needed)
npm install zustand

# Animations (if needed)
npm install framer-motion
```

### Copy Get Started Pack
```bash
# Copy the entire get-started folder
cp -r ../get-started ./
```

### Follow Setup Checklist
```bash
# Open and follow
cat get-started/SETUP-CHECKLIST.md
```

---

## Development Workflow

### 1. Initial Setup
- Create project with recommended stack
- Copy get-started folder
- Configure branding
- Set up Cursor rules and commands
- Create initial documentation

### 2. Local Development
- Run dev server: `npm run dev`
- Make changes with hot reload
- Test in browser
- Commit frequently

### 3. Quality Checks
- Lint code: `npm run lint`
- Type check: `npm run type-check`
- Build test: `npm run build`
- Fix any issues

### 4. Deployment
- Push to GitHub
- Deploy to Vercel (automatic)
- Test production build
- Monitor for errors

---

## Alternative Stacks

### For Different Needs

**Internal Tools/Admin Panels:**
- Consider: Remix, SolidStart
- When: Need server-focused rendering

**Mobile-First Apps:**
- Consider: React Native with Expo
- When: Need native mobile apps

**Static Sites:**
- Consider: Next.js with `output: 'export'`
- When: No dynamic data, simple sites

**Real-Time Apps:**
- Consider: Next.js + Socket.io or Supabase
- When: Need live updates, chat, collaboration

---

## Migration Guides

### From Create React App
1. Follow Next.js migration guide
2. Update routing to App Router
3. Convert components gradually
4. Test thoroughly

### From Vue/Angular
1. Learn React fundamentals first
2. Start fresh with Next.js
3. Reuse logic, rebuild UI
4. Follow best practices from start

### From Vanilla JS
1. Learn React first (official tutorial)
2. Then learn Next.js basics
3. Practice with small projects
4. Build up to full applications

---

## Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

### Learning Resources
- [Next.js Tutorial](https://nextjs.org/learn)
- [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/installation)

### Community
- [Next.js Discord](https://nextjs.org/discord)
- [Vercel Community](https://vercel.com/community)
- [GitHub Discussions](https://github.com/vercel/next.js/discussions)

---

## Troubleshooting

### Common Issues

**Node version too old:**
```bash
# Update Node.js to 18+
# Download from nodejs.org
```

**Port already in use:**
```bash
# Kill process on port 3000
# Windows: taskkill /F /IM node.exe
# Mac/Linux: lsof -ti:3000 | xargs kill
```

**Build fails:**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

**Type errors:**
```bash
# Run type check to see all errors
npm run type-check
# Fix one at a time
```

---

## Next Steps

1. **Read each guide** in this folder thoroughly
2. **Set up local environment** following local-development.md
3. **Configure Git workflow** per github-workflow.md
4. **Set up deployment** following deployment-vercel.md
5. **Manage dependencies** per dependencies.md

---

**The right technology stack makes development faster, easier, and more enjoyable.**

