import { LogEntry, NutritionTotals } from '../types';

export function calculateNutritionTotals(entries: LogEntry[]): NutritionTotals {
  return entries.reduce(
    (totals, entry) => {
      const { food, servings } = entry;
      return {
        calories: totals.calories + food.calories * servings,
        protein: totals.protein + food.protein * servings,
        carbs: totals.carbs + food.carbs * servings,
        fat: totals.fat + food.fat * servings,
        fiber: totals.fiber + (food.fiber ?? 0) * servings,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );
}

export function roundNutritionTotals(totals: NutritionTotals): NutritionTotals {
  return {
    calories: Math.round(totals.calories),
    protein: Math.round(totals.protein),
    carbs: Math.round(totals.carbs),
    fat: Math.round(totals.fat),
    fiber: Math.round(totals.fiber),
  };
}

/** Progress toward a daily goal, capped at 100% for bar display. */
export function calculateGoalProgress(value: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.min((value / goal) * 100, 100);
}

export function calculateRemaining(value: number, goal: number): number {
  return Math.max(goal - value, 0);
}

export function calculateOverGoal(value: number, goal: number): number {
  return Math.max(value - goal, 0);
}
