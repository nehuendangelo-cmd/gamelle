import type { PublicUser } from './user';

export type MealStatus = 'available' | 'reserved' | 'completed' | 'expired' | 'cancelled';

export interface MealImage {
  id: string;
  mealId: string;
  imageUrl: string;
  displayOrder: number;
}

export interface Meal {
  id: string;
  title: string;
  description: string | null;
  ingredients: string[];
  allergens: string[];
  cuisineType: string;
  status: MealStatus;
  tokenCost: number;
  portionCount: number;
  expirationDate: Date;
  pickupLocation: string;
  pickupInstructions: string | null;
  authorId: string;
  author?: PublicUser;
  images?: MealImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MealFilters {
  cuisineType?: string;
  maxTokens?: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
