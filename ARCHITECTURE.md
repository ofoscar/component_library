# Architecture Overview

## Application Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER BROWSER (localhost:3000)                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Next.js Frontend Application                │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │                                                           │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │            app/page.tsx (Home Page)                │ │   │
│  │  │  - Shows LoginForm if not authenticated            │ │   │
│  │  │  - Shows UserProfile if authenticated             │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  │                          ▲ │                             │   │
│  │                          │ │                             │   │
│  │  ┌─────────────────────────┘ │─────────────────────┐   │   │
│  │  │                          ▼                        │   │   │
│  │  │  ┌──────────────────┐     ┌──────────────────┐  │   │   │
│  │  │  │  LoginForm       │     │ UserProfile      │  │   │   │
│  │  │  │  Component       │     │ Component        │  │   │   │
│  │  │  └──────────────────┘     └──────────────────┘  │   │   │
│  │  │           │ calls             │ calls           │   │   │
│  │  │           ▼                   ▼                 │   │   │
│  │  │  ┌───────────────────────────────────┐          │   │   │
│  │  │  │      useAuth() Hook               │          │   │   │
│  │  │  │  (from auth-context.tsx)         │          │   │   │
│  │  │  │  - login()                        │          │   │   │
│  │  │  │  - register()                     │          │   │   │
│  │  │  │  - logout()                       │          │   │   │
│  │  │  │  - user state                     │          │   │   │
│  │  │  │  - token state                    │          │   │   │
│  │  │  └───────────────────────────────────┘          │   │   │
│  │  │           │ calls                               │   │   │
│  │  │           ▼                                      │   │   │
│  │  │  ┌───────────────────────────────────┐          │   │   │
│  │  │  │    authAPI.ts (HTTP Client)       │          │   │   │
│  │  │  │  - register()                     │          │   │   │
│  │  │  │  - login()                        │          │   │   │
│  │  │  │  - getCurrentUser()               │          │   │   │
│  │  │  │  - logout()                       │          │   │   │
│  │  │  └───────────────────────────────────┘          │   │   │
│  │  │           │ sends HTTP requests                 │   │   │
│  │  │           │ (Bearer token in headers)           │   │   │
│  │  └───────────┼──────────────────────────────────────┘   │   │
│  │              │                                           │   │
│  └──────────────┼───────────────────────────────────────────┘   │
│                 │                                                 │
│  ┌──────────────┼─────────────────────────────────────────────┐  │
│  │              │        AuthProvider (Layout)             │  │  │
│  │              │  - Manages auth state (Context)          │  │  │
│  │              │  - Persists token to localStorage        │  │  │
│  │              └─────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP Requests
                             │ (JSON + JWT Bearer Token)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Express Backend (localhost:5000)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Express Server (index.ts)                   │   │
│  │  - CORS middleware enabled                              │   │
│  │  - JSON body parser                                     │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │  GET /health                                             │   │
│  │  - Returns server status                                │   │
│  │                                                           │   │
│  │  ┌────────────────────────────────────────────────────┐ │   │
│  │  │           /api/auth Routes                        │ │   │
│  │  ├────────────────────────────────────────────────────┤ │   │
│  │  │                                                    │ │   │
│  │  │  POST /register                                   │ │   │
│  │  │  ├─ Validate email/password                       │ │   │
│  │  │  ├─ Hash password with bcryptjs                   │ │   │
│  │  │  ├─ Store user                                    │ │   │
│  │  │  └─ Return user object                            │ │   │
│  │  │                                                    │ │   │
│  │  │  POST /login                                      │ │   │
│  │  │  ├─ Find user by email                            │ │   │
│  │  │  ├─ Verify password with bcryptjs                 │ │   │
│  │  │  ├─ Generate JWT token                            │ │   │
│  │  │  └─ Return token + user                           │ │   │
│  │  │                                                    │ │   │
│  │  │  GET /me (Protected)                              │ │   │
│  │  │  ├─ authMiddleware (verify JWT)                   │ │   │
│  │  │  ├─ Extract user ID from token                    │ │   │
│  │  │  └─ Return user profile                           │ │   │
│  │  │                                                    │ │   │
│  │  └────────────────────────────────────────────────────┘ │   │
│  │                                                           │   │
│  │  ┌────────────────────────────────────────────────────┐ │   │
│  │  │      Authentication Services                      │ │   │
│  │  ├────────────────────────────────────────────────────┤ │   │
│  │  │                                                    │ │   │
│  │  │  AuthService (authService.ts)                     │ │   │
│  │  │  ├─ register()                                    │ │   │
│  │  │  ├─ login()                                       │ │   │
│  │  │  ├─ verifyToken()                                 │ │   │
│  │  │  └─ getUserById()                                 │ │   │
│  │  │                                                    │ │   │
│  │  │  In-Memory User Storage                           │ │   │
│  │  │  └─ Map<email, User>                              │ │   │
│  │  │     ├─ Pre-loaded with test user                  │ │   │
│  │  │     └─ (Replace with DB in production)            │ │   │
│  │  │                                                    │ │   │
│  │  └────────────────────────────────────────────────────┘ │   │
│  │                                                           │   │
│  │  ┌────────────────────────────────────────────────────┐ │   │
│  │  │      Middleware                                   │ │   │
│  │  ├────────────────────────────────────────────────────┤ │   │
│  │  │                                                    │ │   │
│  │  │  authMiddleware (auth.ts)                         │ │   │
│  │  │  ├─ Extract Bearer token from header              │ │   │
│  │  │  ├─ Verify JWT signature & expiry                 │ │   │
│  │  │  ├─ Attach user to request                        │ │   │
│  │  │  └─ Pass to next handler                          │ │   │
│  │  │                                                    │ │   │
│  │  └────────────────────────────────────────────────────┘ │   │
│  │                                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Login Flow

```
1. User enters credentials in LoginForm
   ↓
2. LoginForm calls useAuth().login(email, password)
   ↓
3. authAPI.login() sends POST to /api/auth/login
   ↓
4. Backend validates credentials against stored users
   ↓
5. Backend generates JWT token + returns user object
   ↓
6. Frontend receives response
   ↓
7. AuthContext stores token in localStorage
   ↓
8. AuthContext updates user state
   ↓
9. Components re-render based on isAuthenticated state
   ↓
10. User sees UserProfile component instead of LoginForm
```

### Protected Request Flow

```
1. Component needs protected data
   ↓
2. Component calls API with useAuth().token
   ↓
3. authAPI adds "Authorization: Bearer <token>" header
   ↓
4. Request sent to backend
   ↓
5. authMiddleware extracts token from header
   ↓
6. authMiddleware verifies JWT signature
   ↓
7. authMiddleware extracts user ID from token payload
   ↓
8. authMiddleware attaches user to request object
   ↓
9. Route handler processes authenticated request
   ↓
10. Response returned to frontend
```

## Technology Stack

### Frontend (Next.js)
```
┌─ React 19
├─ Next.js 16
├─ TypeScript
├─ React Context API (State Management)
├─ Fetch API (HTTP)
├─ localStorage (Token Storage)
└─ CSS Modules (Styling)
```

### Backend (Node.js)
```
┌─ Node.js Runtime
├─ Express.js Framework
├─ TypeScript
├─ JWT (jsonwebtoken)
├─ bcryptjs (Hashing)
├─ CORS Middleware
└─ In-Memory Storage (User Data)
```

## Security Flow

```
User Password                JWT Token
      ↓                          ↓
   Input Form          ┌─────────┴─────────┐
      ↓                │                   │
   HTTPS POST          │ Header            │
      ↓                │ Authorization:    │
   Server Received     │ Bearer <token>    │
      ↓                │                   │
   bcryptjs.compare()  └─────────┬─────────┘
      ↓                          ↓
   Match? ✓                  jwt.verify()
      ↓                          ↓
   Generate Token           Check Signature
      ↓                          ↓
   Sign with Secret         Check Expiry
      ↓                          ↓
   Return Token ✓           Extract User ID ✓
                                 ↓
                            Allow Request
```

## State Management (Frontend)

```
AuthContext
│
├─ user: User | null
│  └─ { id, email, name }
│
├─ token: string | null
│  └─ JWT token from backend
│
├─ isAuthenticated: boolean
│  └─ !!token
│
├─ isLoading: boolean
│  └─ During API calls
│
├─ error: string | null
│  └─ Error message if any
│
├─ Methods:
│  ├─ login(email, password)
│  ├─ register(email, password, name)
│  ├─ logout()
│  └─ auto-load from localStorage on mount
│
└─ Persists to localStorage:
   ├─ authToken
   └─ user
```

## Component Hierarchy

```
app/layout.tsx (Root)
│
├─ AuthProvider (Context)
│  │
│  └─ children (all pages)
│     │
│     └─ app/page.tsx (Home)
│        │
│        ├─ (Not Authenticated)
│        │  └─ LoginForm
│        │     ├─ input[email]
│        │     ├─ input[password]
│        │     └─ button[submit]
│        │
│        └─ (Authenticated)
│           └─ UserProfile
│              ├─ p[name]
│              ├─ p[email]
│              └─ button[logout]
│
└─ Other pages/routes
   ├─ app/users/page.tsx
   └─ app/users/[id]/page.tsx
```
