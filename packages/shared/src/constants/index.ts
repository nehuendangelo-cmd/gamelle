// Initial tokens granted to new users
export const INITIAL_TOKENS = 100;

// Token limits
export const MAX_MEAL_TOKEN_COST = 100;
export const MIN_MEAL_TOKEN_COST = 1;

// Cuisine types
export const CUISINE_TYPES = [
  'Française',
  'Italienne',
  'Asiatique',
  'Méditerranéenne',
  'Mexicaine',
  'Indienne',
  'Américaine',
  'Végétarien',
  'Vegan',
  'Autre',
] as const;

export type CuisineType = (typeof CUISINE_TYPES)[number];

// Common allergens
export const COMMON_ALLERGENS = [
  'Gluten',
  'Crustacés',
  'Œufs',
  'Poisson',
  'Arachides',
  'Soja',
  'Lait',
  'Fruits à coque',
  'Céleri',
  'Moutarde',
  'Sésame',
  'Sulfites',
  'Lupin',
  'Mollusques',
] as const;

export type Allergen = (typeof COMMON_ALLERGENS)[number];

// Dietary preferences
export const DIETARY_PREFERENCES = [
  'Végétarien',
  'Vegan',
  'Sans gluten',
  'Sans lactose',
  'Halal',
  'Casher',
  'Pescétarien',
] as const;

export type DietaryPreference = (typeof DIETARY_PREFERENCES)[number];

// Reservation expiration
export const RESERVATION_EXPIRY_HOURS = 24;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
