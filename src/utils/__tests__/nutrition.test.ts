import { calculateNutritionTotals } from '../nutrition';
import { Food, LogEntry } from '../../types';

const sampleFood: Food = {
  id: 'test-food',
  name: 'Test Shake',
  category: 'shake',
  servingSize: '1 scoop',
  calories: 200,
  protein: 15,
  carbs: 20,
  fat: 5,
  fiber: 2,
};

describe('calculateNutritionTotals', () => {
  it('sums calories and macros scaled by servings across entries', () => {
    const entries: LogEntry[] = [
      {
        id: 'entry-1',
        food: sampleFood,
        servings: 1,
        mealSlot: 'breakfast',
        loggedAt: '2026-06-25T08:00:00.000Z',
      },
      {
        id: 'entry-2',
        food: sampleFood,
        servings: 0.5,
        mealSlot: 'lunch',
        loggedAt: '2026-06-25T12:00:00.000Z',
      },
    ];

    expect(calculateNutritionTotals(entries)).toEqual({
      calories: 300,
      protein: 22.5,
      carbs: 30,
      fat: 7.5,
      fiber: 3,
    });
  });
});
