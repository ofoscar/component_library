# Backend API - Component Library Analytics

Express.js backend server with MongoDB for component library analytics tracking and user authentication.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)

## 🎯 Overview

This backend API provides:
- User authentication with JWT tokens
- Component usage tracking
- Real-time analytics and statistics
- Data export functionality (CSV/JSON)
- MongoDB database integration
- CORS support for frontend integration

## ✨ Features

- **Authentication**: JWT-based user registration and login
- **Tracking**: Automatic logging of component interactions
- **Analytics**: Real-time statistics and usage metrics
- **Export**: CSV and JSON data export (protected)
- **Validation**: Input validation middleware
- **Error Handling**: Comprehensive error responses
- **Security**: Password hashing with bcrypt
- **CORS**: Configured for cross-origin requests

## 🛠 Tech Stack

- **Runtime**: Node.js 20.x
- **Framework**: Express.js 4.x
- **Database**: MongoDB (Atlas)
- **ODM**: Mongoose 9.x
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Language**: TypeScript 5.x

## 📦 Installation

### Prerequisites
- Node.js >= 20.9.0
- npm >= 10.0.0
- MongoDB Atlas account (free tier)

### Steps

1. **Install dependencies**:
```bash
npm install
```

2. **Environment Setup**:
Create a `.env` file in the backend directory (see [Environment Variables](#environment-variables) section)

3. **Build TypeScript**:
```bash
npm run build
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Server runs on [http://localhost:5100](http://localhost:5100)

### Production Mode
```bash
npm run build
npm start
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with ts-node |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production server |
| `npm run watch` | Watch TypeScript files for changes |

## 📚 API Documentation

Base URL: `http://localhost:5100` (development)

### Health Check

#### GET `/health`
Check if the server is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "username": "johndoe"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "userId": "507f1f77bcf86cd799439011"
}
```

**Errors:**
- `400`: Missing required fields or user already exists
- `500`: Server error

---

#### POST `/api/auth/login`
Authenticate a user and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "username": "johndoe"
  }
}
```

**Errors:**
- `400`: Missing credentials
- `401`: Invalid credentials
- `500`: Server error

### Tracking Endpoints

#### POST `/api/components/track`
Track a component interaction (public endpoint).

**Request Body:**
```json
{
  "componentName": "Button",
  "variant": "primary",
  "action": "click"
}
```

**Response (201):**
```json
{
  "message": "Interaction tracked",
  "id": "507f1f77bcf86cd799439011"
}
```

**Errors:**
- `400`: Missing required fields
- `500`: Server error

---

#### GET `/api/components/stats`
Get component usage statistics (public endpoint).

**Query Parameters:**
- `componentName` (optional): Filter by component name

**Response (200):**
```json
{
  "totalClicks": 1523,
  "componentBreakdown": {
    "Button": 845,
    "Input": 432,
    "Modal": 156,
    "Card": 90
  },
  "variantBreakdown": {
    "primary": 523,
    "secondary": 412,
    "danger": 110
  },
  "recentInteractions": [
    {
      "componentName": "Button",
      "variant": "primary",
      "action": "click",
      "timestamp": "2025-11-29T10:30:00.000Z"
    }
  ]
}
```

---

#### GET `/api/components/export`
Export tracking data in CSV or JSON format (protected - requires authentication).

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
- `format`: 'csv' | 'json' (required)

**Response (200) - CSV:**
```csv
componentName,variant,action,timestamp
Button,primary,click,2025-11-29T10:30:00.000Z
Input,text,focus,2025-11-29T10:31:00.000Z
```

**Response (200) - JSON:**
```json
[
  {
    "componentName": "Button",
    "variant": "primary",
    "action": "click",
    "timestamp": "2025-11-29T10:30:00.000Z"
  }
]
```

**Errors:**
- `401`: Missing or invalid token
- `400`: Invalid format parameter
- `500`: Server error

### Subscription Endpoint

#### POST `/api/subscribe`
Subscribe a user to newsletter (public endpoint).

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (201):**
```json
{
  "message": "Subscription successful",
  "email": "user@example.com"
}
```

## 🗄 Database Schema

### User Model
```typescript
{
  email: String (required, unique),
  password: String (required, hashed),
  username: String (required),
  createdAt: Date (auto)
}
```

### ButtonClick Model
```typescript
{
  componentName: String (required),
  variant: String (optional),
  action: String (required),
  timestamp: Date (default: now),
  userId: String (optional)
}
```

### Subscription Model
```typescript
{
  email: String (required, unique),
  subscribedAt: Date (default: now),
  active: Boolean (default: true)
}
```

## 🔐 Authentication

### JWT Token
- Tokens are signed with `JWT_SECRET` from environment variables
- Tokens expire after 24 hours
- Include token in Authorization header: `Bearer <token>`

### Protected Routes
- `/api/components/export` - Requires valid JWT token

### Middleware
Authentication is handled by the `authMiddleware` which:
1. Extracts token from Authorization header
2. Verifies token signature
3. Attaches user data to request object
4. Passes to next middleware or returns 401

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5100
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get connection string and add to `MONGODB_URI`

**Example `.env.example` file is provided in the repository.**

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts       # MongoDB connection
│   ├── middleware/
│   │   └── auth.ts           # JWT authentication middleware
│   ├── models/
│   │   ├── User.ts           # User schema
│   │   ├── ButtonClick.ts    # Tracking schema
│   │   └── Subscription.ts   # Subscription schema
│   ├── routes/
│   │   ├── auth.ts           # Authentication endpoints
│   │   ├── tracking.ts       # Tracking endpoints
│   │   └── subscribe.ts      # Subscription endpoints
│   ├── services/
│   │   └── authService.ts    # Auth business logic
│   └── index.ts              # Express app entry point
├── dist/                     # Compiled JavaScript (generated)
├── .env                      # Environment variables (gitignored)
├── .env.example             # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

## 🔍 Logging

The server includes basic logging for:
- CORS origin requests
- Database connection status
- API request errors
- Authentication attempts

Logs are output to console in development mode.

## 🚨 Error Handling

All endpoints include error handling with appropriate HTTP status codes:

- `200`: Success
- `201`: Resource created
- `400`: Bad request (validation errors)
- `401`: Unauthorized (auth errors)
- `404`: Not found
- `500`: Internal server error

Error responses follow this format:
```json
{
  "error": "Error message description"
}
```

## 🧪 Testing the API

### Using cURL

**Register a user:**
```bash
curl -X POST http://localhost:5100/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","username":"testuser"}'
```

**Login:**
```bash
curl -X POST http://localhost:5100/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Track interaction:**
```bash
curl -X POST http://localhost:5100/api/components/track \
  -H "Content-Type: application/json" \
  -d '{"componentName":"Button","variant":"primary","action":"click"}'
```

**Get stats:**
```bash
curl http://localhost:5100/api/components/stats
```

**Export data (requires token):**
```bash
curl http://localhost:5100/api/components/export?format=json \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🚢 Deployment

The backend is configured for deployment on Railway:

1. Connect GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Railway will automatically build and deploy

**Environment variables to set in production:**
- `MONGODB_URI`
- `JWT_SECRET`
- `FRONTEND_URL`
- `NODE_ENV=production`

## 📝 Security Notes

- Always use strong `JWT_SECRET` in production
- Never commit `.env` file to version control
- Use HTTPS in production
- Implement rate limiting for production
- Regularly update dependencies
- Use strong passwords for MongoDB users
- Whitelist specific IPs in MongoDB Atlas for production

## 📄 License

ISC

## 👥 Authors

T1 Frontend Challenge Project
