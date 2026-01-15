import type { User } from '@january/database';

// Re-export for convenience
export type AppUser = User;

// Extend Express types
declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User {
      id: string;
      fortyTwoId: string;
      email: string;
      login: string;
      displayName: string;
      avatarUrl: string | null;
      bio: string | null;
      tokens: number;
      preferredCuisines: string[];
      dietaryPreferences: string[];
      safetyOnboardingCompletedAt: Date | null;
      emailNotifications: boolean;
      campus: string | null;
      createdAt: Date;
      updatedAt: Date;
    }
  }
}
