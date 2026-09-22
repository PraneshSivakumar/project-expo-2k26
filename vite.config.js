import { defineConfig } from 'vite';
import { sendRegistrationConfirmation } from './mailer.js';

export default defineConfig({
  plugins: [
    {
      name: 'api-email-server',
      configureServer(server) {
        server.middlewares.use('/api/send-confirmation', (req, res, next) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', async () => {
              try {
                const teamData = JSON.parse(body);
                const info = await sendRegistrationConfirmation(teamData);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, messageId: info.messageId }));
              } catch (err) {
                console.error('[Email Dispatch Error]:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ]
});
