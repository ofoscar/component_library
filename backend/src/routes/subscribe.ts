import express, { Request, Response } from 'express';
import { Subscription } from '../models/Subscription';

const router = express.Router();

// POST /api/subscribe - Subscribe to newsletter
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Validate email is provided
    if (!email) {
      return res.status(400).json({
        error: 'Email is required',
      });
    }

    // Check if email already exists
    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      return res.status(409).json({
        error: 'Email is already subscribed',
        subscribedAt: existingSubscription.subscribedAt,
      });
    }

    // Create new subscription
    const subscription = new Subscription({
      email,
      subscribedAt: new Date(),
    });

    await subscription.save();

    res.status(201).json({
      message: 'Successfully subscribed',
      email: subscription.email,
      subscribedAt: subscription.subscribedAt,
    });
  } catch (error: any) {
    console.error('Subscribe error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Invalid email format',
      });
    }

    res.status(500).json({
      error: 'Failed to subscribe. Please try again.',
    });
  }
});

// GET /api/subscribe/count - Get subscriber count only
router.get('/count', async (req: Request, res: Response) => {
  try {
    const count = await Subscription.countDocuments();

    res.json({
      count,
    });
  } catch (error) {
    console.error('Get subscriber count error:', error);
    res.status(500).json({
      error: 'Failed to retrieve subscriber count',
    });
  }
});

// GET /api/subscribe - Get all subscriptions (for admin purposes)
router.get('/', async (req: Request, res: Response) => {
  try {
    const subscriptions = await Subscription.find()
      .select('email subscribedAt')
      .sort({ subscribedAt: -1 });

    res.json({
      count: subscriptions.length,
      subscriptions,
    });
  } catch (error) {
    console.error('Get subscriptions error:', error);
    res.status(500).json({
      error: 'Failed to retrieve subscriptions',
    });
  }
});

export default router;
