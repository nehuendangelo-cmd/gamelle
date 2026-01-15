export interface User {
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

export interface PublicUser {
  id: string;
  displayName: string;
  login: string;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: Date;
}
