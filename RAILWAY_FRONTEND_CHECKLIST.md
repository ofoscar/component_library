# Railway Frontend Deployment Checklist

## Pre-Deployment Checklist

- [ ] **Repository Setup**
  - [ ] Code pushed to GitHub/GitLab/Bitbucket
  - [ ] All dependencies in `frontend/package.json`
  - [ ] Build scripts working locally (`npm run build`)

- [ ] **Railway Configuration**
  - [ ] `railway.toml` configured
  - [ ] `nixpacks.toml` optimized
  - [ ] Build and start scripts executable (`railway-build.sh`, `railway-start.sh`)

- [ ] **Environment Variables**
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=3000`
  - [ ] `NEXT_PUBLIC_API_URL` (set when backend is ready)
  - [ ] `RAILWAY_ENVIRONMENT=production`
  - [ ] `NEXT_TELEMETRY_DISABLED=1`

## Deployment Steps

1. **Connect to Railway**
   ```bash
   # Using Railway CLI (optional)
   railway login
   railway init
   ```

2. **Deploy via Web Dashboard**
   - Go to [railway.app](https://railway.app)
   - Click "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect the configuration

3. **Monitor Deployment**
   - Watch build logs in Railway dashboard
   - Check for successful build completion
   - Verify frontend is accessible on generated domain

## Post-Deployment Verification

- [ ] **Frontend Access**
  - [ ] Generated domain accessible (https://your-app.up.railway.app)
  - [ ] Pages load correctly
  - [ ] Static assets (CSS, images) load properly
  - [ ] HTTPS working by default

- [ ] **Functionality Check**
  - [ ] Navigation works
  - [ ] Components render properly
  - [ ] Client-side routing functional
  - [ ] Forms and interactions work

- [ ] **Performance**
  - [ ] Page load times acceptable
  - [ ] Build size optimized
  - [ ] No console errors

## Backend Integration (When Ready)

1. **Update Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api
   ```

2. **Test API Connections**
   - [ ] Auth endpoints work
   - [ ] Data fetching successful
   - [ ] Error handling proper

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies installed
   - Review build logs for specific errors

2. **Runtime Errors**
   - Check environment variables
   - Verify port configuration
   - Review application logs

3. **Asset Loading Issues**
   - Check Next.js asset configuration
   - Verify public folder structure
   - Test image optimization settings

### Helpful Commands:

```bash
# Local testing
cd frontend
npm run build
npm start

# Check Railway logs
railway logs

# Check Railway status
railway status
```

## Domain Management

### Generated Domain
- Format: `https://your-app-production-abc123.up.railway.app`
- HTTPS enabled by default
- Global CDN included

### Custom Domain (Optional)
1. Go to Railway project > Domains tab
2. Add custom domain
3. Configure DNS settings as instructed
4. Wait for SSL certificate provisioning

## Monitoring & Maintenance

- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Monitor Railway usage/costs
- [ ] Regular dependency updates
- [ ] Performance monitoring
- [ ] Backup important configurations