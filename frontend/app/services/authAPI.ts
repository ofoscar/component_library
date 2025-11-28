const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
}

class AuthAPI {
  private getAuthHeader(): Record<string, string> {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }

    return response.json();
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return response.json();
  }

  async getCurrentUser(): Promise<{ user: User }> {
    const authHeader = this.getAuthHeader();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (authHeader.Authorization) {
      headers.Authorization = authHeader.Authorization;
    }
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch user');
    }

    return response.json();
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }
}

export const authAPI = new AuthAPI();
