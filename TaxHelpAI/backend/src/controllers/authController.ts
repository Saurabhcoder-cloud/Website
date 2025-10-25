import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createUser, authenticateUser, getUserById } from '../modules/auth/authService';

export async function register(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  const result = await createUser({ name, email, password });
  return res.status(201).json({
    message: 'Registration successful',
    user: result.user,
    token: result.token
  });
}

export async function login(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const result = await authenticateUser(email, password);
  return res.json({ message: 'Login successful', user: result.user, token: result.token });
}

export async function getProfile(req: Request, res: Response) {
  const { id } = req.params;
  const user = await getUserById(Number(id));
  return res.json({ user });
}
