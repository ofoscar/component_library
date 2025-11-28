import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Simple in-memory user storage (replace with database in production)
interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

const users: Map<string, User> = new Map();

// Initialize with a test user
const testUser: User = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  password: bcrypt.hashSync('password123', 10),
};
users.set(testUser.email, testUser);

export class AuthService {
  static async register(
    email: string,
    password: string,
    name: string,
  ): Promise<User> {
    // Check if user exists
    if (users.has(email)) {
      throw new Error('User already exists');
    }

    // Validate email and password
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name: name || email.split('@')[0],
      password: hashedPassword,
    };

    users.set(email, newUser);
    return newUser;
  }

  static async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: Omit<User, 'password'> }> {
    // Find user
    const user = users.get(email);
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
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' },
    );

    const { password: _, ...userWithoutPassword } = user;
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

  static getUserById(id: string): Omit<User, 'password'> | null {
    for (const user of users.values()) {
      if (user.id === id) {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    }
    return null;
  }
}
