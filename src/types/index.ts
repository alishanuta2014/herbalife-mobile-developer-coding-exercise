export type FoodCategory =
  | 'shake'
  | 'protein'
  | 'fruit'
  | 'vegetable'
  | 'grain'
  | 'dairy'
  | 'legume'
  | 'nut'
  | 'snack'
  | 'beverage';

export interface Food {
  id: string;
  name: string;
  brand?: string;
  category: FoodCategory;
  servingSize: string;
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber?: number; // grams
  sugar?: number; // grams
}

export type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface LogEntry {
  id: string;
  food: Food;
  servings: number;
  mealSlot: MealSlot;
  loggedAt: string; // ISO date string
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  entries: LogEntry[];
}

export interface NutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface DailyGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
