import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export const Step4Ingredients = ({ data, setData }) => {
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

  return (
    <View style={localStyles.container}>
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
            <TextInput
              style={[localStyles.input, localStyles.nameInput]}
              placeholder="Ingredient name"
              placeholderTextColor="#999"
              value={ingredient.name}
              onChangeText={value => updateIngredient(index, 'name', value)}
            />
            <TextInput
              style={[localStyles.input, localStyles.amountInput]}
              placeholder="Amount"
              placeholderTextColor="#999"
              value={ingredient.amount}
              onChangeText={value => updateIngredient(index, 'amount', value)}
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
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    padding: 10,
    fontSize: 13,
    color: '#272727',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
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
});
