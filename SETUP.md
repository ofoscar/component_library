# Next.js App with Node.js Backend & Authentication

A full-stack application with Next.js frontend and Node.js/Express backend featuring JWT-based login functionality.

## Project Structure

```
next-test/
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx          # Login form component
│   │   │   ├── LoginForm.module.css   # Login form styles
│   │   │   ├── UserProfile.tsx        # User profile display
│   │   │   └── UserProfile.module.css # User profile styles
│   │   ├── services/
│   │   │   ├── authAPI.ts             # API client for auth endpoints
│   │   │   └── auth-context.tsx       # React context for auth state
│   │   ├── layout.tsx                 # Root layout with AuthProvider
│   │   ├── page.tsx                   # Home page
│   │   └── globals.css                # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── .env.local                     # Frontend environment variables
│
└── backend/
    ├── src/
    │   ├── index.ts                   # Express server entry point
    │   ├── services/
    │   │   └── authService.ts         # Authentication business logic
    │   ├── middleware/
    │   │   └── auth.ts                # JWT authentication middleware
    │   └── routes/
    │       └── auth.ts                # Authentication API routes
    ├── dist/                          # Compiled JavaScript
    ├── package.json
    ├── tsconfig.json
    ├── .env                           # Backend environment variables
    ├── .env.example                   # Example environment variables
    └── README.md
```

## Getting Started

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the backend server:**
   ```bash
   # Development mode (with hot reload)
   npm run dev
   
   # Or production mode
   npm run build
   npm start
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **In a new terminal, navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

## Features

### Authentication Flow

1. **Registration**: Users can create a new account with email and password
2. **Login**: Users authenticate with email/password to receive JWT token
3. **Protected Routes**: Token is stored in localStorage and sent with API requests
4. **User Profile**: After login, users see their profile with logout option

### API Endpoints

#### POST /api/auth/register
Register a new user
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### POST /api/auth/login
Login user and receive token
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET /api/auth/me
Get current user profile (requires token)

## Test Credentials

Pre-configured test user:
- **Email**: `test@example.com`
- **Password**: `password123`

## Technology Stack

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **React Context** - State management
- **CSS Modules** - Component styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

## Development

### Frontend Development
- Hot reload enabled with `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm start`

### Backend Development
- Hot reload with `npm run dev` (uses ts-node)
- Build TypeScript: `npm run build`
- Output compiled JavaScript to `dist/` folder

## Security Notes

⚠️ **Important for Production**:
1. Change the JWT_SECRET in `.env` to a strong random string
2. Replace in-memory user storage with a proper database
3. Implement proper error handling and validation
4. Use HTTPS in production
5. Set appropriate CORS origins
6. Add rate limiting
7. Implement refresh token rotation

## Troubleshooting

### Backend won't start
- Check if port 5000 is available: `lsof -i :5000`
- Ensure Node.js is installed: `node --version`
- Check .env file exists with JWT_SECRET

### Frontend can't connect to backend
- Verify backend is running on port 5100
- Check NEXT_PUBLIC_API_URL in frontend/.env.local
- Check CORS settings in backend/src/index.ts

### Login fails
- Verify using test credentials: `test@example.com` / `password123`
- Check browser console for detailed error messages
- Ensure JWT_SECRET matches between server and expected tokens

## Next Steps

To extend this application:
1. **Add Database**: Replace in-memory storage with MongoDB/PostgreSQL
2. **Add Refresh Tokens**: Implement token refresh for better security
3. **Add Email Verification**: Send confirmation emails for new registrations
4. **Add Password Reset**: Implement forgot password functionality
5. **Add User Profiles**: Store additional user data
6. **Add Protected Pages**: Create pages that require authentication
7. **Add API Documentation**: Swagger/OpenAPI docs
8. **Add Tests**: Unit and integration tests

