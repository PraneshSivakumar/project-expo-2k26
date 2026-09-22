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

function getBrevoConfig() {
  // Reload env file if available
  try {
    if (typeof process.loadEnvFile === 'function') {
      process.loadEnvFile();
    }
  } catch (e) {}

  // Verified sender on Brevo account
  const envSender = process.env.BREVO_SENDER_EMAIL;
  // If envSender is ecellvsbcetc@gmail.com (which is unverified on Brevo), fallback to verified praneshsivakumar10@gmail.com
  const verifiedSender = (envSender && envSender.toLowerCase() !== 'ecellvsbcetc@gmail.com') 
    ? envSender 
    : 'praneshsivakumar10@gmail.com';

  return {
    apiKey: process.env.BREVO_API_KEY || '',
    senderEmail: verifiedSender,
    senderName: process.env.BREVO_SENDER_NAME || 'VSB E-Cell',
    replyToEmail: process.env.BREVO_REPLY_TO || 'ecellvsbcetc@gmail.com',
    smtpHost: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
    smtpPort: parseInt(process.env.BREVO_SMTP_PORT || '587', 10),
    smtpUser: process.env.BREVO_SMTP_USER || 'ba90ca001@smtp-brevo.com',
    smtpPass: process.env.BREVO_SMTP_KEY || ''
  };
}

let transporter = null;

function getTransporter(config) {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: false,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass
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

  const config = getBrevoConfig();
  const recipientName = teamData.leaderName || 'Participant';
  const htmlContent = generateConfirmationEmailHtml(teamData);
  const subject = 'Registration Confirmation – Project Expo 2026';

  console.log(`[Brevo Sending] Initiating confirmation email to: ${recipient}, using verified sender: ${config.senderEmail}`);

  // 1. Primary Method: Brevo REST API v3
  if (config.apiKey) {
    try {
      const payload = {
        sender: {
          name: config.senderName,
          email: config.senderEmail
        },
        replyTo: {
          name: config.senderName,
          email: config.replyToEmail
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
          'api-key': config.apiKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || `Brevo API HTTP ${res.status}`);
      }

      console.log(`[Brevo API v3] Confirmation email successfully sent to ${recipient}. MessageId: ${data.messageId}`);
      return { messageId: data.messageId, provider: 'brevo-api' };
    } catch (apiError) {
      console.warn('[Brevo API v3 error, falling back to SMTP]:', apiError.message);
      if (!config.smtpPass) {
        throw apiError;
      }
    }
  }

  // 2. Fallback Method: Brevo SMTP Relay via nodemailer
  const mailOptions = {
    from: `"${config.senderName}" <${config.senderEmail}>`,
    replyTo: `"${config.senderName}" <${config.replyToEmail}>`,
    to: recipient,
    subject: subject,
    html: htmlContent
  };

  const mailer = getTransporter(config);
  const info = await mailer.sendMail(mailOptions);
  console.log(`[Brevo SMTP] Confirmation email sent to ${recipient}. MessageId: ${info.messageId}`);
  return { messageId: info.messageId, provider: 'brevo-smtp' };
}
