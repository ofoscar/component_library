const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100/api';

export interface SubscribeRequest {
  email: string;
}

export interface SubscribeResponse {
  message: string;
  email: string;
  subscribedAt: string;
}

export interface SubscribeError {
  error: string;
  subscribedAt?: string;
}

class SubscribeAPI {
  async subscribe(data: SubscribeRequest): Promise<SubscribeResponse> {
    const response = await fetch(`${API_BASE_URL}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: SubscribeError = await response.json();
      throw new Error(error.error || 'Subscription failed');
    }

    return response.json();
  }

  async getSubscriptions(): Promise<{
    count: number;
    subscriptions: Array<{ email: string; subscribedAt: string }>;
  }> {
    const response = await fetch(`${API_BASE_URL}/subscribe`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch subscriptions');
    }

    return response.json();
  }

  async getSubscriberCount(): Promise<{ count: number }> {
    const response = await fetch(`${API_BASE_URL}/subscribe/count`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch subscriber count');
    }

    return response.json();
  }
}

export const subscribeAPI = new SubscribeAPI();
