# 🚀 Deployment Guide - Data_AI_Finance360

This guide will help you deploy your Data_AI_Finance360 project so others can access it as a webpage.

## Quick Start (Recommended: Vercel)

Vercel is the easiest and best option for Next.js projects. It's free, fast, and requires minimal setup.

### Option 1: Deploy via Vercel Dashboard (Easiest - 5 minutes)

#### Step 1: Prepare Your Code

1. **Make sure your code is in a Git repository:**
   ```bash
   # If not already initialized
   git init
   git add .
   git commit -m "Ready for deployment"
   ```

2. **Push to GitHub:**
   - Create a new repository on [GitHub](https://github.com/new)
   - Follow the instructions to push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

#### Step 2: Deploy to Vercel

1. **Sign up/Login to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up using your GitHub account (recommended)

2. **Import Your Project:**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure (Usually No Changes Needed):**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

4. **Environment Variables (Optional):**
   - If you have any environment variables, add them in the "Environment Variables" section
   - For this project, you typically don't need any for basic deployment

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete

6. **Done! 🎉**
   - Your site will be live at: `your-project-name.vercel.app`
   - You'll get a production URL automatically
   - HTTPS is included automatically

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   # From your project directory
   vercel
   ```
   
   For production deployment:
   ```bash
   vercel --prod
   ```

4. **Follow the prompts:**
   - Link to existing project or create new
   - Confirm settings
   - Wait for deployment

### Option 3: Use the Deployment Script

```bash
# Make the script executable (Linux/Mac)
chmod +x deploy.sh

# Run the script
./deploy.sh
```

On Windows (PowerShell):
```powershell
# Run directly
bash deploy.sh
```

## Other Deployment Options

### Netlify

1. **Sign up at [netlify.com](https://netlify.com)**
2. **Drag and drop your `.next` folder** after running `npm run build`
   OR
3. **Connect to GitHub** for automatic deployments

### Railway

1. **Sign up at [railway.app](https://railway.app)**
2. **Create new project** → "Deploy from GitHub repo"
3. **Select your repository**
4. **Railway auto-detects Next.js** and deploys

### Render

1. **Sign up at [render.com](https://render.com)**
2. **New** → "Web Service"
3. **Connect GitHub repository**
4. **Settings:**
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Environment: `Node`

## Post-Deployment Steps

### 1. Update Metadata URLs (Important!)

After deployment, update the URLs in `app/layout.tsx`:

```typescript
// Change these URLs to your actual deployment URL
metadataBase: new URL('https://your-actual-url.vercel.app'),
url: 'https://your-actual-url.vercel.app',
canonical: 'https://your-actual-url.vercel.app',
```

### 2. Test Your Deployment

- ✅ Visit your live URL
- ✅ Test all pages and navigation
- ✅ Check that images load correctly
- ✅ Test the login functionality
- ✅ Verify responsive design on mobile

### 3. Custom Domain (Optional)

If you want to use your own domain:

**Vercel:**
1. Go to Project → Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

**Other platforms:** Check their documentation for custom domain setup

## Environment Variables

If you need to set environment variables in production:

### Vercel:
1. Go to Project → Settings → Environment Variables
2. Add variables for Production, Preview, and Development
3. Redeploy after adding variables

### Common Variables (if needed):
```env
NEXT_PUBLIC_APP_NAME=Data_AI_Finance360
NEXT_PUBLIC_APP_URL=https://your-deployment-url.vercel.app
```

## Troubleshooting

### Build Fails

1. **Check build logs** in your deployment platform
2. **Test locally first:**
   ```bash
   npm run build
   ```
3. **Common issues:**
   - Missing dependencies → Run `npm install`
   - TypeScript errors → Fix type errors
   - Missing environment variables → Add them in platform settings

### Images Not Loading

1. **Check image paths** - should be relative (e.g., `/images/logo.png`)
2. **Verify images exist** in `public/images/` directory
3. **Check Next.js Image configuration** in `next.config.js`

### Authentication Issues

The project uses cookie-based authentication. Make sure:
- Cookies work on your domain
- No CORS issues
- Middleware is properly configured

### Performance Issues

1. **Enable caching** in your platform settings
2. **Optimize images** - use Next.js Image component
3. **Check bundle size** - run `npm run build` and review output

## Continuous Deployment

Once connected to GitHub:
- **Every push to `main` branch** → Auto-deploys to production
- **Every push to other branches** → Creates preview deployment
- **Pull requests** → Get preview URLs automatically

## Security Checklist

- ✅ Environment variables are set in platform (not in code)
- ✅ No secrets committed to Git
- ✅ HTTPS is enabled (automatic on Vercel/Netlify)
- ✅ Authentication is working correctly
- ✅ Sensitive routes are protected

## Need Help?

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment:** [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Project Issues:** Check the project's GitHub issues

## Quick Reference

```bash
# Build locally to test
npm run build
npm start

# Deploy to Vercel
npx vercel --prod

# Check deployment status
vercel ls
```

---

**🎉 Congratulations!** Your Data_AI_Finance360 platform is now live and accessible to others!

