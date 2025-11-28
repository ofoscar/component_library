# Backend Server

A Node.js/Express backend with JWT-based authentication for the Next.js frontend.

## Features

- User registration and login
- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware
- CORS enabled for frontend communication
- In-memory user storage (can be replaced with a database)

## Setup

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update the `.env` file with your settings:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

## Running the Server

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response:
{
  "message": "User registered successfully",
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

## Test Credentials

A test user is pre-configured:
- Email: `test@example.com`
- Password: `password123`

## Project Structure

```
backend/
├── src/
│   ├── index.ts              # Main server file
│   ├── services/
│   │   └── authService.ts    # Authentication logic
│   ├── middleware/
│   │   └── auth.ts           # JWT authentication middleware
│   └── routes/
│       └── auth.ts           # Authentication endpoints
├── package.json
├── tsconfig.json
├── .env.example
└── .gitignore
```

## Notes

- This backend uses in-memory storage for users. For production, integrate a database like MongoDB or PostgreSQL.
- The JWT secret should be changed in production and stored securely.
- CORS is configured to allow requests from `http://localhost:3000` and `http://localhost:3001` in development.
