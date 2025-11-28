# Troubleshooting Guide

## Common Issues & Solutions

### Backend Issues

#### ❌ "Port 5000 already in use"
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use a different port in .env
PORT=5001
```

#### ❌ "Cannot find module 'express'" 
```bash
cd backend
npm install
```

#### ❌ "npm ERR! gyp ERR!" (bcryptjs installation)
```bash
# Usually works with:
npm install --no-optional

# If still fails, try:
npm cache clean --force
npm install
```

#### ❌ "JWT_SECRET is undefined"
- Check that `.env` file exists in `/backend`
- Verify JWT_SECRET is set in `.env`
- Restart backend server after modifying `.env`

#### ❌ Backend compiles but won't run
```bash
# Check for TypeScript errors
npm run build

# If dist folder exists, try:
node dist/index.js

# Or just use dev mode:
npm run dev
```

---

### Frontend Issues

#### ❌ "Cannot find module 'authAPI'"
```bash
# Check file path in import statement
# Should be: import { authAPI } from '@/app/services/authAPI';

# Or from a component:
import { useAuth } from '@/app/services/auth-context';

# Verify files exist in app/services/
ls app/services/
```

#### ❌ "useAuth must be used within AuthProvider"
- Make sure the component has `'use client'` directive
- Verify AuthProvider wraps the component in layout.tsx
- Restart dev server after fixing

#### ❌ "CORS error when calling backend"
```
Access to XMLHttpRequest from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Solution:**
1. Verify backend is running on port 5000
2. Check CORS settings in `backend/src/index.ts`
3. Ensure frontend .env.local has correct API URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5100/api
   ```
4. Restart both servers

#### ❌ "Login fails with 'Cannot POST /api/auth/login'"
- Backend server is not running
- Incorrect API_BASE_URL in authAPI.ts
- Check browser Network tab for actual request URL

#### ❌ ".env.local not being read"
```bash
# Build/dev system might cache env
rm -rf .next
npm run dev

# Or just restart dev server
```

---

### Authentication Issues

#### ❌ "Invalid token" error after login
**Likely causes:**
- JWT_SECRET changed between sessions
- Token is expired
- Token was corrupted

**Solutions:**
1. Clear localStorage and try again:
   ```js
   localStorage.clear()
   location.reload()
   ```

2. Restart both backend and frontend:
   ```bash
   # Backend (Ctrl+C then)
   npm run dev
   
   # Frontend (Ctrl+C then)
   npm run dev
   ```

#### ❌ Test account doesn't work
- Email should be: `test@example.com`
- Password should be: `password123`
- Can't login? Restart backend server
- User data is in-memory, resets on restart

#### ❌ "Invalid email or password" but credentials are correct
- Check that backend is using the same JWT_SECRET
- Restart backend (user data might be lost)
- Try registering a new account instead

#### ❌ Token stuck in localStorage after logout
```js
// Manually clear:
localStorage.clear()
localStorage.removeItem('authToken')
localStorage.removeItem('user')

// Then reload page:
location.reload()
```

---

### Development Issues

#### ❌ Changes not showing up
**Frontend:**
```bash
# Hard refresh (Cmd+Shift+R on Mac)
# Or clear Next cache:
rm -rf .next
npm run dev
```

**Backend:**
```bash
# Kill and restart dev server
# Ctrl+C then:
npm run dev
```

#### ❌ TypeScript errors that don't prevent running
```bash
# Try rebuilding
npm run build

# Check tsconfig.json settings
cat tsconfig.json
```

#### ❌ Port conflicts
```bash
# Kill all node processes
killall node

# Or find specific process
lsof -i :3000  # Frontend
lsof -i :5000  # Backend
kill -9 <PID>
```

---

### Data Flow Debugging

#### Check if backend is running:
```bash
curl http://localhost:5000/health
# Should return: {"status":"ok","message":"Backend is running"}
```

#### Check if token is stored:
```js
// In browser console:
localStorage.getItem('authToken')
localStorage.getItem('user')
```

#### Check API request/response:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try login
4. Click the request to `/api/auth/login`
5. Check Request and Response tabs

#### Check JWT token contents:
```js
// In browser console:
const token = localStorage.getItem('authToken')
atob(token.split('.')[1])  // Shows payload
```

---

### Database/Storage Issues

#### ❌ "User not found after registering"
- Backend restarted (in-memory storage lost)
- Register again (or use test account)
- For production, implement database integration

#### ❌ Multiple test users lost
- Normal - in-memory storage is temporary
- Only test user persists across restarts
- Add new users to `authService.ts` if needed

---

### Performance Issues

#### ❌ Slow API responses
1. Check network tab latency
2. Verify backend is running locally (not remote)
3. Check CPU/memory usage
4. Restart both servers

#### ❌ Frontend takes long to build
```bash
# Clear caches
rm -rf .next node_modules/.cache
npm run build
```

---

### Getting Help

#### Collect Debug Info:
1. **Backend logs** - Run `npm run dev` and watch output
2. **Frontend logs** - Check browser console (F12)
3. **Network requests** - DevTools Network tab
4. **Environment** - Verify .env files exist
5. **Versions** - Run `node --version` and `npm --version`

#### Useful Debugging Commands:
```bash
# Check if ports are in use
lsof -i :3000
lsof -i :5000

# Test backend endpoint
curl -X GET http://localhost:5000/health
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Check environment
echo $NODE_ENV
echo $JWT_SECRET

# Backend logs
npm run dev 2>&1 | tee backend.log

# Clear everything and start fresh
rm -rf backend/.env backend/node_modules backend/dist
rm -rf frontend/.next frontend/node_modules
npm install
npm run dev
```

---

## Quick Reset Procedure

If everything is broken, do this:

```bash
# Clean backend
cd backend
rm -rf dist node_modules .env
npm install
cp .env.example .env

# Clean frontend
cd ../frontend
rm -rf .next node_modules
npm install

# Start fresh
cd ../backend
npm run dev

# In new terminal
cd frontend
npm run dev
```

Then visit http://localhost:3000 and try logging in with:
- Email: `test@example.com`
- Password: `password123`

✅ If this works, you're all set!

---

## Still Stuck?

Check these in order:

1. ✅ Both servers running? (`npm run dev` in each directory)
2. ✅ Correct ports? (Frontend: 3000, Backend: 5000)
3. ✅ Can reach backend? (`curl http://localhost:5000/health`)
4. ✅ Test credentials correct? (`test@example.com` / `password123`)
5. ✅ .env files exist? (Backend: `.env`, Frontend: `.env.local`)
6. ✅ No TypeScript errors? (Check console for red errors)
7. ✅ No CORS errors? (Check browser console)
8. ✅ localStorage cleared? (If login still stuck)

If still not working:
- Kill all node processes and restart
- Clear all caches: `.next/`, `node_modules/`, `dist/`
- Verify all files were created (see FILES_CREATED.md)
- Check that `npm install` ran successfully in both dirs
