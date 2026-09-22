import nodemailer from 'nodemailer';
import { generateConfirmationEmailHtml } from './emailTemplate.js';

// Load environment variables if available
try {
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile();
  }
} catch (e) {
  // .env may not exist in production environments where vars are injected directly
}

export const BREVO_SMTP_CONFIG = {
  host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
  port: parseInt(process.env.BREVO_SMTP_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER || 'ba90ca001@smtp-brevo.com',
    pass: process.env.BREVO_SMTP_KEY || ''
  }
};

let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport(BREVO_SMTP_CONFIG);
  }
  return transporter;
}

export async function sendRegistrationConfirmation(teamData) {
  const recipient = teamData.leaderEmail;
  if (!recipient) {
    throw new Error('Leader email is missing.');
  }

  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'ecellvsbcetc@gmail.com';
  const senderName = process.env.BREVO_SENDER_NAME || 'VSB E-Cell';
  const htmlContent = generateConfirmationEmailHtml(teamData);

  const mailOptions = {
    from: `"${senderName}" <${senderEmail}>`,
    to: recipient,
    subject: 'Registration Confirmation – Project Expo 2026',
    html: htmlContent
  };

  const mailer = getTransporter();
  const info = await mailer.sendMail(mailOptions);
  console.log(`[Brevo SMTP] Confirmation email sent to ${recipient}. MessageId: ${info.messageId}`);
  return info;
}
