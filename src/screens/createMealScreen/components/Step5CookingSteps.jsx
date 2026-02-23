import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export const Step5CookingSteps = ({ data, setData }) => {
  const addStep = () => {
    setData(prev => ({
      ...prev,
      cookingSteps: [...prev.cookingSteps, ''],
    }));
  };

  const removeStep = index => {
    if (data.cookingSteps.length > 1) {
      setData(prev => ({
        ...prev,
        cookingSteps: prev.cookingSteps.filter((_, i) => i !== index),
      }));
    }
  };

  const updateStep = (index, value) => {
    setData(prev => {
      const newSteps = [...prev.cookingSteps];
      newSteps[index] = value;
      return { ...prev, cookingSteps: newSteps };
    });
  };

  return (
    <View style={localStyles.container}>
      <View style={localStyles.card}>
        <View style={localStyles.header}>
          <Text style={localStyles.label}>Cooking Steps</Text>
          <Text style={localStyles.count}>{data.cookingSteps.length} steps</Text>
        </View>

        {data.cookingSteps.map((step, index) => (
          <View key={index} style={localStyles.row}>
            <View style={localStyles.numberCircle}>
              <Text style={localStyles.numberText}>{index + 1}</Text>
            </View>
            <TextInput
              style={localStyles.textarea}
              placeholder="Describe this step..."
              placeholderTextColor="#999"
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
              value={step}
              onChangeText={value => updateStep(index, value)}
            />
            {data.cookingSteps.length > 1 && (
              <TouchableOpacity
                style={localStyles.deleteButton}
                onPress={() => removeStep(index)}
              >
                <Text style={localStyles.deleteIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity style={localStyles.addButton} onPress={addStep}>
          <Text style={localStyles.addButtonText}>+ Add Step</Text>
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
    gap: 10,
    alignItems: 'flex-start',
  },
  numberCircle: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  numberText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  textarea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    padding: 10,
    fontSize: 13,
    color: '#272727',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    minHeight: 72,
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
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
