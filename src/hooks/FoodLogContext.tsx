import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Food, LogEntry, MealSlot } from '../types';

interface FoodLogContextValue {
  entries: LogEntry[];
  addFood: (food: Food, options?: { servings?: number; mealSlot?: MealSlot }) => void;
}

const FoodLogContext = createContext<FoodLogContextValue | null>(null);

export function FoodLogProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<LogEntry[]>([]);

  const addFood = useCallback(
    (food: Food, options?: { servings?: number; mealSlot?: MealSlot }) => {
      const entry: LogEntry = {
        id: crypto.randomUUID(),
        food,
        servings: options?.servings ?? 1,
        mealSlot: options?.mealSlot ?? 'breakfast',
        loggedAt: new Date().toISOString(),
      };
      setEntries((prev) => [...prev, entry]);
    },
    []
  );

  const value = useMemo(() => ({ entries, addFood }), [entries, addFood]);

  return <FoodLogContext.Provider value={value}>{children}</FoodLogContext.Provider>;
}

export function useFoodLog(): FoodLogContextValue {
  const context = useContext(FoodLogContext);
  if (!context) {
    throw new Error('useFoodLog must be used within a FoodLogProvider');
  }
  return context;
}
