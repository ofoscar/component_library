import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../models/User';

export class AuthService {
  static async register(
    email: string,
    password: string,
    name: string,
  ): Promise<IUser> {
    // Validate email and password
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      name: name || email.split('@')[0],
      password: hashedPassword,
    });

    await newUser.save();
    return newUser;
  }

  static async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: any }> {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' },
    );

    const userObject = user.toObject();
    const { password: _, ...userWithoutPassword } = userObject;
    return { token, user: userWithoutPassword };
  }

  static verifyToken(token: string): { id: string; email: string } {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your_secret_key',
      );
      return decoded as { id: string; email: string };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static async getUserById(id: string): Promise<any | null> {
    const user = await User.findById(id).select('-password');
    return user;
  }
}
