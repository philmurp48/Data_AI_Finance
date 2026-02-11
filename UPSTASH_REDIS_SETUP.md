# Upstash Redis Setup Guide - Step by Step

## Step 1: Access Vercel Integrations

1. Go to [vercel.com](https://vercel.com) and log in
2. Navigate to your project: **Data_AI_Finance360** (or your project name)
3. Click on the **Integrations** tab (in the top navigation)
   - If you don't see it, click on your project name first, then look for "Integrations" in the sidebar

## Step 2: Add Upstash Redis Integration

1. In the Integrations page, click **Browse Marketplace** or **Add Integration**
2. Search for **"Upstash Redis"** or **"Redis"**
3. You should see **"Upstash Redis"** in the results
4. Click on it, then click **Add Integration** or **Install**

## Step 3: Create or Connect Database

1. You'll see options:
   - **Create new database** (recommended for first time)
   - **Connect existing database** (if you already have one)
2. If creating new:
   - **Database Name**: `finance360-redis` (or your choice)
   - **Region**: Choose closest to your users (e.g., `us-east-1`, `eu-west-1`)
   - **Type**: Usually "Regional" (free tier) or "Global" (paid)
3. Click **Create** or **Connect**

## Step 4: Verify Environment Variables

1. After integration is added, go to **Settings** → **Environment Variables**
2. Vercel should automatically add these variables:
   - `KV_REST_API_URL` - Your Redis REST API URL
   - `KV_REST_API_TOKEN` - Your Redis REST API token
3. **Verify they exist** - if not, you may need to:
   - Go back to the Upstash dashboard
   - Copy the REST API URL and Token manually
   - Add them to Vercel environment variables

## Step 5: Get Credentials (If Not Auto-Added)

If Vercel didn't auto-add the variables:

1. Go to [console.upstash.com](https://console.upstash.com)
2. Log in (you may need to create an account)
3. Find your database (the one you just created)
4. Click on it
5. Go to **REST API** tab
6. Copy:
   - **UPSTASH_REDIS_REST_URL** (this becomes `KV_REST_API_URL`)
   - **UPSTASH_REDIS_REST_TOKEN** (this becomes `KV_REST_API_TOKEN`)

## Step 6: Add Environment Variables Manually (If Needed)

1. In Vercel, go to **Settings** → **Environment Variables**
2. Click **Add New**
3. Add first variable:
   - **Key**: `KV_REST_API_URL`
   - **Value**: Paste your Upstash REST URL
   - **Environment**: Select all (Production, Preview, Development)
   - Click **Save**
4. Add second variable:
   - **Key**: `KV_REST_API_TOKEN`
   - **Value**: Paste your Upstash REST Token
   - **Environment**: Select all (Production, Preview, Development)
   - Click **Save**

## Step 7: Redeploy Your Application

1. Go to **Deployments** tab in Vercel
2. Find your latest deployment
3. Click the **"..."** menu (three dots)
4. Click **Redeploy**
5. Or simply push a new commit to trigger a new deployment:
   ```bash
   git commit --allow-empty -m "Trigger redeploy for Redis integration"
   git push
   ```

## Step 8: Test the Integration

1. After redeployment, visit your live site
2. Upload an Excel file in the Business Insight Consoles page
3. Open the site in an incognito window (simulating a different user)
4. Verify that the Excel data appears (shared data is working!)

## Troubleshooting

### Environment Variables Not Showing
- Check that the integration was successfully added
- Try removing and re-adding the integration
- Manually add the variables as described in Step 6

### "Failed to save Excel data to server"
- Verify environment variables are set correctly
- Check Vercel logs: **Deployments** → Click deployment → **Logs**
- Ensure variables are set for the correct environment (Production/Preview)

### Still Using In-Memory Storage
- Check browser console for errors
- Verify the environment variables are named exactly:
  - `KV_REST_API_URL` (not `UPSTASH_REDIS_REST_URL`)
  - `KV_REST_API_TOKEN` (not `UPSTASH_REDIS_REST_TOKEN`)
- Make sure you redeployed after adding variables

### Can't Find Upstash Redis in Integrations
- Try searching for "Redis" instead
- Check Vercel Marketplace: [vercel.com/marketplace](https://vercel.com/marketplace)
- Ensure you're on a Vercel plan that supports integrations (Hobby plan works)

## Free Tier Limits

Upstash Redis Free Tier includes:
- **10,000 commands/day** - More than enough for Excel data storage
- **256 MB storage** - Plenty for Excel data
- **Regional databases** - Fast performance

## Success Indicators

✅ Integration shows as "Connected" in Vercel  
✅ Environment variables are visible in Settings  
✅ No errors in Vercel deployment logs  
✅ Excel data persists across page reloads  
✅ Different users see the same uploaded data  

---

**Need Help?** Check the Vercel logs or Upstash dashboard for detailed error messages.

