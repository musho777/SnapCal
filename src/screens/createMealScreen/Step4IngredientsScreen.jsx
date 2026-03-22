import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useCreateMeal } from '../../contexts/CreateMealContext';
import UIInput from '../../common-ui/uIInput';
import { UIButton } from '../../common-ui/uIButton';

export const Step4IngredientsScreen = ({ navigation }) => {
  const { data, setData } = useCreateMeal();
  const [validationError, setValidationError] = useState('');

  const addIngredient = () => {
    setData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', amount: '' }],
    }));
  };

  const removeIngredient = index => {
    if (data.ingredients.length > 1) {
      setData(prev => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index),
      }));
    }
  };

  const updateIngredient = (index, field, value) => {
    setData(prev => {
      const newIngredients = [...prev.ingredients];
      newIngredients[index] = {
        ...newIngredients[index],
        [field]: value,
      };
      return { ...prev, ingredients: newIngredients };
    });
  };

  const handleContinue = () => {
    setValidationError('');
    navigation.navigate('Step5CookingSteps');
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
            <View style={localStyles.header}>
              <Text style={localStyles.label}>Ingredients</Text>
              <Text style={localStyles.count}>{data.ingredients.length} added</Text>
            </View>

            {data.ingredients.map((ingredient, index) => (
              <View key={index} style={localStyles.row}>
                <View style={localStyles.numberCircle}>
                  <Text style={localStyles.numberText}>{index + 1}</Text>
                </View>
                <UIInput
                  variant="meal"
                  placeholder="Ingredient name"
                  value={ingredient.name}
                  onChangeText={value => updateIngredient(index, 'name', value)}
                  style={localStyles.nameInput}
                />
                <UIInput
                  variant="meal"
                  placeholder="Amount"
                  value={ingredient.amount}
                  onChangeText={value => updateIngredient(index, 'amount', value)}
                  style={localStyles.amountInput}
                />
                {data.ingredients.length > 1 && (
                  <TouchableOpacity
                    style={localStyles.deleteButton}
                    onPress={() => removeIngredient(index)}
                  >
                    <Text style={localStyles.deleteIcon}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            <TouchableOpacity style={localStyles.addButton} onPress={addIngredient}>
              <Text style={localStyles.addButtonText}>+ Add Ingredient</Text>
            </TouchableOpacity>
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
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#272727',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  count: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  numberCircle: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  nameInput: {
    flex: 2,
  },
  amountInput: {
    flex: 1,
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '700',
  },
  addButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#DDDDDD',
    borderRadius: 14,
    padding: 11,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
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
