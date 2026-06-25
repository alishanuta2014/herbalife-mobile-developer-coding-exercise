import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DailyGoals } from '../types';
import { DEFAULT_DAILY_GOALS } from '../constants/goals';
import { loadDailyGoals, saveDailyGoals } from '../utils/goalsStorage';

interface DailyGoalsContextValue {
  goals: DailyGoals;
  updateGoals: (goals: DailyGoals) => void;
  resetGoals: () => void;
}

const DailyGoalsContext = createContext<DailyGoalsContextValue | null>(null);

export function DailyGoalsProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<DailyGoals>(DEFAULT_DAILY_GOALS);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function hydrateGoals() {
      const storedGoals = await loadDailyGoals();
      if (!cancelled) {
        setGoals(storedGoals);
        setIsHydrated(true);
      }
    }

    hydrateGoals();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    saveDailyGoals(goals);
  }, [goals, isHydrated]);

  const updateGoals = useCallback((nextGoals: DailyGoals) => {
    setGoals(nextGoals);
  }, []);

  const resetGoals = useCallback(() => {
    setGoals(DEFAULT_DAILY_GOALS);
  }, []);

  const value = useMemo(
    () => ({ goals, updateGoals, resetGoals }),
    [goals, updateGoals, resetGoals]
  );

  return <DailyGoalsContext.Provider value={value}>{children}</DailyGoalsContext.Provider>;
}

export function useDailyGoals(): DailyGoalsContextValue {
  const context = useContext(DailyGoalsContext);
  if (!context) {
    throw new Error('useDailyGoals must be used within a DailyGoalsProvider');
  }
  return context;
}
