import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma';

const router = Router();

router.get('/stats', async (req: Request, res: Response) => {
  try {
    const [
      totalEnquiries,
      totalApplications,
      activeJobs,
      recentEnquiries,
      recentApplications
    ] = await Promise.all([
      prisma.enquiry.count(),
      prisma.application.count(),
      prisma.jobRole.count({ where: { status: 'OPEN' } }),
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
      })
    ]);

    res.json({
      metrics: {
        totalEnquiries,
        totalApplications,
        activeJobs
      },
      recentActivity: {
        enquiries: recentEnquiries,
        applications: recentApplications
      }
    });
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
