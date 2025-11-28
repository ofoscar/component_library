import { Response, Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { AuthService } from '../services/authService';

const router = Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await AuthService.register(email, password, name);

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await AuthService.login(email, password);

    res.json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

// Get current user route
router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const user = AuthService.getUserById(req.user!.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
