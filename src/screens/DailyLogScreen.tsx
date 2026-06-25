import React, { useMemo } from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LogEntryRow from '../components/LogEntryRow';
import { useFoodLog } from '../hooks/FoodLogContext';
import { LogEntry, MealSlot } from '../types';
import { Colors, Spacing, FontSize } from '../theme';

/**
 * DailyLogScreen: starter stub
 *
 * This screen should display the user's food log for today, organized by
 * meal slot (Breakfast, Lunch, Dinner, Snack). Right now it shows a
 * placeholder. Your job is to bring it to life.
 *
 * Suggested features to implement (see EXERCISE.md and TODO.md for full list):
 *   - Render logged entries, grouped by meal slot
 *   - Show per-entry calorie and macro info
 *   - Allow removing an entry from the log
 *   - Display a running total at the top or bottom
 */

const MEAL_SECTIONS: { slot: MealSlot; title: string }[] = [
  { slot: 'breakfast', title: 'Breakfast' },
  { slot: 'lunch', title: 'Lunch' },
  { slot: 'dinner', title: 'Dinner' },
  { slot: 'snack', title: 'Snack' },
];

export default function DailyLogScreen() {
  const insets = useSafeAreaInsets();
  const { entries, removeEntry } = useFoodLog();

  const sections = useMemo(() => {
    const bySlot = new Map<MealSlot, LogEntry[]>();
    for (const { slot } of MEAL_SECTIONS) {
      bySlot.set(slot, []);
    }
    for (const entry of entries) {
      bySlot.get(entry.mealSlot)?.push(entry);
    }
    return MEAL_SECTIONS.map(({ slot, title }) => ({
      title,
      data: bySlot.get(slot) ?? [],
    })).filter((section) => section.data.length > 0);
  }, [entries]);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
        <Text style={styles.title}>Today's Log</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      {/* TODO: Replace this placeholder with the actual daily log UI */}
      {entries.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🥗</Text>
          <Text style={styles.emptyTitle}>Your log is empty</Text>
          <Text style={styles.emptySubtitle}>Search for foods and tap + to add them here</Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <LogEntryRow entry={item} onRemove={removeEntry} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionTitle}>{title}</Text>
          )}
          contentContainerStyle={styles.list}
          stickySectionHeadersEnabled={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  date: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  list: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyIcon: {
    fontSize: 56,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
