import nodeCron from 'node-cron';
import pool from '../../config/db';
import { sendReminderEmail } from '../../utils/email';

export async function sendPlanExpiryReminders() {
  const { rows } = await pool.query(
    "SELECT email, name, plan, plan_expiry FROM users WHERE plan <> 'free' AND plan_expiry <= NOW() + INTERVAL '3 days'"
  );
  await Promise.all(
    rows.map((user) =>
      sendReminderEmail(
        user.email,
        'Your TaxHelp AI plan is expiring soon',
        `Hi ${user.name}, your ${user.plan} plan expires on ${new Date(user.plan_expiry).toDateString()}.`
      )
    )
  );
  return rows.length;
}

export function scheduleDailyReminders() {
  nodeCron.schedule('0 14 * * *', () => {
    sendPlanExpiryReminders().catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Reminder job failed', error);
    });
  });
}
