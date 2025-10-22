import sgMail from '@sendgrid/mail';
import env from '../config/env';

if (env.SENDGRID_API_KEY) {
  sgMail.setApiKey(env.SENDGRID_API_KEY);
}

export async function sendReminderEmail(to: string, subject: string, text: string) {
  if (!env.SENDGRID_API_KEY) {
    // eslint-disable-next-line no-console
    console.log('Email mock:', { to, subject, text });
    return;
  }
  await sgMail.send({
    to,
    from: 'no-reply@taxhelp.ai',
    subject,
    text
  });
}
