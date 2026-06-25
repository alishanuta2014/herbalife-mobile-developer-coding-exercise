import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Food, LogEntry, MealSlot } from '../types';
import { loadFoodLogEntries, saveFoodLogEntries } from '../utils/foodLogStorage';

interface FoodLogContextValue {
  entries: LogEntry[];
  addFood: (food: Food, options?: { servings?: number; mealSlot?: MealSlot }) => void;
  removeEntry: (entryId: string) => void;
}

const FoodLogContext = createContext<FoodLogContextValue | null>(null);

export function FoodLogProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function hydrateLog() {
      const storedEntries = await loadFoodLogEntries();
      if (!cancelled) {
        setEntries(storedEntries);
        setIsHydrated(true);
      }
    }

    hydrateLog();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    saveFoodLogEntries(entries);
  }, [entries, isHydrated]);

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
