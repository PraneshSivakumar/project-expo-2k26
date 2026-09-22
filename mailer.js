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

export const BREVO_CONFIG = {
  apiKey: process.env.BREVO_API_KEY || '',
  senderEmail: process.env.BREVO_SENDER_EMAIL || 'praneshsivakumar10@gmail.com',
  senderName: process.env.BREVO_SENDER_NAME || 'VSB E-Cell',
  replyToEmail: process.env.BREVO_REPLY_TO || 'ecellvsbcetc@gmail.com',
  smtpHost: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
  smtpPort: parseInt(process.env.BREVO_SMTP_PORT || '587', 10),
  smtpUser: process.env.BREVO_SMTP_USER || 'ba90ca001@smtp-brevo.com',
  smtpPass: process.env.BREVO_SMTP_KEY || ''
};

let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: BREVO_CONFIG.smtpHost,
      port: BREVO_CONFIG.smtpPort,
      secure: false,
      auth: {
        user: BREVO_CONFIG.smtpUser,
        pass: BREVO_CONFIG.smtpPass
      }
    });
  }
  return transporter;
}

export async function sendRegistrationConfirmation(teamData) {
  const recipient = teamData.leaderEmail;
  if (!recipient) {
    throw new Error('Leader email is missing.');
  }

  const recipientName = teamData.leaderName || 'Participant';
  const htmlContent = generateConfirmationEmailHtml(teamData);
  const subject = 'Registration Confirmation – Project Expo 2026';

  // 1. Primary Method: Brevo REST API v3
  if (BREVO_CONFIG.apiKey) {
    try {
      const payload = {
        sender: {
          name: BREVO_CONFIG.senderName,
          email: BREVO_CONFIG.senderEmail
        },
        replyTo: {
          name: BREVO_CONFIG.senderName,
          email: BREVO_CONFIG.replyToEmail
        },
        to: [
          {
            email: recipient,
            name: recipientName
          }
        ],
        subject: subject,
        htmlContent: htmlContent
      };

      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': BREVO_CONFIG.apiKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || `Brevo API HTTP ${res.status}`);
      }

      console.log(`[Brevo API v3] Confirmation email sent to ${recipient}. MessageId: ${data.messageId}`);
      return { messageId: data.messageId, provider: 'brevo-api' };
    } catch (apiError) {
      console.warn('[Brevo API v3 error, falling back to SMTP]:', apiError.message);
      // Fall through to SMTP fallback if SMTP credentials exist
      if (!BREVO_CONFIG.smtpPass) {
        throw apiError;
      }
    }
  }

  // 2. Fallback Method: Brevo SMTP Relay via nodemailer
  const mailOptions = {
    from: `"${BREVO_CONFIG.senderName}" <${BREVO_CONFIG.senderEmail}>`,
    replyTo: `"${BREVO_CONFIG.senderName}" <${BREVO_CONFIG.replyToEmail}>`,
    to: recipient,
    subject: subject,
    html: htmlContent
  };

  const mailer = getTransporter();
  const info = await mailer.sendMail(mailOptions);
  console.log(`[Brevo SMTP] Confirmation email sent to ${recipient}. MessageId: ${info.messageId}`);
  return { messageId: info.messageId, provider: 'brevo-smtp' };
}
