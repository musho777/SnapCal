import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const mealTypes = [
  { id: 'breakfast', label: 'Breakfast', emoji: '🌅' },
  { id: 'lunch', label: 'Lunch', emoji: '☀️' },
  { id: 'dinner', label: 'Dinner', emoji: '🌙' },
  { id: 'snacks', label: 'Snacks', emoji: '🍎' },
];

const categories = [
  { id: 'salad', label: 'Salad', emoji: '🥗' },
  { id: 'soup', label: 'Soup', emoji: '🍲' },
  { id: 'grill', label: 'Grill', emoji: '🍗' },
  { id: 'pasta', label: 'Pasta', emoji: '🍝' },
  { id: 'bowl', label: 'Bowl', emoji: '🥣' },
  { id: 'wrap', label: 'Wrap', emoji: '🌯' },
  { id: 'smoothie', label: 'Smoothie', emoji: '🥤' },
  { id: 'snack', label: 'Snack', emoji: '🍿' },
  { id: 'dessert', label: 'Dessert', emoji: '🍰' },
  { id: 'other', label: 'Other', emoji: '🍽' },
];

export const Step1BasicInfo = ({ data, setData }) => {
  const [nameFocused, setNameFocused] = useState(false);

  const handleSelectPhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1000,
      maxHeight: 1000,
    });

    if (result.didCancel) {
      return;
    }

    if (result.errorCode) {
      Alert.alert('Error', 'Failed to select image. Please try again.');
      return;
    }

    if (result.assets && result.assets[0]) {
      setData(prev => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  const updateMealType = type => {
    setData(prev => ({ ...prev, mealType: type }));
  };

  const updateCategory = category => {
    setData(prev => ({ ...prev, category }));
  };

  const updateName = name => {
    setData(prev => ({ ...prev, name }));
  };

  return (
    <View style={localStyles.container}>
      <TouchableOpacity
        style={localStyles.photoUpload}
        onPress={handleSelectPhoto}
      >
        {data.image ? (
          <Image source={{ uri: data.image }} style={localStyles.photoImage} />
        ) : (
          <View style={localStyles.photoPlaceholder}>
            <Text style={localStyles.photoEmoji}>📷</Text>
            <Text style={localStyles.photoTitle}>Add Meal Photo</Text>
            <Text style={localStyles.photoSubtitle}>
              Tap to upload from gallery
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={localStyles.card}>
        <Text style={localStyles.label}>Meal Name</Text>
        <TextInput
          style={[
            localStyles.input,
            nameFocused && localStyles.inputFocused,
          ]}
          placeholder="e.g. Chicken Salad"
          placeholderTextColor="#999"
          value={data.name}
          onChangeText={updateName}
          onFocus={() => setNameFocused(true)}
          onBlur={() => setNameFocused(false)}
        />
      </View>

      <View style={localStyles.card}>
        <Text style={localStyles.label}>Meal Type</Text>
        <View style={localStyles.buttonsRow}>
          {mealTypes.map(type => {
            const isActive = data.mealType === type.id;
            return (
              <TouchableOpacity
                key={type.id}
                style={[
                  localStyles.mealTypeButton,
                  isActive && localStyles.mealTypeButtonActive,
                ]}
                onPress={() => updateMealType(type.id)}
              >
                <Text
                  style={[
                    localStyles.mealTypeEmoji,
                    isActive && localStyles.mealTypeEmojiActive,
                  ]}
                >
                  {type.emoji}
                </Text>
                <Text
                  style={[
                    localStyles.mealTypeText,
                    isActive && localStyles.mealTypeTextActive,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={localStyles.card}>
        <Text style={localStyles.label}>Category</Text>
        <View style={localStyles.categoriesWrap}>
          {categories.map(cat => {
            const isActive = data.category === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  localStyles.categoryPill,
                  isActive && localStyles.categoryPillActive,
                ]}
                onPress={() => updateCategory(cat.id)}
              >
                <Text style={localStyles.categoryEmoji}>{cat.emoji}</Text>
                <Text
                  style={[
                    localStyles.categoryText,
                    isActive && localStyles.categoryTextActive,
                  ]}
                >
                  {cat.label}
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
  photoUpload: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    height: 200,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  photoPlaceholder: {
    alignItems: 'center',
  },
  photoEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  photoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#272727',
    marginBottom: 4,
  },
  photoSubtitle: {
    fontSize: 11,
    color: '#999',
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
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    padding: 13,
    fontSize: 14,
    color: '#272727',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
  },
  inputFocused: {
    borderColor: '#272727',
  },
  buttonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  mealTypeButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: 12,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#EEEEEE',
    backgroundColor: '#F5F5F5',
  },
  mealTypeButtonActive: {
    borderColor: '#272727',
    backgroundColor: '#272727',
  },
  mealTypeEmoji: {
    fontSize: 18,
  },
  mealTypeEmojiActive: {
    opacity: 1,
  },
  mealTypeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#272727',
  },
  mealTypeTextActive: {
    color: '#fff',
  },
  categoriesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#EEEEEE',
    backgroundColor: '#F5F5F5',
  },
  categoryPillActive: {
    borderColor: '#272727',
    backgroundColor: '#272727',
  },
  categoryEmoji: {
    fontSize: 14,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#272727',
  },
  categoryTextActive: {
    color: '#fff',
  },
});
