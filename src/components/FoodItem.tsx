import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Food } from '../types';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme';

interface FoodItemProps {
  food: Food;
  onAddToLog?: (food: Food) => void;
}

export default function FoodItem({ food, onAddToLog }: FoodItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>
            {food.name}
          </Text>
          {food.brand && <Text style={styles.brand}>{food.brand}</Text>}
        </View>
        <Text style={styles.serving}>{food.servingSize}</Text>
        <View style={styles.macros}>
          <MacroPill label="Cal" value={food.calories} color={Colors.textPrimary} />
          <MacroPill label="P" value={food.protein} unit="g" color={Colors.protein} />
          <MacroPill label="C" value={food.carbs} unit="g" color={Colors.carbs} />
          <MacroPill label="F" value={food.fat} unit="g" color={Colors.fat} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => onAddToLog?.(food)}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

interface MacroPillProps {
  label: string;
  value: number;
  unit?: string;
  color: string;
}

function MacroPill({ label, value, unit, color }: MacroPillProps) {
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
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  name: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginRight: Spacing.xs,
    flexShrink: 1,
  },
  brand: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
  addButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: Colors.surface,
    fontSize: FontSize.xl,
    fontWeight: '400',
    lineHeight: 36,
    textAlign: 'center',
  },
});
