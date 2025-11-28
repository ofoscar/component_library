import express, { Request, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { ButtonClick } from '../models/ButtonClick';

const router = express.Router();

// POST /api/tracking/button-click - Track button click
router.post('/button-click', async (req: Request, res: Response) => {
  try {
    const { buttonId, buttonText, sessionId, metadata = {} } = req.body;

    // Validate required fields
    if (!buttonId || !buttonText || !sessionId) {
      return res.status(400).json({
        error: 'buttonId, buttonText, and sessionId are required',
      });
    }

    // Extract user agent from request headers
    const userAgent = req.headers['user-agent'] || 'Unknown';

    // Create new button click record
    const buttonClick = new ButtonClick({
      buttonId,
      buttonText,
      sessionId,
      timestamp: new Date(),
      metadata: {
        ...metadata,
        userAgent,
      },
    });

    await buttonClick.save();

    res.status(201).json({
      message: 'Button click tracked successfully',
      clickId: buttonClick._id,
      timestamp: buttonClick.timestamp,
    });
  } catch (error: any) {
    console.error('Track button click error:', error);
    res.status(500).json({
      error: 'Failed to track button click',
    });
  }
});

// GET /api/tracking/stats - Get button click statistics
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const { buttonId, limit = 100, offset = 0 } = req.query;

    const filter: any = {};
    if (buttonId) {
      filter.buttonId = buttonId;
    }

    // Get total count
    const totalCount = await ButtonClick.countDocuments(filter);

    // Get recent clicks
    const recentClicks = await ButtonClick.find(filter)
      .sort({ timestamp: -1 })
      .limit(Number(limit))
      .skip(Number(offset))
      .select('buttonId buttonText timestamp metadata.variant metadata.size')
      .lean();

    // Get click counts by button
    const clickCounts = await ButtonClick.aggregate([
      { $match: filter },
      {
        $group: {
          _id: { buttonId: '$buttonId', buttonText: '$buttonText' },
          count: { $sum: 1 },
          lastClicked: { $max: '$timestamp' },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Get clicks by hour for the last 24 hours
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const hourlyStats = await ButtonClick.aggregate([
      { $match: { ...filter, timestamp: { $gte: last24Hours } } },
      {
        $group: {
          _id: {
            hour: { $hour: '$timestamp' },
            date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.date': -1, '_id.hour': -1 } },
    ]);

    res.json({
      totalCount,
      recentClicks,
      clickCounts,
      hourlyStats,
      period: {
        from: offset,
        limit,
        hasMore: totalCount > Number(offset) + Number(limit),
      },
    });
  } catch (error: any) {
    console.error('Get tracking stats error:', error);
    res.status(500).json({
      error: 'Failed to retrieve tracking statistics',
    });
  }
});

// GET /api/tracking/export - Export click data (protected route)
router.get(
  '/export',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { format = 'json', startDate, endDate } = req.query;

      const filter: any = {};
      if (startDate || endDate) {
        filter.timestamp = {};
        if (startDate) filter.timestamp.$gte = new Date(startDate as string);
        if (endDate) filter.timestamp.$lte = new Date(endDate as string);
      }

      const clicks = await ButtonClick.find(filter)
        .sort({ timestamp: -1 })
        .select('-__v')
        .lean();

      if (format === 'csv') {
        // Convert to CSV format
        const csvHeaders = [
          'timestamp',
          'buttonId',
          'buttonText',
          'sessionId',
          'variant',
          'size',
          'page',
          'userAgent',
        ];

        const csvData = clicks.map((click) => [
          click.timestamp.toISOString(),
          click.buttonId,
          click.buttonText,
          click.sessionId,
          click.metadata.variant || '',
          click.metadata.size || '',
          click.metadata.page || '',
          click.metadata.userAgent || '',
        ]);

        const csvContent = [
          csvHeaders.join(','),
          ...csvData.map((row) => row.map((field) => `"${field}"`).join(',')),
        ].join('\n');

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader(
          'Content-Disposition',
          'attachment; filename=button-clicks.csv',
        );
        res.send(csvContent);
      } else {
        // JSON format
        res.json({
          exportedAt: new Date(),
          totalRecords: clicks.length,
          data: clicks,
        });
      }
    } catch (error: any) {
      console.error('Export tracking data error:', error);
      res.status(500).json({
        error: 'Failed to export tracking data',
      });
    }
  },
);

export default router;
