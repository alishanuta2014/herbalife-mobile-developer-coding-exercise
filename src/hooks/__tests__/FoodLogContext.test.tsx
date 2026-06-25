import { act, renderHook, waitFor } from '@testing-library/react';
import { FoodLogProvider, useFoodLog } from '../FoodLogContext';
import { Food } from '../../types';

jest.mock('../../utils/foodLogStorage', () => ({
  loadFoodLogEntries: jest.fn().mockResolvedValue([]),
  saveFoodLogEntries: jest.fn().mockResolvedValue(undefined),
}));

const sampleFood: Food = {
  id: 'test-food',
  name: 'Test Shake',
  category: 'shake',
  servingSize: '1 scoop',
  calories: 200,
  protein: 15,
  carbs: 20,
  fat: 5,
};

describe('useFoodLog', () => {
  const randomUUID = jest.fn(
    () =>
      '00000000-0000-0000-0000-000000000001' as `${string}-${string}-${string}-${string}-${string}`
  );

  beforeEach(() => {
    randomUUID.mockClear();
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID },
      configurable: true,
    });
  });

  it('addFood adds an entry with the chosen servings and meal slot', async () => {
    const { result } = renderHook(() => useFoodLog(), {
      wrapper: FoodLogProvider,
    });

    await waitFor(() => {
      expect(result.current.entries).toEqual([]);
    });

    await act(async () => {
      result.current.addFood(sampleFood, { servings: 2, mealSlot: 'lunch' });
    });

    expect(result.current.entries).toHaveLength(1);
    expect(result.current.entries[0]).toMatchObject({
      id: '00000000-0000-0000-0000-000000000001',
      food: sampleFood,
      servings: 2,
      mealSlot: 'lunch',
    });
  });
});
