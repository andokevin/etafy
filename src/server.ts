/**
 * Backend (Node.js) Server Entry Point with Sequelize ORM
 */
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { connectDatabase } from './database/sequelize';
import apiRoutes from './routes/api.routes';
import './models'; // Load all models and associations

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req: Request, res: Response, next: any) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({ success: true, status: 'Server is running', timestamp: new Date() });
});

// API Routes
app.use('/api', apiRoutes);

// Error Handling
app.use((err: any, req: Request, res: Response) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start Server
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

    app.listen(port, () => {
      console.log('');
      console.log('╔════════════════════════════════════════╗');
      console.log('║     🚀 E-TAFY SERVER RUNNING 🚀      ║');
      console.log('╚════════════════════════════════════════╝');
      console.log(`⚡ Server: http://localhost:${port}`);
      console.log(`🏥 Health: http://localhost:${port}/health`);
      console.log(`🔌 API: http://localhost:${port}/api`);
      console.log(`📅 Started: ${new Date().toISOString()}`);
      console.log('');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});
