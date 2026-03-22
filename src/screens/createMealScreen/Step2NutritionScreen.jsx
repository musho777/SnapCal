import React, { useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { useCreateMeal } from '../../contexts/CreateMealContext';
import { UIButton } from '../../common-ui/uIButton';
import { HealthScoreBar } from '../recipeScreen/components/HealthScoreBar';
import { calculateHealthScore } from '../../utils/healthScore';
import { CaloriesCard } from '../../components/cards/CaloriesCard';
import UIInput from '../../common-ui/uIInput';
import { macroConfig } from '../../constants/constants';

export const Step2NutritionScreen = ({ navigation }) => {
  const { data, setData } = useCreateMeal();
  const [validationError, setValidationError] = useState('');

  const getValidationError = useMemo(() => {
    if (!data.totalCalories || data.totalCalories <= 0) {
      return 'Please enter total calories (must be greater than 0)';
    }
    return null;
  }, [data]);

  const canProceed = useMemo(() => {
    return getValidationError === null;
  }, [getValidationError]);

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

  const handleContinue = () => {
    setValidationError('');

    if (!canProceed) {
      setValidationError(getValidationError);
      return;
    }

    navigation.navigate('Step3RecipeInfo');
  };

  return (
    <View style={localStyles.container}>
      <ScrollView
        style={localStyles.scrollView}
        contentContainerStyle={localStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={localStyles.content}>
          <View style={localStyles.card}>
            <Text style={localStyles.label}>
              Total Calories
              <Text style={localStyles.required}> *</Text>
            </Text>
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
                console.log(macro);
                return (
                  <CaloriesCard
                    key={macro.type}
                    themes="dark"
                    type={macro.type}
                    data={data.macros[index]?.weight}
                  />
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
                        style={[
                          localStyles.sliderValue,
                          { color: macro.color },
                        ]}
                      >
                        {macroData?.weight}g
                      </Text>
                    </View>
                    <Slider
                      style={localStyles.slider}
                      minimumValue={0}
                      maximumValue={300}
                      step={1}
                      value={macroData?.weight}
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
      </ScrollView>

      <View style={localStyles.gradient}>
        {validationError ? (
          <View style={localStyles.errorContainer}>
            <Text style={localStyles.errorText}>{validationError}</Text>
          </View>
        ) : null}

        <UIButton
          onPress={handleContinue}
          backgroundColor="#272727"
          color="white"
          style={localStyles.buttonStyles}
          title="Continue"
        />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 120,
  },
  content: {
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
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginBottom: 8,
  },
  required: {
    color: '#FF6B6B',
    fontWeight: '700',
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
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  errorText: {
    color: '#991B1B',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonStyles: {
    paddingVertical: 20,
  },
});
