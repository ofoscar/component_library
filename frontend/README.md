# Frontend - Component Library

A reusable component library built with Next.js and TypeScript with integrated analytics tracking system.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Component Library](#component-library)
- [Design Tokens](#design-tokens)
- [API Integration](#api-integration)
- [Project Structure](#project-structure)

## 🎯 Overview

This is a production-ready component library that includes:
- 4 core reusable components (Button, Input, Modal, Card)
- Automatic analytics tracking system
- Real-time statistics dashboard
- Authentication system (login/register)
- CSV/JSON data export functionality
- Comprehensive test coverage (>80%)

## ✨ Features

### Components
- **Button**: Primary, secondary, danger variants with loading and disabled states
- **Input**: Text, email, password types with validation states
- **Modal**: Configurable header/body/footer with multiple sizes
- **Card**: Flexible layout with optional header/body/footer

### Analytics
- Automatic tracking of component interactions
- Real-time statistics dashboard
- CSV and JSON export capabilities
- Integration with backend API

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes and features

## 🛠 Tech Stack

- **Framework**: Next.js 16.0.3
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Testing**: Jest + Testing Library
- **Authentication**: JWT
- **API Client**: Fetch API

## 📦 Installation

### Prerequisites
- Node.js >= 20.9.0
- npm >= 10.0.0

### Steps

1. **Install dependencies**:
```bash
npm install
```

2. **Environment Setup**:
Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5100
```

For production, set the appropriate backend URL.

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Opens at [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage
The project maintains >80% code coverage across all components:
- Unit tests for component rendering
- Integration tests for user interactions
- API integration tests for tracking

Coverage reports are generated in `/coverage/lcov-report/index.html`

### Test Examples
```typescript
// Button component tests
- ✓ Renders correctly with different variants
- ✓ Handles click events
- ✓ Shows loading state
- ✓ Disables interactions when disabled

// Integration tests
- ✓ Tracks button clicks to backend
- ✓ Updates statistics in real-time
```

## 🎨 Component Library

### Installation for Developers

To use components in your project:

```typescript
// Import individual components
import { Button, Input, Modal, Card } from '@/app/components';

// Or from UI barrel export
import { Button } from '@/app/components/ui';
```

### Component Examples

#### Button Component
```typescript
import { Button } from '@/app/components/Button';

// Primary button
<Button variant="primary" onClick={handleClick}>
  Click me
</Button>

// Loading state
<Button variant="secondary" loading>
  Loading...
</Button>

// Disabled state
<Button variant="danger" disabled>
  Disabled
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger'
- `loading`: boolean
- `disabled`: boolean
- `onClick`: () => void
- `children`: ReactNode

#### Input Component
```typescript
import { Input } from '@/app/components/Input';

// Text input with label
<Input
  type="text"
  label="Username"
  placeholder="Enter username"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// Email with validation state
<Input
  type="email"
  label="Email"
  validationState="error"
  helperText="Invalid email format"
/>

// Password input
<Input
  type="password"
  label="Password"
  disabled={false}
/>
```

**Props:**
- `type`: 'text' | 'email' | 'password'
- `label`: string
- `placeholder`: string
- `validationState`: 'default' | 'error' | 'success'
- `helperText`: string
- `disabled`: boolean
- `value`: string
- `onChange`: (e: ChangeEvent) => void

#### Modal Component
```typescript
import { Modal } from '@/app/components/ui/Modal';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  size="medium"
  title="Modal Title"
>
  <p>Modal content goes here</p>
</Modal>
```

**Props:**
- `isOpen`: boolean
- `onClose`: () => void
- `size`: 'small' | 'medium' | 'large'
- `title`: string
- `children`: ReactNode

#### Card Component
```typescript
import { Card } from '@/app/components/Card';

<Card
  title="Card Title"
  image="/image.jpg"
  borderStyle="rounded"
>
  <p>Card content</p>
</Card>
```

**Props:**
- `title`: string
- `image`: string (optional)
- `borderStyle`: 'rounded' | 'square' | 'bordered'
- `footer`: ReactNode (optional)
- `children`: ReactNode

## 🎨 Design Tokens

Design tokens are centralized in `/app/tokens/` for consistency across the application.

### Token Categories

**Colors**
```typescript
colors: {
  primary: { main: '#3B82F6', light: '#60A5FA', dark: '#2563EB' },
  secondary: { main: '#6B7280', light: '#9CA3AF', dark: '#4B5563' },
  danger: { main: '#EF4444', light: '#F87171', dark: '#DC2626' },
  success: { main: '#10B981', light: '#34D399', dark: '#059669' },
  // ... more colors
}
```

**Spacing**
```typescript
spacing: {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  // ... more spacing values
}
```

**Typography**
```typescript
typography: {
  fontSize: { sm: '0.875rem', base: '1rem', lg: '1.125rem', ... },
  fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  lineHeight: { tight: 1.25, normal: 1.5, relaxed: 1.75 }
}
```

**Border Radius**
```typescript
borderRadius: {
  none: '0',
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  full: '9999px'
}
```

### Using Design Tokens

```typescript
// Import tokens
import { tokens } from '@/app/tokens';

// Use in components
<div style={{
  backgroundColor: tokens.colors.primary.main,
  padding: tokens.spacing.md,
  borderRadius: tokens.borderRadius.lg
}}>
  Content
</div>
```

Tokens are also available as CSS variables in `/app/tokens/tokens.css`.

## 🔌 API Integration

### Authentication API

**Register**
```typescript
import { register } from '@/app/services/authAPI';

const result = await register(email, password, username);
```

**Login**
```typescript
import { login } from '@/app/services/authAPI';

const { token, user } = await login(email, password);
```

### Tracking API

**Track Component Interaction** (automatic)
```typescript
// Automatically tracked by components
// No manual integration needed
```

**Get Statistics**
```typescript
import { getStats } from '@/app/services/trackingAPI';

const stats = await getStats();
```

**Export Data**
```typescript
import { exportData } from '@/app/services/trackingAPI';

// CSV export
await exportData('csv', token);

// JSON export
await exportData('json', token);
```

## 📁 Project Structure

```
frontend/
├── app/
│   ├── components/          # Reusable components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── ui/             # Barrel exports
│   │   │   └── index.ts
│   │   └── __tests__/      # Component tests
│   ├── services/           # API integrations
│   │   ├── authAPI.ts
│   │   ├── trackingAPI.ts
│   │   └── auth-context.tsx
│   ├── tokens/             # Design system
│   │   ├── index.ts
│   │   ├── tokens.json
│   │   └── theme.ts
│   ├── login/              # Login page
│   ├── register/           # Register page
│   ├── users/              # Users dashboard
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (demo)
│   └── globals.css         # Global styles
├── public/                 # Static assets
├── coverage/               # Test coverage reports
├── jest.config.js          # Jest configuration
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies

```

## 🔐 Environment Variables

Required environment variables:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5100
```

## 📊 Demo Pages

### Component Showcase (`/`)
- Interactive demo of all 4 components
- All variants and states visible
- Real-time tracking demonstration

### Statistics Dashboard (`/`)
- Real-time interaction counters
- Component usage breakdown
- Export functionality (CSV/JSON)

### Authentication (`/login`, `/register`)
- User registration
- User login
- JWT token management

### Users Dashboard (`/users`)
- List of registered users
- User profile details
- Protected route (requires authentication)

## 🚢 Deployment

The application is configured for deployment on Railway/Vercel:

1. Set environment variables in platform dashboard
2. Deploy from GitHub repository
3. Automatic builds on push to main branch

## 📝 Notes for Developers

### Automatic Tracking
All components include automatic analytics tracking. No manual tracking code is needed when using the components.

### TypeScript
All components are fully typed with TypeScript interfaces. Import types as needed:
```typescript
import type { ButtonProps } from '@/app/components/Button';
```

### Accessibility
Components follow accessibility best practices:
- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Focus management

## 📄 License

ISC

## 👥 Authors

T1 Frontend Challenge Project
