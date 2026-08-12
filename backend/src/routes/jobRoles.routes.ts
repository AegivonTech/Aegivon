import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const roles = await prisma.jobRole.findMany({
      where: {
        status: 'OPEN',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(roles);
  } catch (error) {
    console.error('Failed to fetch job roles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
