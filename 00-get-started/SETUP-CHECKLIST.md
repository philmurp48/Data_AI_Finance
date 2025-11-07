# Project Setup Checklist

**Complete this checklist when starting a new Cursor AI project**

---

## Phase 1: Project Initialization

### 1.1 Create Project Structure
- [ ] Create new project directory
- [ ] Copy entire `get-started` folder into project root
- [ ] Initialize git repository
  ```bash
  git init
  git add .
  git commit -m "Initial commit with starter pack"
  ```

### 1.2 Determine Project Type
- [ ] **Accenture Prototype** - Internal demo or proof-of-concept
- [ ] **Client Prototype** - Client-branded demo or pilot
- [ ] Note: This determines branding configuration in next steps

---

## Phase 2: Branding Configuration

### 2.1 For Accenture Prototypes
- [ ] Keep default Accenture branding
- [ ] Verify logo path: `/public/accenture-logo.png`
- [ ] Confirm primary color: `#A100FF` (Accenture purple)
- [ ] Review `branding/accenture-brand-guide.md` for usage rules

### 2.2 For Client Prototypes
- [ ] Obtain client logo (SVG or PNG, transparent background preferred)
- [ ] Save client logo to `/public/client-logo.png`
- [ ] Get client brand colors (primary, secondary, accent)
- [ ] Update `branding/brand-config.json` with client values:
  ```json
  {
    "mode": "client",
    "brand": {
      "name": "Client Name",
      "primaryColor": "#HEXCODE",
      "logo": "/public/client-logo.png"
    }
  }
  ```
- [ ] Update `branding/brand-tokens.json` with client colors
- [ ] Review co-branding requirements if needed

### 2.3 Copy Brand Components
- [ ] Copy `branding/ui/` components to your project `components/` directory
- [ ] Update import paths in copied components
- [ ] Test components render with correct branding

---

## Phase 3: Cursor Configuration

### 3.1 Set Up Cursor Rules
- [ ] Copy `cursor-config/cursor-rules.md` to `.cursor/rules.md` in project root
- [ ] Customize rules for project-specific requirements
- [ ] Add project name and description to rules

### 3.2 Set Up Cursor Commands
- [ ] Copy `cursor-config/cursor-commands.json` to `.cursor/commands.json`
- [ ] Update brand variables in commands file
- [ ] Test commands work in Cursor

### 3.3 Configure Source of Truth
- [ ] Create `docs/` directory in project root
- [ ] Copy `cursor-config/source-of-truth-template.md` to `docs/SOURCE-OF-TRUTH.md`
- [ ] Fill in initial project information
- [ ] Commit to maintaining this document throughout development

---

## Phase 4: Technology Stack Setup

### 4.1 Initialize Next.js Project
- [ ] Review `technology-stack/tech-stack.md` for recommendations
- [ ] Initialize Next.js 14+ with App Router:
  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --use-npm
  ```
- [ ] Select options:
  - TypeScript: Yes
  - ESLint: Yes
  - Tailwind CSS: Yes
  - `src/` directory: Yes (recommended)
  - App Router: Yes
  - Import alias (@/*): Yes

### 4.2 Install Core Dependencies
- [ ] Install required packages:
  ```bash
  npm install lucide-react recharts framer-motion zustand
  npm install class-variance-authority clsx tailwind-merge
  npm install @radix-ui/react-* (as needed)
  ```
- [ ] Review `technology-stack/dependencies.md` for full list

### 4.3 Configure Tailwind
- [ ] Update `tailwind.config.ts` with brand colors from `branding/brand-tokens.json`
- [ ] Add custom utilities for brand gradients, shadows, animations
- [ ] Copy brand CSS from `branding/brand-styles.css` to `app/globals.css`

### 4.4 Set Up Environment
- [ ] Copy `templates/.env.template` to `.env.local`
- [ ] Fill in required environment variables
- [ ] Add `.env.local` to `.gitignore` (should already be there)
- [ ] Document environment variables in README

---

## Phase 5: Project Configuration

### 5.1 Configure TypeScript
- [ ] Ensure `tsconfig.json` has strict mode enabled
- [ ] Configure path aliases:
  ```json
  {
    "compilerOptions": {
      "paths": {
        "@/*": ["./src/*"],
        "@/components/*": ["./components/*"]
      }
    }
  }
  ```

### 5.2 Set Up Git Workflow
- [ ] Copy `.gitignore.template` to `.gitignore`
- [ ] Review `technology-stack/github-workflow.md` for branching strategy
- [ ] Set up GitHub repository (if using GitHub)
- [ ] Configure branch protection rules (if applicable)

### 5.3 Configure Deployment
- [ ] Review `technology-stack/deployment-vercel.md`
- [ ] Create Vercel project (if using Vercel)
- [ ] Connect GitHub repository to Vercel
- [ ] Configure environment variables in Vercel dashboard
- [ ] Set up preview deployments for branches

---

## Phase 6: Create Initial Files

### 6.1 Create Project README
- [ ] Copy `templates/README-template.md` to project root `README.md`
- [ ] Customize with project name, description, purpose
- [ ] Add setup instructions specific to your project
- [ ] Document environment variables
- [ ] Add deployment information

### 6.2 Create First Page
- [ ] Use `templates/page-template.tsx` as starting point
- [ ] Create landing page or dashboard
- [ ] Verify branding components render correctly
- [ ] Test responsive design across breakpoints

### 6.3 Set Up Navigation
- [ ] Review `design-standards/navigation-patterns.md`
- [ ] Use `templates/navigation-template.tsx` as base
- [ ] Implement navigation structure for your app
- [ ] Test dropdown menus, mobile navigation
- [ ] Verify accessibility (keyboard navigation, ARIA labels)

---

## Phase 7: Design Standards Implementation

### 7.1 Review Design Principles
- [ ] Read `design-standards/ui-ux-principles.md`
- [ ] Review `design-standards/component-patterns.md`
- [ ] Understand accessibility requirements in `design-standards/accessibility-standards.md`

### 7.2 Apply Writing Style
- [ ] Review `design-standards/writing-style-guide.md`
- [ ] Apply Accenture brand voice principles (or client voice if applicable)
- [ ] Use "weekend language" - clear, conversational, jargon-free
- [ ] Ensure all copy is professional and polished

### 7.3 Implement Accessibility
- [ ] Review `design-standards/accessibility-standards.md`
- [ ] Ensure WCAG AA compliance minimum
- [ ] Test with keyboard navigation
- [ ] Verify color contrast ratios
- [ ] Add proper ARIA labels and semantic HTML

---

## Phase 8: Quality Assurance

### 8.1 Code Quality
- [ ] Run linter: `npm run lint` (fix all issues)
- [ ] Check TypeScript errors: `npm run type-check`
- [ ] Review code for consistency with Cursor rules
- [ ] Ensure no console.log statements in production code

### 8.2 Design Review
- [ ] Verify branding is correct (logos, colors, typography)
- [ ] Check responsive design (mobile, tablet, desktop)
- [ ] Test all interactive elements (buttons, dropdowns, modals)
- [ ] Review against `design-standards/design-checklist.md`

### 8.3 Content Review
- [ ] Proofread all copy for grammar and spelling
- [ ] Verify professional tone (no emojis, casual language)
- [ ] Check all links work
- [ ] Ensure error messages are helpful and clear

### 8.4 Performance Check
- [ ] Test page load times
- [ ] Optimize images (use Next.js Image component)
- [ ] Check for unnecessary re-renders
- [ ] Review bundle size

---

## Phase 9: Documentation

### 9.1 Update Source of Truth
- [ ] Document all files created and their purposes
- [ ] List key exports and APIs
- [ ] Note any important decisions or patterns
- [ ] Add rationale for architectural choices

### 9.2 Create User Guide (if needed)
- [ ] Document how to use the application
- [ ] Include screenshots or videos
- [ ] Explain key features and workflows
- [ ] Provide troubleshooting tips

### 9.3 Document Deployment
- [ ] Write deployment instructions
- [ ] Document environment variables needed
- [ ] Note any deployment-specific configuration
- [ ] Include rollback procedures

---

## Phase 10: Launch Preparation

### 10.1 Final Testing
- [ ] Test in production-like environment
- [ ] Verify all features work end-to-end
- [ ] Test with real or realistic data
- [ ] Conduct user acceptance testing (if applicable)

### 10.2 Security Review
- [ ] Ensure no secrets in code or git history
- [ ] Verify environment variables are secure
- [ ] Check authentication and authorization (if applicable)
- [ ] Review error handling (don't expose sensitive info)

### 10.3 Deploy
- [ ] Deploy to production
- [ ] Verify deployment successful
- [ ] Test production URL
- [ ] Monitor for errors or issues

### 10.4 Handoff
- [ ] Share project documentation
- [ ] Provide demo or walkthrough
- [ ] Transfer credentials securely (if needed)
- [ ] Set up ongoing support plan (if applicable)

---

## Post-Launch

### After Project Completion
- [ ] Update starter pack with lessons learned
- [ ] Document any new patterns or components created
- [ ] Share successful approaches with team
- [ ] Archive project documentation
- [ ] Celebrate success!

---

## Troubleshooting Common Issues

### Branding not showing correctly
- Check logo path in `/public/` directory
- Verify `brand-tokens.json` imported correctly
- Clear Next.js cache: `rm -rf .next` then `npm run dev`

### Cursor commands not working
- Ensure `.cursor/commands.json` in correct location
- Restart Cursor IDE
- Check JSON syntax is valid

### TypeScript errors
- Run `npm run type-check` to see all errors
- Ensure all imports have correct paths
- Check `tsconfig.json` paths configuration

### Deployment issues
- Verify all environment variables set in Vercel
- Check build logs for errors
- Ensure all dependencies in `package.json`
- Test build locally: `npm run build`

---

**Questions or issues? Review the comprehensive documentation in each `get-started` subfolder.**

**Estimated setup time: 2-4 hours for first project, 1-2 hours for subsequent projects**

