import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFoodLog } from '../hooks/FoodLogContext';
import {
  calculateNutritionTotals,
  roundNutritionTotals,
  calculateGoalProgress,
  calculateRemaining,
  calculateOverGoal,
} from '../utils/nutrition';
import { DailyGoals } from '../types';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme';

/**
 * SummaryScreen: starter stub
 *
 * This screen should give the user a clear picture of their nutrition for
 * the day: how much they've eaten vs. their goals, broken down by macro.
 *
 * Suggested features to implement (see EXERCISE.md and TODO.md for full list):
 *   - Pull today's logged entries and compute totals
 *   - Display calorie progress toward a daily goal
 *   - Show protein / carbs / fat breakdown (progress bars, rings, or
 *     whatever visualization feels right, your call)
 *   - Optionally allow the user to set or adjust daily goals
 */

const DEFAULT_GOALS: DailyGoals = {
  calories: 2000,
  protein: 150,
  carbs: 200,
  fat: 65,
};

export default function SummaryScreen() {
  const insets = useSafeAreaInsets();
  const { entries } = useFoodLog();

  // TODO: Replace these zeros with real computed values from the log
  const totals = useMemo(() => roundNutritionTotals(calculateNutritionTotals(entries)), [entries]);

  const goals = DEFAULT_GOALS;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + Spacing.lg }]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Summary</Text>
        <Text style={styles.subtitle}>What's left to hit your daily goals</Text>
      </View>

      {/* Calorie Card */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Calories</Text>
        <RemainingHero value={totals.calories} goal={goals.calories} unit="kcal" />
        <Text style={styles.consumedCaption}>
          {totals.calories} / {goals.calories} kcal consumed
        </Text>
        {/* TODO: Add a progress bar or ring here */}
        <ProgressBar value={totals.calories} goal={goals.calories} color={Colors.primary} />
      </View>

      {/* Macro Cards */}
      <View style={styles.macroRow}>
        <MacroCard
          label="Protein"
          value={totals.protein}
          goal={goals.protein}
          color={Colors.protein}
        />
        <MacroCard label="Carbs" value={totals.carbs} goal={goals.carbs} color={Colors.carbs} />
        <MacroCard label="Fat" value={totals.fat} goal={goals.fat} color={Colors.fat} />
      </View>

      {/* TODO: Add a per-meal-slot breakdown, or any other summary info */}
    </ScrollView>
  );
}

interface MacroCardProps {
  label: string;
  value: number;
  goal: number;
  color: string;
}

function MacroCard({ label, value, goal, color }: MacroCardProps) {
  return (
    <View style={[styles.card, styles.macroCard]}>
      <Text style={[styles.macroLabel, { color }]}>{label}</Text>
      <RemainingHero value={value} goal={goal} unit="g" compact color={color} />
      <Text style={styles.macroConsumed}>
        {value}g of {goal}g consumed
      </Text>
      <ProgressBar value={value} goal={goal} color={color} />
    </View>
  );
}

interface ProgressBarProps {
  value: number;
  goal: number;
  color?: string;
}

function ProgressBar({ value, goal, color = Colors.primary }: ProgressBarProps) {
  const pct = calculateGoalProgress(value, goal);

  return (
    <View style={styles.progressBar}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.progressLabel}>{Math.round(pct)}%</Text>
    </View>
  );
}

interface RemainingHeroProps {
  value: number;
  goal: number;
  unit: string;
  compact?: boolean;
  color?: string;
}

function RemainingHero({
  value,
  goal,
  unit,
  compact,
  color = Colors.textPrimary,
}: RemainingHeroProps) {
  const over = calculateOverGoal(value, goal);
  const remaining = calculateRemaining(value, goal);

  if (over > 0) {
    return (
      <View style={styles.remainingHero}>
        <Text
          style={[compact ? styles.remainingValueCompact : styles.remainingValue, styles.overGoal]}
        >
          {over} {unit}
        </Text>
        <Text style={[styles.remainingLabel, compact && styles.remainingLabelCompact]}>
          over goal
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.remainingHero}>
      <Text style={[compact ? styles.remainingValueCompact : styles.remainingValue, { color }]}>
        {remaining} {unit}
      </Text>
      <Text style={[styles.remainingLabel, compact && styles.remainingLabelCompact]}>
        remaining
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
  },
  remainingHero: {
    marginBottom: Spacing.xs,
  },
  remainingValue: {
    fontSize: FontSize.xxxl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  remainingValueCompact: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  remainingLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  remainingLabelCompact: {
    fontSize: FontSize.xs,
  },
  consumedCaption: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  progressTrack: {
    flex: 1,
    height: 12,
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
  },
  progressLabel: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
    minWidth: 32,
    textAlign: 'right',
  },
  overGoal: {
    color: Colors.warning,
  },
  macroRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  macroCard: {
    flex: 1,
    marginBottom: 0,
  },
  macroLabel: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  macroConsumed: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },
});
