# Local Development with Vercel CLI

## The Issue

The admin panel uses Vercel serverless functions (`/api/` routes) which don't work with `yarn dev`. 

**Error you're seeing:**
```
Failed to execute 'json' on 'Response': Unexpected end of JSON input
```

This happens because Vite doesn't serve the `/api/` endpoints during development.

## Solution: Use Vercel CLI

### 1. Install Vercel CLI

```bash
# Install globally
npm install -g vercel

# Or with yarn
yarn global add vercel
```

### 2. Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### 3. Link Your Project (First Time Only)

```bash
cd /home/nishanshrestha/Documents/nishanshrestha.com
vercel link
```

Answer the prompts:
- Set up and deploy? **N** (No, just link)
- Link to existing project? **Y** (if you have one) or **N** (for new)
- Project name: `nishanshrestha-com` (or your preferred name)

### 4. Set Up Environment Variables Locally

```bash
# Pull environment variables from Vercel (if already set there)
vercel env pull

# OR manually create .env.local with:
GITHUB_TOKEN=your_token
GITHUB_REPO_OWNER=nishanshrestha04
GITHUB_REPO_NAME=nishanshrestha.com
GITHUB_BRANCH=main
ADMIN_PASSWORD=your_password
```

### 5. Run Local Development

```bash
# Instead of "yarn dev", use:
vercel dev
```

This will:
- ✅ Start Vite dev server
- ✅ Serve `/api/` routes locally
- ✅ Use your environment variables
- ✅ Simulate production environment

### 6. Access Admin Panel

Navigate to: `http://localhost:3000/admin` (note: port might be 3000 instead of 5173)

## Quick Commands

```bash
# Start local development
vercel dev

# Check environment variables
vercel env ls

# Add environment variable
vercel env add GITHUB_TOKEN

# Deploy to production
vercel --prod
```

## Alternative: Test on Production

If you don't want to use Vercel CLI locally, you can:

1. Push your code to GitHub
2. Deploy to Vercel (automatically or with `vercel --prod`)
3. Add environment variables in Vercel dashboard
4. Use the admin panel on your live site

## Comparison

| Command | API Routes | Port | Best For |
|---------|-----------|------|----------|
| `yarn dev` | ❌ No | 5173 | Frontend development only |
| `vercel dev` | ✅ Yes | 3000 | Full-stack testing with API |
| Production | ✅ Yes | 443 | Live usage |

## Troubleshooting

### Vercel CLI not found
```bash
# Make sure it's installed globally
npm list -g vercel

# Reinstall if needed
npm install -g vercel
```

### Port already in use
```bash
# Vercel dev uses port 3000 by default
# Stop any other process using that port or specify a different port:
vercel dev --listen 3001
```

### Environment variables not loading
```bash
# Pull from Vercel
vercel env pull

# OR check .env.local exists and has correct values
cat .env.local
```

### API still not working
1. Check that you're accessing the correct port (3000, not 5173)
2. Verify environment variables are set
3. Check Vercel CLI logs for errors
4. Ensure GitHub token has correct permissions

## Recommended Workflow

**For Frontend Development:**
```bash
yarn dev  # Fast, HMR works great
```

**For Testing Admin Panel / API:**
```bash
vercel dev  # Full environment
```

**For Production:**
```bash
git push  # Auto-deploys via Vercel GitHub integration
# OR
vercel --prod  # Manual deployment
```
