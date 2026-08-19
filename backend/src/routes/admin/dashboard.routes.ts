import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma';

const router = Router();

router.get('/stats', async (req: Request, res: Response) => {
  try {
    const [
      totalEnquiries,
      newApplications,
      rakshakInterest,
      openPositions,
      newEnquiries,
      recentEnquiries,
      recentApplications,
      totalSiteVisits
    ] = await Promise.all([
      prisma.enquiry.count(),
      prisma.application.count({ where: { status: 'NEW' } }),
      prisma.siteAnalytics.count({ where: { element: 'RAKSHAK_INTEREST' } }),
      prisma.jobRole.count({ where: { status: 'OPEN' } }),
      prisma.enquiry.count({ where: { status: 'NEW' } }),
      prisma.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, type: true, status: true, createdAt: true }
      }),
      prisma.application.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { 
          id: true, 
          name: true, 
          status: true, 
          createdAt: true,
          role: { select: { title: true } }
        }
      }),
      prisma.siteAnalytics.count({ where: { eventType: 'PAGE_VIEW' } })
    ]);

    const recentActivity = [
      ...recentEnquiries.map(e => ({
        id: `enq_${e.id}`,
        user: { name: e.name },
        action: 'SUBMITTED',
        entity: 'Enquiry',
        timestamp: e.createdAt
      })),
      ...recentApplications.map(a => ({
        id: `app_${a.id}`,
        user: { name: a.name },
        action: 'APPLIED',
        entity: 'Application',
        timestamp: a.createdAt
      }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);

    res.json({
      totalEnquiries,
      newApplications,
      rakshakInterest,
      openPositions,
      newEnquiries,
      totalSiteVisits,
      recentActivity
    });
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
