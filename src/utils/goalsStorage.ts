import AsyncStorage from '@react-native-async-storage/async-storage';
import { DailyGoals } from '../types';
import { DEFAULT_DAILY_GOALS, isDailyGoals } from '../constants/goals';

const DAILY_GOALS_STORAGE_KEY = '@herbalife/daily_goals';

export async function loadDailyGoals(): Promise<DailyGoals> {
  try {
    const raw = await AsyncStorage.getItem(DAILY_GOALS_STORAGE_KEY);
    if (!raw) return DEFAULT_DAILY_GOALS;

    const parsed: unknown = JSON.parse(raw);
    if (!isDailyGoals(parsed)) return DEFAULT_DAILY_GOALS;

    return parsed;
  } catch {
    return DEFAULT_DAILY_GOALS;
  }
}

export async function saveDailyGoals(goals: DailyGoals): Promise<void> {
  try {
    await AsyncStorage.setItem(DAILY_GOALS_STORAGE_KEY, JSON.stringify(goals));
  } catch {
    // Persistence failures should not block goal editing in the UI.
  }
}
