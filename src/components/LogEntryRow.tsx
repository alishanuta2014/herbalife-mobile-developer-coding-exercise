import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LogEntry } from '../types';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme';

interface LogEntryRowProps {
  entry: LogEntry;
  onRemove?: (entryId: string) => void;
}

export default function LogEntryRow({ entry, onRemove }: LogEntryRowProps) {
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

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemove?.(entry.id)}
        activeOpacity={0.7}
        accessibilityLabel={`Remove ${food.name}`}
        accessibilityRole="button"
      >
        <Ionicons name="trash-outline" size={18} color={Colors.error} />
      </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  info: {
    flex: 1,
    marginRight: Spacing.sm,
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
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
