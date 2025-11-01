# Deploy Advise Hub to Vercel

## Method 1: GitHub + Vercel (Recommended)

### Step 1: Create GitHub Repository
```bash
cd c:\xampp\htdocs\advise-hub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/advise-hub.git
git push -u origin main
```

### Step 2: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (leave empty)
   - **Output Directory**: ./
6. Click "Deploy"

## Method 2: Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Deploy
```bash
cd c:\xampp\htdocs\advise-hub
vercel login
vercel --prod
```

## Method 3: Drag & Drop

1. Create ZIP file of your project
2. Go to [vercel.com/new](https://vercel.com/new)
3. Drag & drop ZIP file
4. Click "Deploy"

## Post-Deployment Steps

### 1. Update Domain References
Replace `localhost/advise-hub` with your Vercel URL:
```bash
# Find and replace in all files
# From: https://moneyadvisehub.com/
# To: https://your-project.vercel.app/
```

### 2. Configure Custom Domain (Optional)
1. Go to Vercel Dashboard > Your Project > Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed

### 3. Environment Variables (if needed)
1. Go to Settings > Environment Variables
2. Add any required variables

## Your Live URLs
- **Vercel URL**: `https://moneyadvisehub.com`
- **Custom Domain**: `https://yourdomain.com` (if configured)

## Files Created for Deployment
- ✅ `vercel.json` - Vercel configuration
- ✅ `package.json` - Project metadata
- ✅ `.gitignore` - Git ignore rules

Your site is ready for deployment!