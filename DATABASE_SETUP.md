# Database Setup Guide

This guide will help you set up a production database for storing Excel data that's shared across all users.

## Option 1: Supabase (Recommended - Free Tier)

Supabase offers a free tier with 500MB database storage, perfect for this use case.

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: `finance360-data` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait 2-3 minutes for setup

### Step 2: Run SQL Setup

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase-setup.sql`
4. Click "Run" (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

### Step 3: Get API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **service_role key** (under "Project API keys" - the `service_role` one, NOT the `anon` key)

### Step 4: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

4. Click "Save"
5. **Redeploy** your application for changes to take effect

### Step 5: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

---

## Option 2: Upstash Redis (via Vercel Integration) - Simple Key-Value Store

Upstash Redis is a serverless Redis database, perfect for simple key-value storage.

### Step 1: Add Upstash Redis Integration

1. In your Vercel dashboard, go to your project
2. Click **Integrations** tab
3. Search for "Upstash Redis" or "Redis"
4. Click "Add Integration"
5. Create a new database or use existing
6. Choose a name and region
7. Click "Create"

### Step 2: Get Connection Details

1. After integration, go to **Settings** → **Environment Variables**
2. Vercel should automatically add:
   - **KV_REST_API_URL**
   - **KV_REST_API_TOKEN**
3. If not auto-added, you can find them in the Upstash dashboard

### Step 3: Install Upstash Redis Package

```bash
npm install @upstash/redis
```

### Step 4: Redeploy

Redeploy your application for the integration to take effect.

---

## Option 3: Other Databases

The code supports any database. You can extend `lib/db.ts` to add:

- **PostgreSQL** (via `pg` package)
- **MongoDB** (via `mongodb` package)
- **PlanetScale** (MySQL)
- **Neon** (Serverless Postgres)

---

## Testing Your Setup

After setup, test by:

1. Upload an Excel file in your app
2. Check your database to see if data was saved
3. Open the app in an incognito window (different user)
4. Verify they see the same data

---

## Troubleshooting

### "Failed to save Excel data to server"

- Check environment variables are set correctly
- Verify database connection credentials
- Check Vercel logs for detailed errors

### Data not persisting

- Ensure you're using the `service_role` key (not `anon` key) for Supabase
- Check database permissions/policies
- Verify environment variables are set for Production environment

### Still using in-memory storage

- The app falls back to in-memory if no database is configured
- Check console logs for which backend is being used
- Verify environment variables are set and the app is redeployed

---

## Security Notes

- **Never commit** database credentials to Git
- Use environment variables for all secrets
- Consider adding authentication if you want to restrict who can upload
- Review RLS policies in Supabase for production use

---

## Cost Estimates

- **Supabase Free Tier**: 500MB database, 2GB bandwidth - **FREE**
- **Vercel KV Free Tier**: 256MB storage, 30M requests/month - **FREE**
- Both are sufficient for most use cases!

