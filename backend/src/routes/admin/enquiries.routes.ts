import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../lib/prisma';
import { requireElevated, AuthRequest } from '../../middleware/auth.middleware';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { status, type, search, from, to, page, page_size } = req.query;
    
    const whereClause: any = {
      deletedAt: null,
      status: { not: 'ARCHIVED' }
    };
    
    if (status && status !== 'ALL') {
      whereClause.status = status;
    }
    if (type && type !== 'ALL') {
      whereClause.type = type;
    }
    if (search) {
      whereClause.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    if (from || to) {
      whereClause.createdAt = {};
      if (from) whereClause.createdAt.gte = new Date(from as string);
      if (to) whereClause.createdAt.lte = new Date(to as string);
    }

    const pageNumber = page ? parseInt(page as string, 10) : undefined;
    const pageSize = page_size ? parseInt(page_size as string, 10) : undefined;
    const skip = (pageNumber && pageSize) ? (pageNumber - 1) * pageSize : undefined;
    const take = pageSize;

    const [enquiries, total] = await Promise.all([
      prisma.enquiry.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      prisma.enquiry.count({ where: whereClause })
    ]);

    res.json({ enquiries, total });
  } catch (error) {
    console.error('Failed to fetch enquiries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/archived', requireElevated, async (req: AuthRequest, res: Response) => {
  try {
    const { type, search, from, to, page, page_size } = req.query;
    
    const whereClause: any = {
      deletedAt: null,
      status: 'ARCHIVED'
    };
    
    if (type && type !== 'ALL') {
      whereClause.type = type;
    }
    if (search) {
      whereClause.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    if (from || to) {
      whereClause.createdAt = {};
      if (from) whereClause.createdAt.gte = new Date(from as string);
      if (to) whereClause.createdAt.lte = new Date(to as string);
    }

    const pageNumber = page ? parseInt(page as string, 10) : undefined;
    const pageSize = page_size ? parseInt(page_size as string, 10) : undefined;
    const skip = (pageNumber && pageSize) ? (pageNumber - 1) * pageSize : undefined;
    const take = pageSize;

    const [enquiries, total] = await Promise.all([
      prisma.enquiry.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      prisma.enquiry.count({ where: whereClause })
    ]);

    res.json({ enquiries, total });
  } catch (error) {
    console.error('Failed to fetch archived enquiries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const updateSchema = z.object({
  status: z.enum(['NEW', 'IN_PROGRESS', 'CONTACTED', 'RESOLVED', 'ARCHIVED']),
});

router.patch('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { status } = updateSchema.parse(req.body);
    const { id } = req.params;

    const enquiry = await prisma.enquiry.update({
      where: { id },
      data: { status },
    });
    
    if (req.user?.id) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'status_changed',
          entity: 'enquiry',
          entityId: id,
        }
      });
    }

    res.json({ success: true, enquiry });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Failed to update enquiry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.enquiry.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
    
    if (req.user?.id) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'deleted_enquiry',
          entity: 'enquiry',
          entityId: id,
        }
      });
    }

    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error('Failed to delete enquiry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id/permanent', requireElevated, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.enquiry.delete({
      where: { id },
    });
    
    if (req.user?.id) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'permanent_deleted_enquiry',
          entity: 'enquiry',
          entityId: id,
        }
      });
    }

    res.json({ success: true, message: 'Enquiry permanently deleted successfully' });
  } catch (error) {
    console.error('Failed to permanently delete enquiry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
