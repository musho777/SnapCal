import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const servingsOptions = ['1', '2', '3', '4', '6', '8'];

export const Step3RecipeInfo = ({ data, setData }) => {
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [prepTimeFocused, setPrepTimeFocused] = useState(false);
  const [cookTimeFocused, setCookTimeFocused] = useState(false);

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
        <TextInput
          style={[
            localStyles.textarea,
            descriptionFocused && localStyles.textareaFocused,
          ]}
          placeholder="Describe your meal..."
          placeholderTextColor="#999"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          value={data.recipeInfo.description}
          onChangeText={value => updateRecipeInfo('description', value)}
          onFocus={() => setDescriptionFocused(true)}
          onBlur={() => setDescriptionFocused(false)}
        />
      </View>

      <View style={localStyles.card}>
        <Text style={localStyles.label}>Time</Text>
        <View style={localStyles.timeRow}>
          <View style={localStyles.timeInput}>
            <Text style={localStyles.timeLabel}>PREP TIME</Text>
            <View style={localStyles.inputWithIcon}>
              <Text style={localStyles.inputIcon}>⏱</Text>
              <TextInput
                style={[
                  localStyles.input,
                  prepTimeFocused && localStyles.inputFocused,
                ]}
                placeholder="15 min"
                placeholderTextColor="#999"
                value={data.recipeInfo.prepTime}
                onChangeText={value => updateRecipeInfo('prepTime', value)}
                onFocus={() => setPrepTimeFocused(true)}
                onBlur={() => setPrepTimeFocused(false)}
              />
            </View>
          </View>

          <View style={localStyles.timeInput}>
            <Text style={localStyles.timeLabel}>COOK TIME</Text>
            <View style={localStyles.inputWithIcon}>
              <Text style={localStyles.inputIcon}>🍳</Text>
              <TextInput
                style={[
                  localStyles.input,
                  cookTimeFocused && localStyles.inputFocused,
                ]}
                placeholder="20 min"
                placeholderTextColor="#999"
                value={data.recipeInfo.cookTime}
                onChangeText={value => updateRecipeInfo('cookTime', value)}
                onFocus={() => setCookTimeFocused(true)}
                onBlur={() => setCookTimeFocused(false)}
              />
            </View>
          </View>
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
  textarea: {
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    padding: 13,
    fontSize: 14,
    color: '#272727',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    minHeight: 110,
  },
  textareaFocused: {
    borderColor: '#272727',
  },
  timeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timeInput: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWithIcon: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    top: 13,
    fontSize: 16,
    zIndex: 1,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    padding: 13,
    paddingLeft: 40,
    fontSize: 14,
    color: '#272727',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
  },
  inputFocused: {
    borderColor: '#272727',
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
