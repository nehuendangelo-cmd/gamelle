import { Router } from 'express';

import { prisma } from '@january/database';

export const healthRouter = Router();

healthRouter.get('/', async (_req, res) => {
  const start = Date.now();
  
  // Check database connection
  let dbStatus: 'up' | 'down' = 'down';
  let dbLatency = 0;
  
  try {
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    dbLatency = Date.now() - dbStart;
    dbStatus = 'up';
  } catch {
    dbStatus = 'down';
  }
  
  const status = dbStatus === 'up' ? 'healthy' : 'unhealthy';
  
  res.status(status === 'healthy' ? 200 : 503).json({
    status,
    timestamp: new Date().toISOString(),
    services: {
      database: { status: dbStatus, latency: dbLatency },
    },
    version: process.env.npm_package_version || '0.1.0',
    uptime: process.uptime(),
    responseTime: Date.now() - start,
  });
});
