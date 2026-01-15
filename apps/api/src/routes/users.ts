import { Router } from 'express';
import { z } from 'zod';

import { authMiddleware } from '../middleware/auth.js';
import { prisma } from '@january/database';

export const usersRouter = Router();

// All routes require authentication
usersRouter.use(authMiddleware);

const updateProfileSchema = z.object({
  bio: z.string().max(300).optional(),
  preferredCuisines: z.array(z.string()).optional(),
  dietaryPreferences: z.array(z.string()).optional(),
  emailNotifications: z.boolean().optional(),
});

// Get current user profile
usersRouter.get('/me', (req, res) => {
  res.json(req.user);
});

// Update current user profile
usersRouter.patch('/me', async (req, res, next) => {
  try {
    const data = updateProfileSchema.parse(req.body);
    
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data,
    });
    
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Get user balance
usersRouter.get('/me/balance', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { tokens: true },
    });
    
    res.json({ tokens: user?.tokens ?? 0 });
  } catch (error) {
    next(error);
  }
});

// Complete safety onboarding
usersRouter.post('/me/complete-onboarding', async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: { safetyOnboardingCompletedAt: new Date() },
    });
    
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Get public profile
usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        displayName: true,
        login: true,
        avatarUrl: true,
        bio: true,
        createdAt: true,
      },
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    next(error);
  }
});
