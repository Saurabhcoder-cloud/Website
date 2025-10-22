import jwt from 'jsonwebtoken';
import env from '../config/env';

export interface JwtPayload {
  id: number;
  email: string;
  plan: string;
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
}
