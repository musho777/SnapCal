import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { calculateBMI, getBMICategory } from '../constants';
import UISelect from '../../../common-ui/uISelect';

const StatsStep = ({ data, onUpdateData, accentColor, accentLight }) => {
  const bmi = calculateBMI(data.weight, data.height);
  const bmiCategory = getBMICategory(bmi);

  const ageOptions = Array.from({ length: 88 }, (_, i) => ({
    label: `${i + 13} years`,
    value: (i + 13).toString(),
  }));

  const weightOptions = Array.from({ length: 171 }, (_, i) => ({
    label: `${i + 30} kg`,
    value: (i + 30).toString(),
  }));

  const heightOptions = Array.from({ length: 151 }, (_, i) => ({
    label: `${i + 100} cm`,
    value: (i + 100).toString(),
  }));

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Animated.View entering={FadeInUp.delay(0)} style={styles.section}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderRow}>
            <TouchableOpacity
              onPress={() => onUpdateData({ gender: 'male' })}
              style={[
                styles.genderPill,
                data.gender === 'male' && {
                  borderColor: accentColor,
                  backgroundColor: accentLight,
                },
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.genderText,
                  data.gender === 'male' && { color: accentColor },
                ]}
              >
                Male
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onUpdateData({ gender: 'female' })}
              style={[
                styles.genderPill,
                data.gender === 'female' && {
                  borderColor: accentColor,
                  backgroundColor: accentLight,
                },
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.genderText,
                  data.gender === 'female' && { color: accentColor },
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(100)} style={styles.section}>
          <UISelect
            label="Age"
            variant="meal"
            placeholder="Select your age"
            value={data.age}
            onValueChange={value => onUpdateData({ age: value })}
            options={ageOptions}
            containerStyle={styles.inputContainer}
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200)} style={styles.section}>
          <UISelect
            label="Weight"
            variant="meal"
            placeholder="Select your weight"
            value={data.weight}
            onValueChange={value => onUpdateData({ weight: value })}
            options={weightOptions}
            containerStyle={[styles.inputContainer]}
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300)} style={styles.section}>
          <UISelect
            label="Height"
            variant="meal"
            placeholder="Select your height"
            value={data.height}
            onValueChange={value => onUpdateData({ height: value })}
            options={heightOptions}
            containerStyle={styles.inputContainer}
          />
        </Animated.View>

        {bmi && bmiCategory && (
          <Animated.View
            entering={FadeInUp.delay(400).duration(400)}
            style={[
              styles.bmiCard,
              {
                borderColor: bmiCategory.color + '33',
              },
            ]}
          >
            <View style={styles.bmiHeader}>
              <Text style={styles.bmiLabel}>Your BMI</Text>
              <View
                style={[
                  styles.bmiBadge,
                  { backgroundColor: bmiCategory.color },
                ]}
              >
                <Text style={styles.bmiBadgeText}>{bmiCategory.category}</Text>
              </View>
            </View>
            <Text style={styles.bmiValue}>{bmi}</Text>
          </Animated.View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 40,
  },
  container: {
    gap: 20,
  },
  section: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 12,
  },
  genderPill: {
    flex: 1,
    padding: 14,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#F0F0F0',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  genderText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  inputContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F0F0F0',
  },
  bmiCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 18,
    borderWidth: 2,
    marginTop: 8,
  },
  bmiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bmiLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  bmiBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  bmiBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  bmiValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1A1A1A',
    letterSpacing: -1,
  },
});

export default StatsStep;
