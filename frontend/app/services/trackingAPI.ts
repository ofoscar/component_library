const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100/api';

export interface ButtonClickRequest {
  buttonId: string;
  buttonText: string;
  sessionId: string;
  metadata?: {
    variant?: string;
    size?: string;
    page?: string;
    [key: string]: any;
  };
}

export interface ButtonClickResponse {
  message: string;
  clickId: string;
  timestamp: string;
}

export interface TrackingStats {
  totalCount: number;
  recentClicks: Array<{
    buttonId: string;
    buttonText: string;
    timestamp: string;
    metadata: {
      variant?: string;
      size?: string;
    };
  }>;
  clickCounts: Array<{
    _id: {
      buttonId: string;
      buttonText: string;
    };
    count: number;
    lastClicked: string;
  }>;
  hourlyStats: Array<{
    _id: {
      hour: number;
      date: string;
    };
    count: number;
  }>;
}

class TrackingAPI {
  // Generate or retrieve session ID
  private getSessionId(): string {
    if (typeof window === 'undefined') return 'server-side';

    let sessionId = sessionStorage.getItem('tracking-session-id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      sessionStorage.setItem('tracking-session-id', sessionId);
    }
    return sessionId;
  }

  // Track button click
  async trackButtonClick(
    data: Omit<ButtonClickRequest, 'sessionId'>,
  ): Promise<ButtonClickResponse> {
    const sessionId = this.getSessionId();

    const requestData: ButtonClickRequest = {
      ...data,
      sessionId,
      metadata: {
        ...data.metadata,
        page:
          typeof window !== 'undefined' ? window.location.pathname : '/unknown',
      },
    };

    const response = await fetch(`${API_BASE_URL}/components/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to track button click');
    }

    return response.json();
  }

  // Get tracking statistics
  async getTrackingStats(buttonId?: string): Promise<TrackingStats> {
    const params = new URLSearchParams();
    if (buttonId) params.set('buttonId', buttonId);

    const url = `${API_BASE_URL}/components/stats${
      params.toString() ? `?${params}` : ''
    }`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch tracking stats');
    }

    return response.json();
  }

  // Export tracking data (requires authentication)
  async exportTrackingData(
    format: 'json' | 'csv' = 'json',
    token?: string,
  ): Promise<Blob | any> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const params = new URLSearchParams({ format });
    const response = await fetch(
      `${API_BASE_URL}/components/export?${params}`,
      {
        method: 'GET',
        headers,
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to export tracking data');
    }

    if (format === 'csv') {
      return response.blob();
    }

    return response.json();
  }
}

export const trackingAPI = new TrackingAPI();
