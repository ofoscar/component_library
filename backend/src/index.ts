import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import connectDB from './config/database';
import authRoutes from './routes/auth';
import subscribeRoutes from './routes/subscribe';
import trackingRoutes from './routes/tracking';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app: Express = express();
const port = process.env.PORT || 5100;

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      console.log('CORS Origin:', origin);
      console.log('NODE_ENV:', process.env.NODE_ENV);
      console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

      if (process.env.NODE_ENV === 'production') {
        const allowedOrigins = [
          'https://frontend-production-02bd.up.railway.app',
          process.env.FRONTEND_URL,
        ].filter(Boolean);

        console.log('Allowed origins:', allowedOrigins);

        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.log('CORS blocked origin:', origin);
          callback(new Error('Not allowed by CORS'));
        }
      } else {
        // Development - allow localhost origins
        const allowedOrigins = [
          'http://localhost:3000',
          'http://localhost:3001',
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/subscribe', subscribeRoutes);
app.use('/api/tracking', trackingRoutes);

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  },
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
