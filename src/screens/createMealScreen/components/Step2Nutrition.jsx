import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { HealthScoreBar } from '../../recipeScreen/components/HealthScoreBar';
import { calculateHealthScore } from '../../../utils/healthScore';
import { CaloriesCard } from '../../../components/cards/CaloriesCard';
import UIInput from '../../../common-ui/uIInput';

const macroConfig = [
  { type: 'Carbs', color: '#4CAF50', icon: '🌾' },
  { type: 'Protein', color: '#2196F3', icon: '🥩' },
  { type: 'Fat', color: '#FF9800', icon: '🥑' },
];

export const Step2Nutrition = ({ data, setData }) => {
  const updateCalories = calories => {
    setData(prev => ({ ...prev, totalCalories: calories }));
  };

  const updateMacro = (index, value) => {
    setData(prev => {
      const newMacros = [...prev.macros];
      newMacros[index] = {
        ...newMacros[index],
        weight: Math.round(value),
      };
      return { ...prev, macros: newMacros };
    });
  };

  const healthData = useMemo(() => {
    return calculateHealthScore(data.macros);
  }, [data.macros]);

  return (
    <View style={localStyles.container}>
      <View style={localStyles.card}>
        <Text style={localStyles.label}>Total Calories</Text>
        <View style={localStyles.caloriesRow}>
          <View style={localStyles.caloriesLabelContainer}>
            <Text style={localStyles.caloriesLabel}>Total</Text>
          </View>
          <View style={localStyles.caloriesInputWrapper}>
            <UIInput
              variant="meal"
              placeholder="0"
              keyboardType="numeric"
              value={data.totalCalories.toString()}
              onChangeText={updateCalories}
              containerStyle={localStyles.caloriesInputStyle}
            />
          </View>
          <View style={localStyles.caloriesUnitContainer}>
            <Text style={localStyles.caloriesUnit}>Kcal 🔥</Text>
          </View>
        </View>
      </View>

      <View style={localStyles.card}>
        <Text style={localStyles.label}>Macronutrients</Text>
        <View style={localStyles.macroCardsRow}>
          {macroConfig.map((macro, index) => {
            const macroData = data.macros[index];
            return (
              <CaloriesCard key={macro.type} themes="dark" data={macroData} />
            );
          })}
        </View>

        <View style={localStyles.slidersContainer}>
          {macroConfig.map((macro, index) => {
            const macroData = data.macros[index];
            return (
              <View key={macro.type} style={localStyles.sliderSection}>
                <View style={localStyles.sliderHeader}>
                  <Text style={localStyles.sliderLabel}>{macro.type}</Text>
                  <Text
                    style={[localStyles.sliderValue, { color: macro.color }]}
                  >
                    {macroData.weight}g
                  </Text>
                </View>
                <Slider
                  style={localStyles.slider}
                  minimumValue={0}
                  maximumValue={300}
                  step={1}
                  value={macroData.weight}
                  onValueChange={value => updateMacro(index, value)}
                  minimumTrackTintColor={macro.color}
                  maximumTrackTintColor="#E5E5E5"
                  thumbTintColor={macro.color}
                />
              </View>
            );
          })}
        </View>
      </View>

      <HealthScoreBar score={healthData.score} />
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#272727',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  caloriesRow: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    alignItems: 'center',
    overflow: 'hidden',
  },
  caloriesLabelContainer: {
    padding: 13,
    borderRightWidth: 1,
    borderRightColor: '#EEEEEE',
  },
  caloriesLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  caloriesInputWrapper: {
    flex: 1,
  },
  caloriesInputStyle: {
    fontWeight: '700',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  caloriesUnitContainer: {
    padding: 13,
    borderLeftWidth: 1,
    borderLeftColor: '#EEEEEE',
  },
  caloriesUnit: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  macroCardsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  macroCard: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  macroIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginBottom: 8,
  },
  macroIcon: {
    fontSize: 18,
  },
  macroWeight: {
    fontSize: 20,
    fontWeight: '900',
    color: '#272727',
    marginBottom: 4,
  },
  macroWeightUnit: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  macroType: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  slidersContainer: {
    gap: 16,
  },
  sliderSection: {
    gap: 8,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#272727',
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
