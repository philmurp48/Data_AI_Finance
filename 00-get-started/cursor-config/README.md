# Cursor Configuration

**Optimized Cursor AI setup for consistent, high-quality development**

---

## Overview

This folder contains configuration files and rules that optimize Cursor AI for professional project development with consistent patterns and quality standards.

---

## Files Included

### `cursor-rules.md`
Project development rules and conventions that guide Cursor AI to:
- Follow consistent coding patterns
- Apply proper naming conventions
- Maintain code quality standards
- Use project-specific patterns
- Follow architectural decisions

**Usage:** Copy to `.cursor/rules.md` in your project root

### `cursor-commands.json`
Pre-configured scaffolding commands for:
- Creating brand-compliant pages
- Generating components
- Scaffolding common patterns
- Applying branding consistently

**Usage:** Copy to `.cursor/commands.json` in your project root

### `source-of-truth-template.md`
Template for maintaining project documentation that tracks:
- All files and their purposes
- Key decisions and rationale
- API structures and patterns
- Changes over time

**Usage:** Copy to `docs/SOURCE-OF-TRUTH.md` in your project

---

## Setup Instructions

### 1. Create Cursor Configuration Directory

In your project root:
```bash
mkdir -p .cursor
mkdir -p docs
```

### 2. Copy Configuration Files

```bash
# Copy rules
cp get-started/cursor-config/cursor-rules.md .cursor/rules.md

# Copy commands
cp get-started/cursor-config/cursor-commands.json .cursor/commands.json

# Copy SOURCE-OF-TRUTH template
cp get-started/cursor-config/source-of-truth-template.md docs/SOURCE-OF-TRUTH.md
```

### 3. Customize for Your Project

Edit the copied files to:
- Add project name and description
- Update brand colors if using client branding
- Add project-specific rules
- Document initial decisions in SOURCE-OF-TRUTH

### 4. Restart Cursor

After copying configuration files:
1. Close Cursor
2. Reopen your project
3. Verify rules are active
4. Test commands work

---

## Using Cursor Commands

### Available Commands

Type `Cmd/Ctrl + K` then type command name:

- `create-brand-page` - Generate new page with branding
- `create-component` - Generate component with TypeScript
- `create-navigation` - Generate navigation component
- `create-data-table` - Generate data table component
- `create-kpi-card` - Generate KPI card component
- `apply-brand-colors` - Update colors to brand palette

### Command Workflow

1. **Trigger command** - `Cmd/Ctrl + K` → type command name
2. **Provide details** - Answer prompts (page name, component name, etc.)
3. **Review generated code** - Check output matches expectations
4. **Customize** - Adjust as needed for your specific use case
5. **Document** - Add to SOURCE-OF-TRUTH.md

---

## Cursor Rules Explained

### Core Principles

#### 1. Source-of-Truth First
- Read and update `docs/SOURCE-OF-TRUTH.md` before and after changes
- Maintain accurate documentation of all files
- Track decisions and rationale

#### 2. Search Before Creating
- Semantic search for existing similar code
- Grep for exact matches
- Avoid duplicating existing functionality

#### 3. Edit-in-Place
- Prefer modifying existing files
- Don't create parallel implementations
- Refactor when needed, don't branch

#### 4. Brand Compliance
- Use brand tokens from `brand-tokens.json`
- Import components from `branding/ui/`
- Follow design standards in `design-standards/`

#### 5. Quality Standards
- TypeScript strict mode
- No `any` types
- Proper error handling
- Accessibility (WCAG AA minimum)
- Responsive design (mobile-first)

---

## SOURCE-OF-TRUTH Maintenance

### When to Update

Update `docs/SOURCE-OF-TRUTH.md` after:
- Creating new files
- Making architectural decisions
- Changing API structures
- Adding new dependencies
- Refactoring major components
- Completing significant features

### What to Document

For each change, include:
```markdown
## Change: [Title]
**Date:** YYYY-MM-DD
**Files:** 
- `path/to/file.tsx` - Brief description
**Key Exports/APIs:** 
- `ComponentName`, `functionName`
**Rationale:** 
Why this change was made
**Follow-ups:** 
- [ ] Task to complete
- [ ] Another task
```

---

## Best Practices

### With Cursor AI

1. **Be Specific**
   - Provide clear, detailed prompts
   - Reference specific files and patterns
   - Specify desired output format

2. **Review Output**
   - Always review generated code
   - Check for brand compliance
   - Verify accessibility
   - Test functionality

3. **Iterate**
   - Refine prompts based on output
   - Build incrementally
   - Test frequently

4. **Document**
   - Update SOURCE-OF-TRUTH
   - Add comments to complex code
   - Document decisions

### Code Quality

1. **TypeScript**
   - Use strict mode
   - Define proper types
   - Avoid `any`
   - Use interfaces for props

2. **Components**
   - Small, focused components
   - Reusable patterns
   - Proper prop types
   - Accessibility attributes

3. **Naming**
   - PascalCase for components
   - camelCase for functions/variables
   - kebab-case for files
   - Descriptive, clear names

4. **Organization**
   - Logical folder structure
   - Related files grouped
   - Clear separation of concerns
   - Consistent patterns

---

## Troubleshooting

### Commands Not Working

**Issue:** Cursor commands don't appear or don't work

**Solutions:**
1. Verify `.cursor/commands.json` exists in project root
2. Check JSON syntax is valid
3. Restart Cursor IDE
4. Clear Cursor cache (if available)
5. Re-copy from template

### Rules Not Being Followed

**Issue:** Cursor generates code that doesn't follow rules

**Solutions:**
1. Verify `.cursor/rules.md` exists
2. Check file isn't too large (keep under 10,000 words)
3. Be more explicit in prompts
4. Reference specific rules in prompts
5. Review and provide feedback to improve

### SOURCE-OF-TRUTH Outdated

**Issue:** Documentation doesn't match codebase

**Solutions:**
1. Review recent changes
2. Update documentation for each file
3. Set reminder to update after each session
4. Make it part of PR checklist
5. Use Cursor to help generate documentation

---

## Advanced Configuration

### Custom Commands

Add your own commands to `cursor-commands.json`:

```json
{
  "commands": [
    {
      "name": "create-custom-pattern",
      "description": "Generate your custom pattern",
      "template": "Your detailed template here..."
    }
  ]
}
```

### Project-Specific Rules

Add to `.cursor/rules.md`:

```markdown
## Project-Specific Rules

### API Conventions
- All API routes return standardized responses
- Error handling follows ErrorResponse interface
- Authentication required on all /api routes

### Component Patterns
- Use CustomButton instead of base Button
- Always wrap forms in FormContainer
- Include loading states for async operations
```

---

## Resources

### Internal
- `cursor-rules.md` - Complete rule set
- `cursor-commands.json` - Command definitions
- `source-of-truth-template.md` - Documentation template
- `../design-standards/` - Design guidelines
- `../branding/` - Brand system

### External
- [Cursor Documentation](https://cursor.sh/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)

---

## Checklist: Configuration Setup

- [ ] Created `.cursor/` directory in project root
- [ ] Copied `cursor-rules.md` to `.cursor/rules.md`
- [ ] Copied `cursor-commands.json` to `.cursor/commands.json`
- [ ] Customized rules for project specifics
- [ ] Updated command variables (brand colors, project name)
- [ ] Created `docs/` directory
- [ ] Copied SOURCE-OF-TRUTH template to `docs/`
- [ ] Filled in initial project information
- [ ] Restarted Cursor IDE
- [ ] Tested commands work
- [ ] Added first entries to SOURCE-OF-TRUTH

---

**Proper configuration ensures consistent, high-quality output throughout your project.**

