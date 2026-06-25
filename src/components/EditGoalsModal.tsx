import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { DailyGoals } from '../types';
import { DEFAULT_DAILY_GOALS } from '../constants/goals';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme';

interface EditGoalsModalProps {
  visible: boolean;
  goals: DailyGoals;
  onSave: (goals: DailyGoals) => void;
  onReset: () => void;
  onClose: () => void;
}

type GoalField = keyof DailyGoals;

const GOAL_FIELDS: { key: GoalField; label: string; unit: string }[] = [
  { key: 'calories', label: 'Calories', unit: 'kcal' },
  { key: 'protein', label: 'Protein', unit: 'g' },
  { key: 'carbs', label: 'Carbs', unit: 'g' },
  { key: 'fat', label: 'Fat', unit: 'g' },
];

export default function EditGoalsModal({
  visible,
  goals,
  onSave,
  onReset,
  onClose,
}: EditGoalsModalProps) {
  const [draft, setDraft] = useState(() => toDraftGoals(goals));
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const parsed = parseDraftGoals(draft);
    if (!parsed) {
      setError('Enter a whole number greater than 0 for each goal.');
      return;
    }
    onSave(parsed);
    onClose();
  };

  const handleReset = () => {
    setDraft(toDraftGoals(DEFAULT_DAILY_GOALS));
    onReset();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <Text style={styles.title}>Edit Daily Goals</Text>
              <Text style={styles.subtitle}>Set your calorie and macro targets</Text>

              {GOAL_FIELDS.map(({ key, label, unit }) => (
                <View key={key} style={styles.field}>
                  <Text style={styles.label}>{label}</Text>
                  <View style={styles.inputRow}>
                    <TextInput
                      style={styles.input}
                      value={draft[key]}
                      onChangeText={(value) => {
                        setDraft((current) => ({ ...current, [key]: value }));
                        setError(null);
                      }}
                      keyboardType="number-pad"
                      inputMode="numeric"
                      placeholder={String(DEFAULT_DAILY_GOALS[key])}
                      placeholderTextColor={Colors.textMuted}
                    />
                    <Text style={styles.unit}>{unit}</Text>
                  </View>
                </View>
              ))}

              {error && <Text style={styles.error}>{error}</Text>}

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Text style={styles.secondaryButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleSave}
                  activeOpacity={0.7}
                >
                  <Text style={styles.primaryButtonText}>Save Goals</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleReset}
                activeOpacity={0.7}
              >
                <Text style={styles.resetButtonText}>Reset to defaults</Text>
              </TouchableOpacity>
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

type DraftGoals = Record<GoalField, string>;

function toDraftGoals(goals: DailyGoals): DraftGoals {
  return {
    calories: String(goals.calories),
    protein: String(goals.protein),
    carbs: String(goals.carbs),
    fat: String(goals.fat),
  };
}

function parseDraftGoals(draft: DraftGoals): DailyGoals | null {
  const parsed: DailyGoals = {
    calories: Number.parseInt(draft.calories, 10),
    protein: Number.parseInt(draft.protein, 10),
    carbs: Number.parseInt(draft.carbs, 10),
    fat: Number.parseInt(draft.fat, 10),
  };

  if (
    Number.isNaN(parsed.calories) ||
    Number.isNaN(parsed.protein) ||
    Number.isNaN(parsed.carbs) ||
    Number.isNaN(parsed.fat) ||
    parsed.calories <= 0 ||
    parsed.protein <= 0 ||
    parsed.carbs <= 0 ||
    parsed.fat <= 0
  ) {
    return null;
  }

  return parsed;
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  keyboardView: {
    width: '100%',
    maxWidth: 360,
  },
  sheet: {
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
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  field: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  unit: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    minWidth: 32,
  },
  error: {
    fontSize: FontSize.sm,
    color: Colors.error,
    marginBottom: Spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.surface,
  },
  resetButton: {
    marginTop: Spacing.md,
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  resetButtonText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.primary,
  },
});
