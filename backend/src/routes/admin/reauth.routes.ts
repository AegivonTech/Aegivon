import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma';
import { AuthRequest, requireAdmin } from '../../middleware/auth.middleware';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'development_secret_key_change_in_production';

router.post('/', requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: 'elevated_access_failed',
          entity: 'auth',
          entityId: user.id,
        }
      });
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Issue elevated access token valid for 15 minutes
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, elevated: true },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie('elevated_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: '/',
    });

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'elevated_access_granted',
        entity: 'auth',
        entityId: user.id,
      }
    });

    res.json({ success: true, message: 'Elevated access granted' });
  } catch (error) {
    console.error('Reauth failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
