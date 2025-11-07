# SOURCE OF TRUTH

**Project Documentation and Decision Log**

---

## Project Information

**Project Name:** [Your Project Name]  
**Description:** [Brief description of what this project does]  
**Created:** [Date]  
**Last Updated:** [Date]  
**Repository:** [GitHub URL if applicable]  
**Deployment:** [Vercel/other URL if applicable]

---

## Project Overview

### Purpose
[Describe the main purpose and goals of this project]

### Target Users
[Who will use this application?]

### Key Features
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

---

## Technology Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + custom brand components
- **Icons:** lucide-react
- **State Management:** [zustand/React Context/other]
- **Forms:** [react-hook-form/other if applicable]

### Backend (if applicable)
- **API:** Next.js API Routes
- **Database:** [Database type]
- **ORM:** [Prisma/Drizzle/other]
- **Authentication:** [NextAuth/other]

### Development Tools
- **Package Manager:** npm
- **Linting:** ESLint
- **Formatting:** Prettier (if applicable)
- **Version Control:** Git

### Deployment
- **Platform:** Vercel / [other]
- **Environment:** Production / Staging
- **CI/CD:** [If applicable]

---

## Architecture

### Directory Structure

```
project-root/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (auth)/          # Authentication pages
│   │   ├── (dashboard)/     # Main application pages
│   │   ├── api/             # API routes
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Landing page
│   ├── components/
│   │   ├── ui/              # Base UI components (shadcn)
│   │   ├── shared/          # Shared components
│   │   └── [feature]/       # Feature-specific components
│   ├── lib/
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   └── data/            # Data access layer
│   └── styles/              # Global styles (if any)
├── public/                  # Static assets
├── branding/                # Brand system (from get-started)
├── docs/                    # Documentation
└── [config files]           # Various config files
```

### Key Patterns

#### Data Fetching
[Describe how data is fetched - Server Components, API routes, etc.]

#### State Management
[Describe state management approach]

#### Routing
[Describe routing structure and conventions]

#### API Design
[Describe API endpoint patterns and conventions]

---

## File Inventory

### Core Application Files

#### Pages
| File | Purpose | Key Exports | Status |
|------|---------|-------------|--------|
| `app/page.tsx` | Landing page | Default export | ✅ Complete |
| `app/(dashboard)/dashboard/page.tsx` | Main dashboard | Default export | ✅ Complete |
| [Add more pages] | | | |

#### Components
| File | Purpose | Key Exports | Status |
|------|---------|-------------|--------|
| `components/layout/top-nav.tsx` | Main navigation | TopNav | ✅ Complete |
| `components/ui/button.tsx` | Button component | Button | ✅ Complete |
| [Add more components] | | | |

#### API Routes
| File | Purpose | Methods | Status |
|------|---------|---------|--------|
| `app/api/users/route.ts` | User operations | GET, POST | ✅ Complete |
| [Add more routes] | | | |

#### Utilities
| File | Purpose | Key Exports | Status |
|------|---------|-------------|--------|
| `lib/utils.ts` | Helper functions | cn, formatDate | ✅ Complete |
| [Add more utilities] | | | |

#### Types
| File | Purpose | Key Types | Status |
|------|---------|-----------|--------|
| `lib/types/index.ts` | Core type definitions | User, Post, etc. | ✅ Complete |
| [Add more types] | | | |

---

## Key Decisions & Rationale

### Decision Log

#### [Decision 1: Technology Choice]
**Date:** [YYYY-MM-DD]  
**Decision:** [What was decided]  
**Rationale:** [Why this decision was made]  
**Alternatives Considered:** [What else was considered]  
**Impact:** [How this affects the project]

#### [Decision 2: Architecture Pattern]
**Date:** [YYYY-MM-DD]  
**Decision:** [What was decided]  
**Rationale:** [Why this decision was made]  
**Alternatives Considered:** [What else was considered]  
**Impact:** [How this affects the project]

[Add more decisions as they're made]

---

## API Documentation

### Endpoints

#### GET /api/users
**Purpose:** Fetch list of users  
**Authentication:** Required  
**Query Parameters:**
- `page` (number, optional) - Page number
- `limit` (number, optional) - Items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

[Add more endpoints]

---

## Data Models

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
  updatedAt: Date;
}
```

[Add more models]

---

## Environment Variables

### Required
```
# API Configuration
NEXT_PUBLIC_API_URL=https://api.example.com

# Authentication
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Database (if applicable)
DATABASE_URL=postgresql://...

# Add more as needed
```

### Optional
```
# Analytics
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX

# Add more as needed
```

---

## Change Log

### Format
For each significant change, add an entry:

```markdown
## Change: [Title]
**Date:** YYYY-MM-DD
**Files:** 
- `path/to/file.tsx` — Brief description of what changed
- `path/to/another.ts` — Brief description

**Key Exports/APIs:**
- `ComponentName` - What it does
- `functionName()` - What it does

**Rationale:**
Why this change was made and what problem it solves.

**Follow-ups:**
- [ ] Task to complete
- [ ] Another related task
```

---

### Recent Changes

## Change: Initial Project Setup
**Date:** [YYYY-MM-DD]
**Files:**
- `app/` — Next.js App Router structure
- `components/` — Component library foundation
- `branding/` — Brand system from get-started pack

**Key Exports/APIs:**
- Initial project structure
- Brand components integrated
- Navigation implemented

**Rationale:**
Set up project foundation following Accenture standards and get-started pack guidelines.

**Follow-ups:**
- [ ] Add authentication
- [ ] Implement core features
- [ ] Set up deployment

---

[Add new changes here as you work]

---

## Dependencies

### Core Dependencies
```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "typescript": "^5.3.0",
  "tailwindcss": "^3.4.1"
}
```

### UI & Styling
```json
{
  "lucide-react": "latest",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.1"
}
```

### Add sections for:
- Data fetching libraries
- State management
- Form handling
- Authentication
- etc.

---

## Testing Strategy

### Unit Tests
[Describe unit testing approach if applicable]

### Integration Tests
[Describe integration testing approach if applicable]

### E2E Tests
[Describe E2E testing approach if applicable]

### Manual Testing Checklist
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Forms validate properly
- [ ] API endpoints return correct data
- [ ] Responsive design works on mobile
- [ ] Accessibility: keyboard navigation
- [ ] Accessibility: screen reader compatibility

---

## Deployment

### Deployment Process
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Environment Configuration
**Production:**
- URL: [Production URL]
- Branch: main/master
- Build command: `npm run build`

**Staging:**
- URL: [Staging URL if applicable]
- Branch: develop
- Build command: `npm run build`

### Post-Deployment Checklist
- [ ] All pages accessible
- [ ] API routes responding
- [ ] Environment variables set correctly
- [ ] No console errors
- [ ] Performance acceptable (Lighthouse check)

---

## Known Issues

### Current Issues
1. **Issue description**
   - Impact: [High/Medium/Low]
   - Workaround: [If available]
   - Fix planned: [Yes/No/Timeline]

[Add more issues]

### Resolved Issues
1. **Issue description** - [Date resolved]
   - Solution: [How it was fixed]

---

## Future Enhancements

### Planned Features
- [ ] Feature 1 description
- [ ] Feature 2 description
- [ ] Feature 3 description

### Technical Improvements
- [ ] Improvement 1
- [ ] Improvement 2
- [ ] Improvement 3

### Performance Optimizations
- [ ] Optimization 1
- [ ] Optimization 2

---

## Team & Contacts

### Project Team
- **Project Lead:** [Name]
- **Developers:** [Names]
- **Designers:** [Names if applicable]

### Stakeholders
- **Client Contact:** [Name if applicable]
- **Product Owner:** [Name if applicable]

---

## Resources

### Documentation
- [Link to external docs if any]
- [Link to design files if any]
- [Link to API documentation if any]

### Related Projects
- [Link to related projects if applicable]

---

## Notes

### Important Considerations
[Any important notes about the project, gotchas, or things to remember]

### Future Maintenance
[Notes for future maintainers]

---

**This document should be updated regularly as the project evolves. Keep it accurate and comprehensive.**

**Last Review:** [Date]  
**Next Review:** [Date]

