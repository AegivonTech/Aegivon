import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

export function signToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string): jwt.JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'string') return null;
    return decoded as jwt.JwtPayload;
  } catch (error) {
    return null;
  }
}

export function getAuthUser(): (jwt.JwtPayload & { id: string, email: string, role: string }) | null {
  const token = cookies().get('admin_token')?.value;
  if (!token) return null;
  return verifyToken(token) as any;
}
