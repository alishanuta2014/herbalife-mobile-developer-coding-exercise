import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LogEntry } from '../types';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme';

interface LogEntryRowProps {
  entry: LogEntry;
}

export default function LogEntryRow({ entry }: LogEntryRowProps) {
  const { food, servings } = entry;
  const servingLabel = servings === 1 ? '1 serving' : `${servings} servings`;

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {food.name}
        </Text>
        <Text style={styles.serving}>
          {servingLabel} · {food.servingSize}
        </Text>
        <View style={styles.macros}>
          <MacroPill label="Cal" value={Math.round(food.calories * servings)} />
          <MacroPill
            label="P"
            value={Math.round(food.protein * servings)}
            unit="g"
            color={Colors.protein}
          />
          <MacroPill
            label="C"
            value={Math.round(food.carbs * servings)}
            unit="g"
            color={Colors.carbs}
          />
          <MacroPill
            label="F"
            value={Math.round(food.fat * servings)}
            unit="g"
            color={Colors.fat}
          />
        </View>
      </View>
    </View>
  );
}

interface MacroPillProps {
  label: string;
  value: number;
  unit?: string;
  color?: string;
}

function MacroPill({ label, value, unit, color = Colors.textPrimary }: MacroPillProps) {
  return (
    <View style={styles.macroPill}>
      <Text style={[styles.macroLabel, { color }]}>{label}</Text>
      <Text style={styles.macroValue}>
        {value}
        {unit ?? ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  serving: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },
  macros: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  macroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 2,
  },
  macroLabel: {
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  macroValue: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
});
