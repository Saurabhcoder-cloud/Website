export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

import prisma from '../../../../lib/db';

export async function POST() {
  const now = new Date();
  const upcoming = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 3);

  const reminders = await prisma.reminder.findMany({
    where: {
      dueDate: { lte: upcoming },
      OR: [{ sentAt: null }, { sentAt: { lt: now } }]
    },
    include: { user: true }
  });

  let sgMail: typeof import('@sendgrid/mail') | null = null;

  for (const reminder of reminders) {
    const email = reminder.user.email;
    if (!email) continue;

    if (process.env.SENDGRID_API_KEY) {
      if (!sgMail) {
        sgMail = await import('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      }
      await sgMail!.send({
        to: email,
        from: 'notifications@taxhelp.ai',
        subject: 'TaxHelp AI plan reminder',
        text: `Your ${reminder.user.plan} plan renews on ${reminder.dueDate.toDateString()}.`,
        html: `<p>Your <strong>${reminder.user.plan}</strong> plan renews on <strong>${reminder.dueDate.toDateString()}</strong>.</p>`
      });
    } else {
      console.log(`Reminder: ${email} plan ${reminder.user.plan} due ${reminder.dueDate.toISOString()}`);
    }

    await prisma.reminder.update({
      where: { id: reminder.id },
      data: { sentAt: now }
    });
  }

  return NextResponse.json({ sent: reminders.length });
}

export async function GET() {
  return POST();
}
