import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// POST /api/v1/analytics/track
router.post('/track', async (req: Request, res: Response) => {
  try {
    const { eventType, path, element, sessionId } = req.body;

    if (!eventType || !path) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await prisma.siteAnalytics.create({
      data: {
        eventType,
        path,
        element,
        sessionId,
      }
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to track analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
