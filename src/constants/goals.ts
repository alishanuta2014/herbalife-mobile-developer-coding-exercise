import { DailyGoals } from '../types';

export const DEFAULT_DAILY_GOALS: DailyGoals = {
  calories: 2000,
  protein: 150,
  carbs: 200,
  fat: 65,
};

export function isDailyGoals(value: unknown): value is DailyGoals {
  if (!value || typeof value !== 'object') return false;
  const goals = value as DailyGoals;
  return (
    typeof goals.calories === 'number' &&
    typeof goals.protein === 'number' &&
    typeof goals.carbs === 'number' &&
    typeof goals.fat === 'number' &&
    goals.calories > 0 &&
    goals.protein > 0 &&
    goals.carbs > 0 &&
    goals.fat > 0
  );
}
