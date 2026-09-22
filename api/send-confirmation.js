import { sendRegistrationConfirmation } from '../mailer.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const teamData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const info = await sendRegistrationConfirmation(teamData);
    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('Email sending error:', err);
    return res.status(500).json({ error: err.message });
  }
}
