import {
  ButtonClickResponse,
  trackingAPI,
  TrackingStats,
} from '../../services/trackingAPI';

// Mock fetch globally
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('Tracking System Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear sessionStorage
    sessionStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test 1: Session Management
  describe('Session Management', () => {
    it('generates a new session ID if none exists', async () => {
      const mockResponse: ButtonClickResponse = {
        message: 'Click tracked successfully',
        clickId: 'click_123',
        timestamp: new Date().toISOString(),
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await trackingAPI.trackButtonClick({
        buttonId: 'test-button',
        buttonText: 'Test Button',
      });

      // Verify session ID was stored
      const sessionId = sessionStorage.getItem('tracking-session-id');
      expect(sessionId).toBeTruthy();
      expect(sessionId).toMatch(/^session_\d+_/);
    });

    it('reuses existing session ID for subsequent calls', async () => {
      const mockResponse: ButtonClickResponse = {
        message: 'Click tracked',
        clickId: 'click_456',
        timestamp: new Date().toISOString(),
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      // First call
      await trackingAPI.trackButtonClick({
        buttonId: 'button-1',
        buttonText: 'Button 1',
      });
      const firstSessionId = sessionStorage.getItem('tracking-session-id');

      // Second call
      await trackingAPI.trackButtonClick({
        buttonId: 'button-2',
        buttonText: 'Button 2',
      });
      const secondSessionId = sessionStorage.getItem('tracking-session-id');

      expect(firstSessionId).toBe(secondSessionId);
    });

    it('includes session ID in tracking request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: 'success',
          clickId: '123',
          timestamp: '',
        }),
      } as Response);

      await trackingAPI.trackButtonClick({
        buttonId: 'test-button',
        buttonText: 'Test',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('session_'),
        }),
      );
    });
  });

  // Test 2: Button Click Tracking
  describe('Button Click Tracking', () => {
    it('successfully tracks a button click', async () => {
      const mockResponse: ButtonClickResponse = {
        message: 'Click tracked successfully',
        clickId: 'click_789',
        timestamp: '2024-01-01T12:00:00Z',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await trackingAPI.trackButtonClick({
        buttonId: 'submit-btn',
        buttonText: 'Submit',
        metadata: {
          variant: 'primary',
          size: 'md',
        },
      });

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/tracking/button-click'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    });

    it('includes metadata in tracking request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: 'success',
          clickId: '123',
          timestamp: '',
        }),
      } as Response);

      await trackingAPI.trackButtonClick({
        buttonId: 'test-btn',
        buttonText: 'Test',
        metadata: {
          variant: 'danger',
          size: 'lg',
          customField: 'customValue',
        },
      });

      const callBody = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      expect(callBody.metadata).toMatchObject({
        variant: 'danger',
        size: 'lg',
        customField: 'customValue',
      });
    });

    it('includes current page in metadata', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: 'success',
          clickId: '123',
          timestamp: '',
        }),
      } as Response);

      await trackingAPI.trackButtonClick({
        buttonId: 'test-btn',
        buttonText: 'Test',
      });

      const callBody = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      expect(callBody.metadata.page).toBeDefined();
      expect(typeof callBody.metadata.page).toBe('string');
    });

    it('handles tracking errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Tracking failed' }),
      } as Response);

      await expect(
        trackingAPI.trackButtonClick({
          buttonId: 'error-btn',
          buttonText: 'Error',
        }),
      ).rejects.toThrow('Tracking failed');
    });
  });

  // Test 3: Statistics Retrieval
  describe('Statistics Retrieval', () => {
    it('fetches tracking statistics successfully', async () => {
      const mockStats: TrackingStats = {
        totalCount: 100,
        recentClicks: [
          {
            buttonId: 'btn-1',
            buttonText: 'Button 1',
            timestamp: '2024-01-01T12:00:00Z',
            metadata: { variant: 'primary' },
          },
        ],
        clickCounts: [
          {
            _id: { buttonId: 'btn-1', buttonText: 'Button 1' },
            count: 50,
            lastClicked: '2024-01-01T12:00:00Z',
          },
        ],
        hourlyStats: [
          {
            _id: { hour: 12, date: '2024-01-01' },
            count: 10,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      } as Response);

      const result = await trackingAPI.getTrackingStats();

      expect(result).toEqual(mockStats);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/tracking/stats'),
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    });

    it('fetches statistics for specific button', async () => {
      const mockStats: TrackingStats = {
        totalCount: 25,
        recentClicks: [],
        clickCounts: [],
        hourlyStats: [],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      } as Response);

      await trackingAPI.getTrackingStats('specific-button');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('buttonId=specific-button'),
        expect.any(Object),
      );
    });

    it('handles statistics fetch errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Failed to fetch stats' }),
      } as Response);

      await expect(trackingAPI.getTrackingStats()).rejects.toThrow(
        'Failed to fetch stats',
      );
    });
  });

  // Test 4: Data Export
  describe('Data Export', () => {
    it('exports data in JSON format', async () => {
      const mockData = [
        { buttonId: 'btn-1', buttonText: 'Button 1', count: 10 },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await trackingAPI.exportTrackingData('json');

      expect(result).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/tracking/export?format=json'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        }),
      );
    });

    it('exports data in CSV format', async () => {
      const mockBlob = new Blob(['csv,data'], { type: 'text/csv' });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        blob: async () => mockBlob,
      } as Response);

      const result = await trackingAPI.exportTrackingData('csv');

      expect(result).toBeInstanceOf(Blob);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/tracking/export?format=csv'),
        expect.any(Object),
      );
    });

    it('includes authentication token when provided', async () => {
      const mockToken = 'test-jwt-token';

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      } as Response);

      await trackingAPI.exportTrackingData('json', mockToken);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockToken}`,
          }),
        }),
      );
    });

    it('handles export errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Unauthorized' }),
      } as Response);

      await expect(trackingAPI.exportTrackingData('json')).rejects.toThrow(
        'Unauthorized',
      );
    });
  });

  // Test 5: API Configuration
  describe('API Configuration', () => {
    it('uses configured API URL', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: 'success',
          clickId: '123',
          timestamp: '',
        }),
      } as Response);

      await trackingAPI.trackButtonClick({
        buttonId: 'test',
        buttonText: 'Test',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/tracking/button-click'),
        expect.any(Object),
      );
    });
  });
});
