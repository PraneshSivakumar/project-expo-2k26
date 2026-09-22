import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendRegistrationConfirmation } from './mailer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON requests
app.use(express.json());

// API route for sending confirmation emails
app.post('/api/send-confirmation', async (req, res) => {
  try {
    const teamData = req.body;
    const info = await sendRegistrationConfirmation(teamData);
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
