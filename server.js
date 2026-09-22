import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendRegistrationConfirmation } from './mailer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// CORS headers to ensure cross-origin requests never get blocked
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Parse incoming JSON requests up to 10MB
app.use(express.json({ limit: '10mb' }));

// Health check endpoint to quickly test server and Brevo configuration on Render
app.get('/api/health', (req, res) => {
  const hasKey = !!process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SENDER_EMAIL || 'praneshsivakumar10@gmail.com';
  res.status(200).json({
    status: 'ok',
    service: 'project-expo-2026',
    brevoConfigured: hasKey,
    senderEmail: sender
  });
});

// API route for sending confirmation emails
app.post('/api/send-confirmation', async (req, res) => {
  try {
    const teamData = req.body;
    console.log(`[API /api/send-confirmation] Processing registration email for: ${teamData.leaderEmail}`);
    const info = await sendRegistrationConfirmation(teamData);
    console.log(`[API /api/send-confirmation] Successfully dispatched email. MessageId: ${info.messageId}`);
    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('[API Send Confirmation Error]:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Serve static assets from 'dist' directory after build
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[Project Expo Server] Running on port ${PORT}`);
});
