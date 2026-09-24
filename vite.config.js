import { defineConfig } from 'vite';
import { resolve } from 'path';
import { sendRegistrationConfirmation } from './mailer.js';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        guidelines: resolve(__dirname, 'guidelines.html'),
        schedule: resolve(__dirname, 'schedule.html'),
        registration: resolve(__dirname, 'registration.html'),
        contact: resolve(__dirname, 'contact.html'),
        admin: resolve(__dirname, 'admin.html'),
        emailPreview: resolve(__dirname, 'email-preview.html')
      }
    }
  },
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
