import { Request, Response } from 'express';
import { sendPlanExpiryReminders } from '../modules/reminders/reminderService';

export async function triggerReminders(_req: Request, res: Response) {
  const count = await sendPlanExpiryReminders();
  res.json({ message: `Reminders queued for ${count} users.` });
}
