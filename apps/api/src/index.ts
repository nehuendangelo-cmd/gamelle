import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { errorHandler } from './middleware/error-handler.js';
import { requestLogger } from './middleware/request-logger.js';
import { authRouter } from './routes/auth.js';
import { healthRouter } from './routes/health.js';
import { mealsRouter } from './routes/meals.js';
import { usersRouter } from './routes/users.js';
import { env } from './config/env.js';
import { logger } from './lib/logger.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging
app.use(requestLogger);

// Routes
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/meals', mealsRouter);

// Error handling
app.use(errorHandler);

// Start server
const PORT = env.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`🚀 API server running on port ${PORT}`);
  logger.info(`📍 Environment: ${env.NODE_ENV}`);
});

export { app };
