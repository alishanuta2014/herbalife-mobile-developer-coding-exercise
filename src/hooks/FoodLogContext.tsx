import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Food, LogEntry, MealSlot } from '../types';

interface FoodLogContextValue {
  entries: LogEntry[];
  addFood: (food: Food, options?: { servings?: number; mealSlot?: MealSlot }) => void;
  removeEntry: (entryId: string) => void;
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

  const removeEntry = useCallback((entryId: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
  }, []);

  const value = useMemo(() => ({ entries, addFood, removeEntry }), [entries, addFood, removeEntry]);

  return <FoodLogContext.Provider value={value}>{children}</FoodLogContext.Provider>;
}

export function useFoodLog(): FoodLogContextValue {
  const context = useContext(FoodLogContext);
  if (!context) {
    throw new Error('useFoodLog must be used within a FoodLogProvider');
  }
  return context;
}
