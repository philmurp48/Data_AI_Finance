# Code Templates

**Ready-to-use templates for common patterns**

---

## Overview

This folder contains boilerplate code templates that you can copy and customize for your projects. Each template follows best practices and includes proper TypeScript types, accessibility, and brand compliance.

---

## Available Templates

### React/Next.js Components
- `page-template.tsx` - Standard page structure with branding
- `component-template.tsx` - Reusable component boilerplate
- `navigation-template.tsx` - Top navigation bar component
- `api-route-template.ts` - API route with error handling

### Configuration Files
- `.env.template` - Environment variables template
- `.gitignore.template` - Recommended gitignore
- `README-template.md` - Project README structure

---

## How to Use Templates

### 1. Copy the Template
```bash
cp get-started/templates/page-template.tsx src/app/my-page/page.tsx
```

### 2. Find and Replace
Replace placeholders:
- `[PageName]` → Your page name (PascalCase)
- `[ComponentName]` → Your component name (PascalCase)
- `[Description]` → Your description
- etc.

### 3. Customize
- Add your specific logic
- Adjust styling as needed
- Add more props/features
- Test thoroughly

### 4. Document
- Update comments
- Add to SOURCE-OF-TRUTH.md
- Note any deviations from template

---

## Template Standards

All templates follow these standards:

### TypeScript
- Strict mode compatible
- Proper interface definitions
- No `any` types
- Full type coverage

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Screen reader compatible

### Brand Compliance
- Uses brand tokens
- Imports from branding system
- Follows design standards
- Professional quality

### Code Quality
- Clean, readable code
- Proper comments
- Error handling
- Loading states

---

## Creating New Templates

### When to Create a Template

Create a template when:
- You've built same pattern 2+ times
- Pattern is reusable across projects
- It follows best practices
- It saves significant time

### Template Checklist

- [ ] Fully functional standalone
- [ ] TypeScript interfaces defined
- [ ] Comments explain key parts
- [ ] Placeholders clearly marked with []
- [ ] Follows all coding standards
- [ ] Tested in real project
- [ ] Documentation added to README

### Template Format

```tsx
/**
 * [TemplateName] Template
 * 
 * Description of what this template provides and when to use it.
 * 
 * Usage:
 * 1. Copy this file to your project
 * 2. Replace [Placeholders] with your values
 * 3. Customize as needed
 * 4. Delete this comment block
 */

// Template code here
```

---

## Template Maintenance

### Updating Templates

When you improve a pattern:
1. Update the template
2. Note changes in git commit
3. Update this README if needed
4. Consider updating existing uses

### Deprecating Templates

If a template becomes outdated:
1. Mark as `DEPRECATED` in filename
2. Add deprecation notice at top
3. Point to replacement
4. Remove after projects migrate

---

## Resources

- `../branding/` - Brand system and components
- `../design-standards/` - Design guidelines
- `../cursor-config/` - Development rules
- `../project-examples/` - Real implementations

---

**Templates accelerate development while maintaining quality and consistency.**

