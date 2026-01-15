import { Router } from 'express';
import { z } from 'zod';

import { authMiddleware, requireOnboarding } from '../middleware/auth.js';
import { prisma } from '@january/database';

export const mealsRouter = Router();

// All routes require authentication
mealsRouter.use(authMiddleware);

const createMealSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(1000).optional(),
  ingredients: z.array(z.string()),
  allergens: z.array(z.string()).optional(),
  cuisineType: z.string(),
  tokenCost: z.number().int().min(1).max(100),
  portionCount: z.number().int().min(1).max(10),
  expirationDate: z.string().datetime(),
  pickupLocation: z.string().max(200),
  pickupInstructions: z.string().max(500).optional(),
});

const mealFiltersSchema = z.object({
  cuisineType: z.string().optional(),
  maxTokens: z.coerce.number().int().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().default(1),
  limit: z.coerce.number().int().default(20),
});

// List meals (paginated, filterable)
mealsRouter.get('/', async (req, res, next) => {
  try {
    const { cuisineType, maxTokens, search, page, limit } = mealFiltersSchema.parse(req.query);
    
    const where = {
      status: 'available' as const,
      expirationDate: { gt: new Date() },
      ...(cuisineType && { cuisineType }),
      ...(maxTokens && { tokenCost: { lte: maxTokens } }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
    };
    
    const [meals, total] = await Promise.all([
      prisma.meal.findMany({
        where,
        include: {
          author: {
            select: { id: true, displayName: true, login: true, avatarUrl: true },
          },
          images: { orderBy: { displayOrder: 'asc' } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.meal.count({ where }),
    ]);
    
    res.json({
      data: meals,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

// Create meal (requires onboarding)
mealsRouter.post('/', requireOnboarding, async (req, res, next) => {
  try {
    const data = createMealSchema.parse(req.body);
    
    const meal = await prisma.meal.create({
      data: {
        ...data,
        authorId: req.user!.id,
        status: 'available',
        expirationDate: new Date(data.expirationDate),
      },
      include: {
        author: {
          select: { id: true, displayName: true, login: true, avatarUrl: true },
        },
      },
    });
    
    res.status(201).json(meal);
  } catch (error) {
    next(error);
  }
});

// Get meal by ID
mealsRouter.get('/:id', async (req, res, next) => {
  try {
    const meal = await prisma.meal.findUnique({
      where: { id: req.params.id },
      include: {
        author: {
          select: { id: true, displayName: true, login: true, avatarUrl: true },
        },
        images: { orderBy: { displayOrder: 'asc' } },
      },
    });
    
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    
    res.json(meal);
  } catch (error) {
    next(error);
  }
});

// Update meal (owner only)
mealsRouter.patch('/:id', async (req, res, next) => {
  try {
    const meal = await prisma.meal.findUnique({
      where: { id: req.params.id },
    });
    
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    
    if (meal.authorId !== req.user!.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    const data = createMealSchema.partial().parse(req.body);
    
    const updated = await prisma.meal.update({
      where: { id: req.params.id },
      data: {
        ...data,
        ...(data.expirationDate && { expirationDate: new Date(data.expirationDate) }),
      },
      include: {
        author: {
          select: { id: true, displayName: true, login: true, avatarUrl: true },
        },
      },
    });
    
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// Delete meal (owner only)
mealsRouter.delete('/:id', async (req, res, next) => {
  try {
    const meal = await prisma.meal.findUnique({
      where: { id: req.params.id },
    });
    
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    
    if (meal.authorId !== req.user!.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    await prisma.meal.delete({
      where: { id: req.params.id },
    });
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
