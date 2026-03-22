import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { useCreateMeal } from '../../contexts/CreateMealContext';
import UIInput from '../../common-ui/uIInput';
import { UIButton } from '../../common-ui/uIButton';
import { mealTypes } from '../../constants/constants';
import { DIET_OPTIONS } from '../onboardingScreen/constants';
import {
  selectCategoryData,
  selectCategoryLoading,
} from '../../features/home/homeSlice';
import { getCategoryForHome } from '../../features/home/homeAction';

export const Step1BasicInfoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data, setData } = useCreateMeal();
  const [validationError, setValidationError] = useState('');

  const categories = useSelector(selectCategoryData);
  const categoriesLoading = useSelector(selectCategoryLoading);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(getCategoryForHome({ limit: 50, offset: 0 }));
    }
  }, [dispatch, categories]);

  const getValidationError = useMemo(() => {
    if (!data.name.trim()) return 'Please enter a dish name';
    if (!data.mealType) return 'Please select a meal type';
    if (!data.category) return 'Please select a category';
    return null;
  }, [data]);

  const canProceed = useMemo(() => {
    return getValidationError === null;
  }, [getValidationError]);

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

  const toggleDietTag = tagId => {
    setData(prev => {
      const currentTags = prev.diet_tag_ids || [];
      if (tagId === 'none') {
        return { ...prev, diet_tag_ids: [] };
      }

      const isSelected = currentTags.includes(tagId);
      if (isSelected) {
        return {
          ...prev,
          diet_tag_ids: currentTags.filter(id => id !== tagId),
        };
      } else {
        return {
          ...prev,
          diet_tag_ids: [...currentTags, tagId],
        };
      }
    });
  };

  const handleContinue = () => {
    setValidationError('');

    if (!canProceed) {
      setValidationError(getValidationError);
      return;
    }

    navigation.navigate('Step2Nutrition');
  };

  return (
    <View style={localStyles.container}>
      <ScrollView
        style={localStyles.scrollView}
        contentContainerStyle={localStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={localStyles.content}>
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
            <UIInput
              variant="meal"
              label="Meal Name"
              required={true}
              placeholder="e.g. Chicken Salad"
              value={data.name}
              onChangeText={updateName}
            />
          </View>

          <View style={localStyles.card}>
            <Text style={localStyles.label}>
              Meal Type
              <Text style={localStyles.required}> *</Text>
            </Text>
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
            {categoriesLoading ? (
              <Text style={localStyles.loadingText}>Loading categories...</Text>
            ) : (
              <View style={localStyles.categoriesWrap}>
                {categories && categories.length > 0 ? (
                  categories.map(cat => {
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
                        {cat.icon_url ? (
                          <Image
                            source={{
                              uri: `https://snapcal-back-production.up.railway.app${cat.icon_url}`,
                            }}
                            style={localStyles.categoryIcon}
                          />
                        ) : (
                          <Text style={localStyles.categoryEmoji}>🍽</Text>
                        )}
                        <Text
                          style={[
                            localStyles.categoryText,
                            isActive && localStyles.categoryTextActive,
                          ]}
                        >
                          {cat.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Text style={localStyles.loadingText}>
                    No categories available
                  </Text>
                )}
              </View>
            )}
          </View>

          <View style={localStyles.card}>
            <Text style={localStyles.label}>Dietary Tags (Optional)</Text>
            <View style={localStyles.categoriesWrap}>
              {DIET_OPTIONS.map(diet => {
                const isNoRestrictions = diet.id === 'none';
                const isActive = isNoRestrictions
                  ? !data.diet_tag_ids || data.diet_tag_ids.length === 0
                  : (data.diet_tag_ids || []).includes(diet.id);

                return (
                  <TouchableOpacity
                    key={diet.id}
                    style={[
                      localStyles.categoryPill,
                      isActive && localStyles.categoryPillActive,
                    ]}
                    onPress={() => toggleDietTag(diet.id)}
                  >
                    <Text style={localStyles.categoryEmoji}>{diet.icon}</Text>
                    <Text
                      style={[
                        localStyles.categoryText,
                        isActive && localStyles.categoryTextActive,
                      ]}
                    >
                      {diet.title}
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
  content: {
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
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.01,
    shadowRadius: 2,
    elevation: 1,
  },
  label: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginBottom: 8,
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
  categoryIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#272727',
  },
  categoryTextActive: {
    color: '#fff',
  },
  loadingText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 12,
  },
  required: {
    color: '#FF6B6B',
    fontWeight: '700',
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
