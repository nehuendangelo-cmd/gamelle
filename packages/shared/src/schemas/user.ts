import { z } from 'zod';

export const updateUserSchema = z.object({
  bio: z.string().max(300).optional(),
  preferredCuisines: z.array(z.string()).optional(),
  dietaryPreferences: z.array(z.string()).optional(),
  emailNotifications: z.boolean().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
