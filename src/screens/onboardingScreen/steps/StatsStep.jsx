import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { calculateBMI, getBMICategory } from '../constants';
import UIInput from '../../../common-ui/uIInput/UIInput';

const StatsStep = ({ data, onUpdateData, accentColor, accentLight }) => {
  const [focusedInput, setFocusedInput] = useState(null);

  const bmi = calculateBMI(data.weight, data.height);
  const bmiCategory = getBMICategory(bmi);

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
          <View style={styles.inputWrapper}>
            <UIInput
              label="Age"
              variant="meal"
              placeholder="Enter your age"
              value={data.age}
              onChangeText={text => onUpdateData({ age: text })}
              keyboardType="numeric"
              containerStyle={[
                styles.inputContainer,
                focusedInput === 'age' && {
                  borderColor: accentColor,
                },
              ]}
              onFocus={() => setFocusedInput('age')}
              onBlur={() => setFocusedInput(null)}
            />
            <Text style={styles.unit}>years</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200)} style={styles.section}>
          <View style={styles.inputWrapper}>
            <UIInput
              label="Weight"
              variant="meal"
              placeholder="Enter your weight"
              value={data.weight}
              onChangeText={text => onUpdateData({ weight: text })}
              keyboardType="decimal-pad"
              containerStyle={[
                styles.inputContainer,
                focusedInput === 'weight' && {
                  borderColor: accentColor,
                },
              ]}
              onFocus={() => setFocusedInput('weight')}
              onBlur={() => setFocusedInput(null)}
            />
            <Text style={styles.unit}>kg</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300)} style={styles.section}>
          <View style={styles.inputWrapper}>
            <UIInput
              label="Height"
              variant="meal"
              placeholder="Enter your height"
              value={data.height}
              onChangeText={text => onUpdateData({ height: text })}
              keyboardType="numeric"
              containerStyle={[
                styles.inputContainer,
                focusedInput === 'height' && {
                  borderColor: accentColor,
                },
              ]}
              onFocus={() => setFocusedInput('height')}
              onBlur={() => setFocusedInput(null)}
            />
            <Text style={styles.unit}>cm</Text>
          </View>
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
  inputWrapper: {
    position: 'relative',
  },
  inputContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    paddingRight: 60,
    borderWidth: 2,
    borderColor: '#F0F0F0',
  },
  unit: {
    position: 'absolute',
    right: 20,
    top: 38,
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '600',
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
