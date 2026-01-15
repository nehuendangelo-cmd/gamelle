import { z } from 'zod';

export const createMealSchema = z.object({
  title: z.string().min(3, 'Le titre doit faire au moins 3 caractères').max(100),
  description: z.string().max(1000).optional(),
  ingredients: z.array(z.string()).min(1, 'Au moins un ingrédient requis'),
  allergens: z.array(z.string()).optional().default([]),
  cuisineType: z.string().min(1, 'Type de cuisine requis'),
  tokenCost: z.number().int().min(1).max(100),
  portionCount: z.number().int().min(1).max(10),
  expirationDate: z.string().datetime(),
  pickupLocation: z.string().min(1).max(200),
  pickupInstructions: z.string().max(500).optional(),
});

export const updateMealSchema = createMealSchema.partial();

export const mealFiltersSchema = z.object({
  cuisineType: z.string().optional(),
  maxTokens: z.coerce.number().int().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().default(1),
  limit: z.coerce.number().int().default(20),
});

export type CreateMealInput = z.infer<typeof createMealSchema>;
export type UpdateMealInput = z.infer<typeof updateMealSchema>;
export type MealFiltersInput = z.infer<typeof mealFiltersSchema>;
