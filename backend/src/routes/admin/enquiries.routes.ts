import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../lib/prisma';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { status, type } = req.query;
    
    const whereClause: any = {};
    if (status && status !== 'ALL') {
      whereClause.status = status;
    }
    if (type && type !== 'ALL') {
      whereClause.type = type;
    }

    const enquiries = await prisma.enquiry.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    res.json(enquiries);
  } catch (error) {
    console.error('Failed to fetch enquiries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const updateSchema = z.object({
  status: z.enum(['NEW', 'IN_PROGRESS', 'CONTACTED', 'RESOLVED']),
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { status } = updateSchema.parse(req.body);
    const { id } = req.params;

    const enquiry = await prisma.enquiry.update({
      where: { id },
      data: { status },
    });

    res.json({ success: true, enquiry });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Failed to update enquiry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.enquiry.delete({
      where: { id },
    });

    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error('Failed to delete enquiry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
