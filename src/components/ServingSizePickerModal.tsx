import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable, Platform } from 'react-native';
import { Food, MealSlot } from '../types';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme';

export const SERVING_OPTIONS = [0.5, 1, 1.5, 2] as const;

export const MEAL_SLOT_OPTIONS: { slot: MealSlot; label: string }[] = [
  { slot: 'breakfast', label: 'Breakfast' },
  { slot: 'lunch', label: 'Lunch' },
  { slot: 'dinner', label: 'Dinner' },
  { slot: 'snack', label: 'Snack' },
];

interface ServingSizePickerModalProps {
  food: Food | null;
  selectedServings: number;
  selectedMealSlot: MealSlot;
  onSelectServings: (servings: number) => void;
  onSelectMealSlot: (mealSlot: MealSlot) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ServingSizePickerModal({
  food,
  selectedServings,
  selectedMealSlot,
  onSelectServings,
  onSelectMealSlot,
  onConfirm,
  onClose,
}: ServingSizePickerModalProps) {
  const visible = food !== null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          {food && (
            <>
              <Text style={styles.title}>Add to Log</Text>
              <Text style={styles.foodName} numberOfLines={2}>
                {food.name}
              </Text>
              <Text style={styles.servingSize}>{food.servingSize}</Text>

              <Text style={styles.label}>Servings</Text>
              <View style={styles.optionsRow}>
                {SERVING_OPTIONS.map((option) => {
                  const selected = selectedServings === option;
                  return (
                    <TouchableOpacity
                      key={option}
                      style={[styles.option, selected && styles.optionSelected]}
                      onPress={() => onSelectServings(option)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                        {formatServingOption(option)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={styles.label}>Meal</Text>
              <View style={styles.mealOptionsRow}>
                {MEAL_SLOT_OPTIONS.map(({ slot, label }) => {
                  const selected = selectedMealSlot === slot;
                  return (
                    <TouchableOpacity
                      key={slot}
                      style={[styles.mealOption, selected && styles.optionSelected]}
                      onPress={() => onSelectMealSlot(slot)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.mealOptionText, selected && styles.optionTextSelected]}>
                        {label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={styles.preview}>
                {Math.round(food.calories * selectedServings)} kcal per selection
              </Text>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose} activeOpacity={0.7}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={onConfirm}
                  activeOpacity={0.7}
                >
                  <Text style={styles.confirmButtonText}>Add to Log</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function formatServingOption(servings: number): string {
  return Number.isInteger(servings) ? String(servings) : servings.toFixed(1);
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  sheet: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Platform.select({
      web: {
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
      },
    }),
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  foodName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  servingSize: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  mealOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  mealOption: {
    width: '48%',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  mealOptionText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  option: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  optionText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  optionTextSelected: {
    color: Colors.primary,
  },
  preview: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.surface,
  },
});
