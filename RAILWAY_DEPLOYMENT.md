# Railway Deployment Guide

This guide will help you deploy your Next.js frontend to Railway with a randomly generated domain.

## Prerequisites

1. Railway account (sign up at [railway.app](https://railway.app))
2. Git repository pushed to GitHub, GitLab, or Bitbucket
3. Railway CLI installed (optional but recommended)

## Deployment Steps

### Method 1: Web Dashboard (Recommended for first deployment)

1. **Connect Repository**
   - Go to [railway.app](https://railway.app) and sign in
   - Click "Deploy from GitHub repo"
   - Select your repository: `component_library`
   - Railway will automatically detect it's a Node.js project

2. **Configure Deployment**
   - Railway will automatically use the `railway.toml` configuration
   - The build command will be: `npm run build:frontend`
   - The start command will be: `npm run start:frontend`
   - Port will be automatically detected (3000)

3. **Deploy**
   - Click "Deploy" and Railway will:
     - Install dependencies
     - Build your Next.js application
     - Start the production server
     - Generate a random domain (e.g., `your-app-production-abc123.up.railway.app`)

### Method 2: Railway CLI

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Deploy**
   ```bash
   railway login
   railway init
   railway up
   ```

## Environment Variables

If your application needs environment variables:

1. Go to your Railway project dashboard
2. Click on "Variables" tab
3. Add your environment variables:
   - `NODE_ENV=production`
   - Any API keys or configuration values

## Custom Domain (Optional)

To use a custom domain instead of the generated one:

1. Go to your Railway project dashboard
2. Click on "Domains" tab
3. Click "Custom Domain"
4. Enter your domain and follow DNS setup instructions

## Monitoring

- **Logs**: View real-time logs in Railway dashboard
- **Metrics**: Monitor CPU, memory, and network usage
- **Health checks**: Railway automatically monitors your app's health

## Troubleshooting

- Check the build logs if deployment fails
- Ensure all dependencies are in `package.json`
- Verify the build command works locally
- Check Railway's status page for platform issues

## Generated Domain

After successful deployment, Railway will provide:
- A random generated domain (e.g., `mystifying-flower-production.up.railway.app`)
- HTTPS enabled by default
- Global CDN for fast loading worldwide