import { Request, Response } from 'express';
import pool from '../config/db';
import { AuthenticatedRequest } from '../types';

export async function listDocuments(req: AuthenticatedRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { rows } = await pool.query('SELECT * FROM documents WHERE user_id=$1 ORDER BY created_at DESC', [req.user.id]);
  res.json({ documents: rows });
}
