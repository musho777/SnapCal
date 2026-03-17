import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import UIInput from '../../../common-ui/uIInput';

const servingsOptions = ['1', '2', '3', '4', '6', '8'];

export const Step3RecipeInfo = ({ data, setData }) => {

  const updateRecipeInfo = (field, value) => {
    setData(prev => ({
      ...prev,
      recipeInfo: {
        ...prev.recipeInfo,
        [field]: value,
      },
    }));
  };

  return (
    <View style={localStyles.container}>
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
});
