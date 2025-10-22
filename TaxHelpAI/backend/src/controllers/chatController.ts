import { Request, Response } from 'express';
import { askChat } from '../modules/chat/chatService';

export async function askAi(req: Request, res: Response) {
  const { user_id, question, language = 'en' } = req.body;
  if (!user_id || !question) {
    return res.status(400).json({ message: 'user_id and question are required' });
  }
  const result = await askChat(question, language);
  return res.json(result);
}
