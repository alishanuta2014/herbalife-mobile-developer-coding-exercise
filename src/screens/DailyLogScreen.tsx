import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
export default function DailyLogScreen() {
  const insets = useSafeAreaInsets();
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
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>🥗</Text>
        <Text style={styles.emptyTitle}>Your log is empty</Text>
        <Text style={styles.emptySubtitle}>Search for foods and tap + to add them here</Text>
      </View>
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
