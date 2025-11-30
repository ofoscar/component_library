Demo https://frontend-production-02bd.up.railway.app/

# Component Library - Reusable UI Components with Analytics

A production-ready component library built with Next.js, TypeScript, and Express.js featuring automatic analytics tracking, real-time statistics, and comprehensive testing.

## 🎯 Project Overview

This monorepo contains a complete component library solution with:
- **Frontend**: 4 reusable UI components (Button, Input, Modal, Card) with integrated tracking
- **Backend**: Express.js API with MongoDB for analytics and authentication
- **Testing**: >80% code coverage with Jest and Testing Library
- **Design System**: Centralized design tokens for consistent styling
- **Analytics**: Real-time component usage tracking and data export

## ✨ Key Features

### Component Library
- ✅ **4 Core Components**: Button, Input, Modal, Card
- ✅ **Multiple Variants**: Primary, secondary, danger, etc.
- ✅ **State Management**: Loading, disabled, validation states
- ✅ **TypeScript**: Fully typed interfaces
- ✅ **Responsive**: Mobile-first design
- ✅ **Accessible**: ARIA labels and keyboard navigation

### Analytics System
- ✅ **Automatic Tracking**: Transparent component interaction logging
- ✅ **Real-time Dashboard**: Live statistics and metrics
- ✅ **Data Export**: CSV and JSON download capabilities
- ✅ **Protected Routes**: JWT-based authentication

### Testing & Quality
- ✅ **Unit Tests**: All components tested
- ✅ **Integration Tests**: Tracking system verified
- ✅ **80%+ Coverage**: Comprehensive test suite
- ✅ **TypeScript**: Full type safety

## 🚀 Quick Start

### Prerequisites
- Node.js >= 20.9.0
- npm >= 10.0.0
- MongoDB Atlas account (free tier)

### Installation & Setup

1. **Clone the repository**:
```bash
git clone https://github.com/ofoscar/component_library.git
cd component_library
```

2. **Install dependencies**:
```bash
# Install all dependencies (frontend + backend)
npm run install:frontend
npm run install:backend
```

3. **Configure environment variables**:

**Backend** - Create `/backend/.env`:
```env
PORT=5100
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/component_library?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this
FRONTEND_URL=http://localhost:3000
```

**Frontend** - Create `/frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5100
```

4. **Build the projects**:
```bash
# Build backend
npm run build:backend

# Build frontend
npm run build:frontend
```

5. **Start development servers**:

**Terminal 1 - Backend**:
```bash
cd backend
npm run dev
```
Server starts at http://localhost:5100

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
```
Application opens at http://localhost:3000

## 📦 Project Structure

```
component_library/
├── frontend/                 # Next.js application
│   ├── app/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ui/         # Barrel exports
│   │   │   └── __tests__/  # Component tests
│   │   ├── services/       # API integration
│   │   ├── tokens/         # Design system tokens
│   │   ├── login/          # Authentication pages
│   │   ├── register/
│   │   └── users/
│   ├── coverage/           # Test coverage reports
│   └── README.md           # Frontend documentation
│
├── backend/                # Express.js API
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── middleware/    # Auth middleware
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # API endpoints
│   │   ├── services/      # Business logic
│   │   └── index.ts       # Server entry point
│   └── README.md          # Backend documentation
│
├── package.json           # Monorepo scripts
└── README.md             # This file
```

## 🧪 Running Tests

### Frontend Tests
```bash
cd frontend

# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Results
- ✅ Button component: 5 tests passing
- ✅ Input component: 5 tests passing
- ✅ Modal component: 6 tests passing
- ✅ Card component: 4 tests passing
- ✅ Integration tests: 2 tests passing
- ✅ **Coverage**: >80% across all components

## 📚 Documentation

Each package has detailed documentation:

- **[Frontend README](./frontend/README.md)**: Component usage, API integration, testing
- **[Backend README](./backend/README.md)**: API endpoints, database schema, authentication

## 🎨 Component Examples

### Button Component
```typescript
import { Button } from '@/app/components/Button';

<Button variant="primary" onClick={handleClick}>
  Click me
</Button>
```

### Input Component
```typescript
import { Input } from '@/app/components/Input';

<Input
  type="email"
  label="Email"
  validationState="error"
  helperText="Invalid email"
/>
```

### Modal Component
```typescript
import { Modal } from '@/app/components/ui/Modal';

<Modal isOpen={isOpen} onClose={handleClose} size="medium">
  <p>Modal content</p>
</Modal>
```

### Card Component
```typescript
import { Card } from '@/app/components/Card';

<Card title="Card Title" borderStyle="rounded">
  <p>Card content</p>
</Card>
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Tracking (Public)
- `POST /api/components/track` - Track component interaction
- `GET /api/components/stats` - Get usage statistics

### Export (Protected)
- `GET /api/components/export?format=csv` - Export as CSV
- `GET /api/components/export?format=json` - Export as JSON

### Health
- `GET /health` - Server health check

See [Backend README](./backend/README.md) for complete API documentation with examples.

## 🎨 Design System

Design tokens are centralized in `/frontend/app/tokens/`:

- **Colors**: Primary, secondary, danger, success, etc.
- **Spacing**: xs, sm, md, lg, xl
- **Typography**: Font sizes, weights, line heights
- **Border Radius**: Rounded corners and shapes

All tokens are available as:
- TypeScript objects
- CSS variables
- JSON configuration

## 🚢 Deployment

### Frontend (Vercel/Railway)
```bash
npm run build:frontend
npm run start:frontend
```

### Backend (Railway)
```bash
npm run build:backend
npm run start:backend
```

### Environment Variables
Set these in your deployment platform:
- `MONGODB_URI`
- `JWT_SECRET`
- `FRONTEND_URL`
- `NEXT_PUBLIC_API_URL`

## 🛠 Available Scripts

### Monorepo Commands
```bash
npm run install:frontend    # Install frontend dependencies
npm run install:backend     # Install backend dependencies
npm run build:frontend      # Build frontend
npm run build:backend       # Build backend
npm run start:frontend      # Start frontend production server
npm run start:backend       # Start backend production server
```

### Development Commands
```bash
cd frontend && npm run dev  # Frontend dev server
cd backend && npm run dev   # Backend dev server
```

## 📊 Demo Application

Visit http://localhost:3000 after starting both servers to see:

1. **Component Showcase**: All 4 components with variants
2. **Real-time Analytics**: Live tracking dashboard
3. **Statistics**: Component usage breakdown
4. **Export Tools**: CSV/JSON data download
5. **Authentication**: Login/Register functionality
6. **User Dashboard**: Protected user list page

## 🔐 Security Features

- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ CORS configuration
- ✅ Environment variable security
- ✅ MongoDB connection security

## 🗄️ Database

**MongoDB Atlas** (Free Tier)
- Cluster configured with public access
- Collections: Users, ButtonClicks, Subscriptions
- Credentials included in `.env.example`

## 📝 Technical Requirements Met

### Frontend ✅
- [x] TypeScript with complete interfaces
- [x] Responsive design (mobile-first)
- [x] 4 components with all required variants
- [x] Unit tests (>80% coverage)
- [x] Integration tests for tracking
- [x] Centralized exports (index.ts)
- [x] Design tokens system
- [x] Complete documentation

### Backend ✅
- [x] All required endpoints
- [x] JWT authentication
- [x] MongoDB integration
- [x] Data validation middleware
- [x] Error handling
- [x] Environment variables
- [x] API documentation
- [x] Logging system

### Integration ✅
- [x] Automatic component tracking
- [x] Real-time statistics dashboard
- [x] CSV/JSON export
- [x] Authentication flow
- [x] Demo page with all features

## 🤝 Contributing

This is a technical challenge project. For any questions or issues:
- Check the frontend and backend README files
- Review the component documentation
- Test the API endpoints using the provided examples

## 📄 License

ISC

## 👥 Author

**Oscar Ramirez**
- GitHub: [@ofoscar](https://github.com/ofoscar)
- Project: T1 Frontend Challenge

---

**Built with ❤️ for T1 Páginas**


