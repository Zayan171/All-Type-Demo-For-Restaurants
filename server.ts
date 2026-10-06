import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import reservationHandler from './api/reservations.ts';
import contactHandler from './api/contact.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // JSON Body parser
  app.use(express.json());

  // Mount Full-Stack API routes
  app.all('/api/reservations', async (req, res) => {
    try {
      await reservationHandler(req, res);
    } catch (err: any) {
      console.error('Unhandled error in /api/reservations:', err);
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: 'Server error processing reservation' });
      }
    }
  });

  app.all('/api/contact', async (req, res) => {
    try {
      await contactHandler(req, res);
    } catch (err: any) {
      console.error('Unhandled error in /api/contact:', err);
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: 'Server error processing message' });
      }
    }
  });

  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      restaurant: 'The Table',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // In dev mode, mount Vite middleware for instant HMR / module serving
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve pre-built Vite assets from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Table restaurant server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
