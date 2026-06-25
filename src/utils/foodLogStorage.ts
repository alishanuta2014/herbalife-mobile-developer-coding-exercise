import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogEntry } from '../types';
import { getLocalDateKey, isSameLocalDay } from './date';

const FOOD_LOG_STORAGE_KEY = '@herbalife/food_log_entries';

function filterTodayEntries(entries: LogEntry[]): LogEntry[] {
  const today = getLocalDateKey();
  return entries.filter((entry) => isSameLocalDay(entry.loggedAt, today));
}

export async function loadFoodLogEntries(): Promise<LogEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(FOOD_LOG_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return filterTodayEntries(parsed as LogEntry[]);
  } catch {
    return [];
  }
}

export async function saveFoodLogEntries(entries: LogEntry[]): Promise<void> {
  try {
    await AsyncStorage.setItem(FOOD_LOG_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Persistence failures should not block logging in the UI.
  }
}
