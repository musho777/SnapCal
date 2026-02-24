import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeInUp,
} from 'react-native-reanimated';
import { calculateMacros } from '../constants';

const CaloriesStep = ({
  suggestedCalories,
  customCalories,
  onSetCustomCalories,
  accentColor,
  accentLight,
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState(
    customCalories ? customCalories.toString() : '',
  );

  const inputHeight = useSharedValue(0);

  React.useEffect(() => {
    inputHeight.value = withTiming(showCustomInput ? 70 : 0, {
      duration: 300,
    });
  }, [inputHeight, showCustomInput]);

  const inputAnimatedStyle = useAnimatedStyle(() => ({
    height: inputHeight.value,
    opacity: inputHeight.value / 70,
  }));

  const handleSetCustom = () => {
    const value = parseInt(customValue, 10);
    if (!isNaN(value) && value > 0) {
      onSetCustomCalories(value);
    }
  };

  const displayedCalories = customCalories || suggestedCalories;
  const macros = calculateMacros(displayedCalories, 'maintain');

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        {/* Calorie Card */}
        <Animated.View
          entering={FadeInUp.delay(0)}
          style={[
            styles.calorieCard,
            {
              backgroundColor: accentLight,
              borderColor: accentColor + '33',
              ...Platform.select({
                ios: {
                  shadowColor: accentColor,
                  shadowOpacity: 0.2,
                  shadowRadius: 32,
                  shadowOffset: { width: 0, height: 8 },
                },
                android: {
                  elevation: 8,
                },
              }),
            },
          ]}
        >
          <Text style={styles.calorieLabel}>Daily Calorie Goal</Text>
          <Text style={styles.calorieValue}>{displayedCalories}</Text>
          <Text style={styles.calorieUnit}>calories/day</Text>

          {/* Macros Row */}
          <View style={styles.macrosRow}>
            <MacroPill
              label="Protein"
              value={`${macros.protein}g`}
              color="#4A90D9"
            />
            <MacroPill
              label="Carbs"
              value={`${macros.carbs}g`}
              color="#3DBE7A"
            />
            <MacroPill label="Fat" value={`${macros.fat}g`} color="#FF8C42" />
          </View>
        </Animated.View>

        {/* Info Text */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.infoBox}>
          <Text style={styles.infoIcon}>💡</Text>
          <Text style={styles.infoText}>
            {customCalories
              ? 'Your custom goal is all set! You can always adjust this later in settings.'
              : 'This goal is calculated based on your profile and activity level to help you reach your target.'}
          </Text>
        </Animated.View>

        {/* Custom Goal Toggle */}
        <Animated.View entering={FadeInUp.delay(200)}>
          <TouchableOpacity
            onPress={() => setShowCustomInput(!showCustomInput)}
            style={styles.customButton}
            activeOpacity={0.7}
          >
            <Text style={[styles.customButtonText, { color: accentColor }]}>
              {showCustomInput ? 'Use suggested goal' : 'Set custom goal'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Custom Input */}
        <Animated.View style={[styles.customInputWrapper, inputAnimatedStyle]}>
          <View style={styles.customInputContainer}>
            <TextInput
              style={[
                styles.customInput,
                {
                  borderColor: accentColor,
                },
              ]}
              placeholder="2000"
              placeholderTextColor="#C0C0C0"
              value={customValue}
              onChangeText={setCustomValue}
              keyboardType="numeric"
              textAlign="center"
            />
            <TouchableOpacity
              onPress={handleSetCustom}
              style={[styles.setButton, { backgroundColor: accentColor }]}
              activeOpacity={0.8}
            >
              <Text style={styles.setButtonText}>Set</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const MacroPill = ({ label, value, color }) => (
  <View style={styles.macroPill}>
    <Text style={styles.macroLabel}>{label}</Text>
    <Text style={[styles.macroValue, { color }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 8,
  },
  container: {
    gap: 20,
  },
  calorieCard: {
    borderRadius: 28,
    padding: 28,
    paddingVertical: 32,
    alignItems: 'center',
    borderWidth: 2,
  },
  calorieLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  calorieValue: {
    fontSize: 64,
    fontWeight: '900',
    color: '#1A1A1A',
    letterSpacing: -3,
  },
  calorieUnit: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 4,
  },
  macrosRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
    width: '100%',
  },
  macroPill: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    gap: 4,
  },
  macroLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  macroValue: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  infoBox: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
  },
  customButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  customButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  customInputWrapper: {
    overflow: 'hidden',
  },
  customInputContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  customInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '900',
    borderWidth: 2,
    borderRadius: 16,
    padding: 14,
    backgroundColor: '#fff',
  },
  setButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
  },
  setButtonText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#fff',
  },
});

export default CaloriesStep;
