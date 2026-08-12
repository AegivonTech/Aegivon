import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../lib/prisma';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { status, roleId } = req.query;
    
    const whereClause: any = {};
    if (status && status !== 'ALL') {
      whereClause.status = status;
    }
    if (roleId && roleId !== 'ALL') {
      whereClause.roleId = roleId;
    }

    const applications = await prisma.application.findMany({
      where: whereClause,
      include: {
        role: {
          select: { title: true, department: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(applications);
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const updateSchema = z.object({
  status: z.enum(['NEW', 'REVIEWING', 'SHORTLISTED', 'INTERVIEW', 'SELECTED', 'REJECTED']),
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { status } = updateSchema.parse(req.body);
    const { id } = req.params;

    const application = await prisma.application.update({
      where: { id },
      data: { status },
      include: {
        role: {
          select: { title: true, department: true }
        }
      }
    });

    res.json({ success: true, application });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Failed to update application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.application.delete({
      where: { id },
    });

    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Failed to delete application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
