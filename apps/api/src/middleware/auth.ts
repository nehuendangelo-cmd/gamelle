import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import { AppError } from './error-handler.js';
import { prisma } from '@january/database';

// Import type augmentation
import '../types/index.js';

interface JwtPayload {
  userId: string;
}

export async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies?.token;
    
    if (!token) {
      throw new AppError(401, 'Authentication required');
    }
    
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    
    if (!user) {
      throw new AppError(401, 'User not found');
    }
    
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(401, 'Invalid token'));
    } else {
      next(error);
    }
  }
}

export function requireOnboarding(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (!req.user?.safetyOnboardingCompletedAt) {
    return next(new AppError(403, 'Safety onboarding required'));
  }
  next();
}
