import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import { AuthenticatedRequest } from '../types';

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { id: number; email: string; plan: string };
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
