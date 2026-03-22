import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useCreateMeal } from '../../contexts/CreateMealContext';
import UIInput from '../../common-ui/uIInput';
import { UIButton } from '../../common-ui/uIButton';

const servingsOptions = ['1', '2', '3', '4', '6', '8'];

export const Step3RecipeInfoScreen = ({ navigation }) => {
  const { data, setData } = useCreateMeal();
  const [validationError, setValidationError] = useState('');

  const updateRecipeInfo = (field, value) => {
    setData(prev => ({
      ...prev,
      recipeInfo: {
        ...prev.recipeInfo,
        [field]: value,
      },
    }));
  };

  const handleContinue = () => {
    setValidationError('');
    navigation.navigate('Step4Ingredients');
  };

  return (
    <View style={localStyles.container}>
      <ScrollView
        style={localStyles.scrollView}
        contentContainerStyle={localStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={localStyles.componentContainer}>
          <View style={localStyles.card}>
            <Text style={localStyles.label}>Description</Text>
            <UIInput
              variant="meal"
              placeholder="Describe your meal..."
              multiline={true}
              numberOfLines={4}
              value={data.recipeInfo.description}
              onChangeText={value => updateRecipeInfo('description', value)}
            />
          </View>

          <View style={localStyles.card}>
            <Text style={localStyles.label}>Time</Text>
            <View style={localStyles.timeRow}>
              <UIInput
                variant="meal"
                label="PREP TIME"
                icon="⏱"
                placeholder="15 min"
                value={data.recipeInfo.prepTime}
                onChangeText={value => updateRecipeInfo('prepTime', value)}
                style={localStyles.timeInput}
              />

              <UIInput
                variant="meal"
                label="COOK TIME"
                icon="🍳"
                placeholder="20 min"
                value={data.recipeInfo.cookTime}
                onChangeText={value => updateRecipeInfo('cookTime', value)}
                style={localStyles.timeInput}
              />
            </View>
          </View>

          <View style={localStyles.card}>
            <Text style={localStyles.label}>Servings</Text>
            <View style={localStyles.servingsRow}>
              {servingsOptions.map(serving => {
                const isActive = data.recipeInfo.servings === serving;
                return (
                  <TouchableOpacity
                    key={serving}
                    style={[
                      localStyles.servingPill,
                      isActive && localStyles.servingPillActive,
                    ]}
                    onPress={() => updateRecipeInfo('servings', serving)}
                  >
                    <Text
                      style={[
                        localStyles.servingText,
                        isActive && localStyles.servingTextActive,
                      ]}
                    >
                      {serving}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
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
  componentContainer: {
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
  timeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timeInput: {
    flex: 1,
  },
  servingsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  servingPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#EEEEEE',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  servingPillActive: {
    backgroundColor: '#272727',
    borderColor: '#272727',
  },
  servingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#272727',
  },
  servingTextActive: {
    color: '#fff',
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
