# File-Based CMS Admin Panel - Setup Guide

## 🚀 Quick Start

### 1. Create GitHub Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "Portfolio CMS"
4. Set expiration (or no expiration)
5. Select scopes:
   - ✅ `repo` (Full control of private repositories)
6. Click "Generate token"
7. **Copy the token immediately** (you won't see it again!)

### 2. Set Up Environment Variables

#### For Local Development:

Create `.env.local` file in the project root:

```bash
GITHUB_TOKEN=ghp_your_token_here
GITHUB_REPO_OWNER=nishanshrestha04
GITHUB_REPO_NAME=nishanshrestha.com
GITHUB_BRANCH=main
ADMIN_PASSWORD=your_secure_password
```

#### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - `GITHUB_TOKEN` = your_github_token
   - `GITHUB_REPO_OWNER` = nishanshrestha04
   - `GITHUB_REPO_NAME` = nishanshrestha.com
   - `GITHUB_BRANCH` = main
   - `ADMIN_PASSWORD` = your_secure_password
4. Make sure they're set for **Production, Preview, and Development**

### 3. Test Locally

```bash
# Install dependencies (if not already done)
yarn install

# Start dev server
yarn dev

# Navigate to admin panel
# Open: http://localhost:5173/admin
```

### 4. Using the Admin Panel

1. Go to `/admin` route
2. Select "Projects" or "Experiences" tab
3. Fill out the form
4. When you submit, you'll be prompted for the admin password
5. After submission:
   - Image uploads to GitHub `/public/assets/projects/`
   - Content updates `/src/constants/index.js`
   - GitHub commits the changes
   - Vercel auto-deploys (in production)
   - Changes live in ~1 minute!

## 📝 How It Works

```
Admin Panel → API Route → GitHub API → Commit → Vercel Deploy → Live Site
```

1. **You fill the form** in the admin panel
2. **API validates** your password and data
3. **GitHub API** commits changes to your repo
4. **Vercel detects** the new commit
5. **Auto-deploys** the updated site
6. **Your changes are live!**

## 🔒 Security Notes

- Admin password is required for all operations
- GitHub token has full repo access (keep it secret!)
- Never commit `.env` or `.env.local` files
- Admin panel is accessible to anyone who knows the URL
- Consider adding IP whitelist in Vercel for production

## 🧪 Testing Checklist

- [ ] GitHub token created with `repo` scope
- [ ] Environment variables set locally in `.env.local`
- [ ] Can access admin panel at `/admin`
- [ ] Can add a test project successfully
- [ ] Image uploads and displays correctly
- [ ] Changes appear in GitHub commit history
- [ ] Environment variables set in Vercel dashboard
- [ ] Production deployment works
- [ ] Vercel auto-deploys on commit

## 🐛 Troubleshooting

### "Unauthorized" error
- Check your GitHub token is correct
- Ensure token has `repo` scope
- Verify `GITHUB_TOKEN` env variable is set

### "Could not parse constants file"
- Ensure `/src/constants/index.js` exists
- Check file follows the expected format

### Images not uploading
- Check file size (GitHub has limits)
- Ensure token has write permissions
- Verify path is correct

### Changes not deploying on Vercel
- Check Vercel deployment logs
- Ensure GitHub repo is connected to Vercel
- Verify auto-deploy is enabled

## 📚 Additional Notes

- Images are uploaded to `/public/assets/projects/` or `/public/assets/logos/`
- All changes are version-controlled in Git
- You can revert changes by reverting commits
- The system works entirely through GitHub API
  - No database needed
  - No separate backend server
  - All data in your repo
