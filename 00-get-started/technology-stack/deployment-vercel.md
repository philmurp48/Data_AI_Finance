# Vercel Deployment Guide

**Complete guide to deploying Next.js projects on Vercel**

---

## Why Vercel?

Vercel is the **BEST** platform for Next.js projects:

- **Made by Next.js creators** - Perfect integration
- **Zero configuration** - Works out of the box
- **Automatic HTTPS** - Free SSL certificates
- **Preview deployments** - Every branch gets a URL
- **Edge network** - Fast globally
- **Free tier** - Generous for prototypes
- **Great DX** - Deploy with `git push`

---

## Prerequisites

### 1. GitHub Account
Sign up at [github.com](https://github.com) if you don't have one

### 2. Vercel Account
Sign up at [vercel.com](https://vercel.com) using your GitHub account (recommended)

### 3. Project in GitHub
Your Next.js project should be in a GitHub repository

---

## Quick Setup (5 Minutes)

### Step 1: Push to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub, then:
git remote add origin https://github.com/username/project-name.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository
4. Click "Import"

### Step 3: Configure (Usually No Changes Needed)

Vercel auto-detects Next.js projects:
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

Click "Deploy"

### Step 4: Done! 🎉

Your project is live! You'll get:
- **Production URL:** `project-name.vercel.app`
- **Custom domain option:** Add your own domain
- **Automatic HTTPS:** SSL certificate included

---

## Environment Variables

### Setting Up Environment Variables

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Environment Variables"
   - Add each variable

2. **Three Environments:**
   - **Production:** Live site
   - **Preview:** Branch deployments
   - **Development:** Local (usually not needed)

### Example Variables

```
# API Configuration
NEXT_PUBLIC_API_URL=https://api.example.com

# Authentication
NEXTAUTH_SECRET=your-production-secret-here
NEXTAUTH_URL=https://your-project.vercel.app

# Database
DATABASE_URL=postgresql://username:password@host:5432/dbname

# External Services
STRIPE_SECRET_KEY=sk_live_...
SENDGRID_API_KEY=SG...
```

### Important Notes

**Public vs Private:**
- `NEXT_PUBLIC_*` - Available in browser (client-side)
- No prefix - Server-side only (secure)

**Security:**
- Never commit secrets to git
- Use different values for production/preview
- Rotate secrets regularly

### Updating Variables

After changing environment variables:
1. Redeploy your project (or wait for next push)
2. Variables are injected at build time
3. Test in preview deployment first

---

## Deployment Workflow

### Automatic Deployments

**Production (main branch):**
```bash
git push origin main
# Automatically deploys to production
# URL: project-name.vercel.app
```

**Preview (other branches):**
```bash
git checkout -b feature/new-feature
git push origin feature/new-feature
# Automatically creates preview deployment
# URL: project-name-git-feature-new-feature.vercel.app
```

### Manual Deployments

**Via CLI:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from local
vercel

# Deploy to production
vercel --prod
```

**Via Dashboard:**
- Go to project in Vercel
- Click "Deployments"
- Click "..." → "Redeploy"

---

## Custom Domains

### Adding Your Domain

1. **In Vercel:**
   - Go to project → "Settings" → "Domains"
   - Enter your domain (e.g., `myproject.com`)
   - Click "Add"

2. **Configure DNS:**
   Vercel will show you DNS records to add:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for Propagation:**
   - Usually 5-15 minutes
   - Sometimes up to 48 hours
   - Check at [whatsmydns.net](https://whatsmydns.net)

4. **SSL Certificate:**
   - Automatically issued
   - Renews automatically
   - Free forever

### Multiple Domains

You can add multiple domains to one project:
- `myproject.com` (primary)
- `www.myproject.com` (redirect to primary)
- `custom-client-domain.com` (separate domain)

---

## Preview Deployments

### What Are Preview Deployments?

Every branch and pull request gets its own URL:
- Test changes before merging
- Share with stakeholders
- No impact on production

### How They Work

```bash
# Create feature branch
git checkout -b feature/new-page
git push origin feature/new-page

# Vercel automatically creates:
# project-name-git-feature-new-page-username.vercel.app
```

### Benefits

- **Safe testing:** Changes don't affect production
- **Easy sharing:** Share URL with team/clients
- **Visual diffs:** See what changed
- **Comments:** Add comments on preview deployments

### Managing Previews

**In GitHub:**
- Vercel bot comments on PRs with preview URL
- Click to see changes
- Automatic updates on new commits

**In Vercel:**
- View all deployments
- See deployment status
- Access logs and analytics

---

## Monitoring & Analytics

### Built-in Analytics

**Free Tier:**
- Page views
- Top pages
- Referrer sources

**Pro Tier:**
- Real-time metrics
- Custom events
- User demographics

**Accessing:**
- Go to project → "Analytics"
- View charts and metrics

### Performance Monitoring

**Core Web Vitals:**
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

**Where to Check:**
- Vercel dashboard
- Chrome DevTools
- Lighthouse reports

### Logs

**Accessing Logs:**
1. Go to project → "Deployments"
2. Click on a deployment
3. Click "View Function Logs"

**What You'll See:**
- Console.log output
- Errors and warnings
- API route execution
- Build logs

---

## Rollback & Recovery

### Rolling Back

**If deployment breaks:**

1. **Via Dashboard:**
   - Go to "Deployments"
   - Find last working deployment
   - Click "..." → "Promote to Production"

2. **Via Git:**
   ```bash
   git revert HEAD
   git push origin main
   # Automatically deploys reverted version
   ```

### Best Practices

- **Test in preview first:** Never push directly to main
- **Small changes:** Easier to identify issues
- **Monitor after deploy:** Check logs immediately
- **Keep rollback easy:** Don't delete old deployments

---

## Troubleshooting

### Build Fails

**Common Issues:**

1. **TypeScript Errors:**
   ```bash
   # Test locally
   npm run build
   # Fix all TypeScript errors
   ```

2. **Missing Dependencies:**
   ```bash
   # Ensure all dependencies in package.json
   npm install package-name --save
   git commit -am "Add missing dependency"
   git push
   ```

3. **Environment Variables:**
   - Check all required variables are set
   - Check variable names match (case-sensitive)
   - Redeploy after adding variables

**Viewing Build Logs:**
- Click on failed deployment
- Scroll to error message
- Copy error and search/fix

### Runtime Errors

**500 Internal Server Error:**
1. Check Function Logs in Vercel
2. Look for error messages
3. Check environment variables
4. Verify API routes work locally

**404 Not Found:**
- Check file names match routes
- Check dynamic routes syntax
- Verify app directory structure

### Slow Performance

**Diagnosis:**
1. Run Lighthouse audit
2. Check image optimization
3. Review bundle size
4. Check API response times

**Fixes:**
- Use Next.js Image component
- Implement lazy loading
- Optimize API calls
- Enable caching

---

## Advanced Configuration

### vercel.json

Create `vercel.json` for custom configuration:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1", "sfo1"],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=60, stale-while-revalidate"
        }
      ]
    }
  ]
}
```

### Redirects

```json
{
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ]
}
```

### Rewrites (Proxying APIs)

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://external-api.com/:path*"
    }
  ]
}
```

---

## Cost Management

### Free Tier Includes

- **Bandwidth:** 100 GB/month
- **Build time:** 100 hours/month
- **Serverless function execution:** 100 GB-hours
- **Projects:** Unlimited
- **Team members:** 1 (you)

**Perfect for:**
- Prototypes
- Demos
- Personal projects
- Small business sites

### When to Upgrade

**Pro ($20/month):**
- More bandwidth (1 TB)
- More build time (unlimited)
- Analytics included
- Password protection
- Team collaboration

**Enterprise:**
- Custom pricing
- Dedicated support
- SLA guarantees
- Advanced features

### Monitoring Usage

- Dashboard → "Usage"
- View current month
- Set up alerts
- Optimize if near limits

---

## Security Best Practices

### 1. Environment Variables
- Use Vercel's environment variables (never commit)
- Different secrets for production/preview
- Rotate regularly

### 2. Authentication
- Implement proper authentication
- Use NextAuth.js or similar
- Protect sensitive routes

### 3. API Routes
- Validate all inputs
- Rate limiting
- Error handling
- Don't expose sensitive data

### 4. Headers
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

## Deployment Checklist

### Pre-Deployment
- [ ] All TypeScript errors fixed
- [ ] Build succeeds locally (`npm run build`)
- [ ] Environment variables documented
- [ ] Sensitive data not in code
- [ ] Dependencies in package.json

### Deployment
- [ ] Set up environment variables in Vercel
- [ ] Deploy to preview first
- [ ] Test preview thoroughly
- [ ] Check Function Logs
- [ ] Merge to main for production

### Post-Deployment
- [ ] Test production URL
- [ ] Check all pages load
- [ ] Verify API routes work
- [ ] Run Lighthouse audit
- [ ] Monitor logs for errors
- [ ] Set up custom domain (if needed)

---

## Resources

### Official Docs
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Vercel CLI](https://vercel.com/docs/cli)

### Support
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Discord](https://vercel.com/discord)
- [Twitter @vercel](https://twitter.com/vercel)

---

**Vercel makes deployment so easy, you'll deploy multiple times per day. Use preview deployments liberally!**

