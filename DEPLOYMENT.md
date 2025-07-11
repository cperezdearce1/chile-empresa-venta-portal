# Deployment Guide - Vercel + Custom Domain

## Quick Deploy to Vercel

### 1. Prepare Your Repository
- Ensure all files are committed to your Git repository
- The following files are already configured:
  - `vercel.json` - Vercel deployment configuration
  - `public/CNAME` - Custom domain configuration
  - `package.json` - Dependencies and build scripts

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Vite project
5. Click "Deploy"

### 3. Configure Custom Domain
1. In your Vercel dashboard, go to your project
2. Navigate to "Settings" → "Domains"
3. Add your custom domain: `www.atlaspartners.cl`
4. Vercel will provide DNS records to configure

### 4. Configure DNS in GoDaddy
1. Log into your GoDaddy account
2. Go to your domain `atlaspartners.cl`
3. Navigate to "DNS Management"
4. Add the DNS records provided by Vercel:
   - **Type**: CNAME
   - **Name**: `www`
   - **Value**: `cname.vercel-dns.com`

### 5. SSL Certificate
- Vercel automatically provides SSL certificates
- Your site will be available at `https://www.atlaspartners.cl`

## Build Commands
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Environment Variables
If you need to add environment variables later:
1. Go to Vercel dashboard → Settings → Environment Variables
2. Add any required variables

## Automatic Deployments
- Every push to your main branch will trigger a new deployment
- Preview deployments are created for pull requests

## Troubleshooting
- If you see routing issues, the `vercel.json` file handles SPA routing
- Check Vercel logs in the dashboard for build errors
- Ensure all dependencies are in `package.json` 