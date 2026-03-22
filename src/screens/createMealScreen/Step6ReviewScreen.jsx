import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateMeal } from '../../contexts/CreateMealContext';
import { UIButton } from '../../common-ui/uIButton';
import { createDish } from '../../features/dishes/dishesActions';
import { HealthScoreBar } from '../recipeScreen/components/HealthScoreBar';
import { calculateHealthScore } from '../../utils/healthScore';
import { CaloriesCard } from '../../components/cards/CaloriesCard';
import { macroConfig } from '../../constants/constants';
import { DIET_OPTIONS } from '../onboardingScreen/constants';

const categoryEmojis = {
  salad: '🥗',
  soup: '🍲',
  grill: '🍗',
  pasta: '🍝',
  bowl: '🥣',
  wrap: '🌯',
  smoothie: '🥤',
  snack: '🍿',
  dessert: '🍰',
  other: '🍽',
};

const editButtons = [
  { step: 1, icon: '✏️', label: 'Basic Info' },
  { step: 2, icon: '🔥', label: 'Nutrition' },
  { step: 3, icon: '⏱', label: 'Recipe' },
  { step: 4, icon: '🥦', label: 'Ingredients' },
  { step: 5, icon: '👨‍🍳', label: 'Steps' },
];

export const Step6ReviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data } = useCreateMeal();
  const { loading } = useSelector(state => state.dishes);
  const [validationError, setValidationError] = useState('');

  const healthData = useMemo(() => {
    return calculateHealthScore(data.macros);
  }, [data.macros]);

  const categoryEmoji = categoryEmojis[data.category] || '🍽';

  const selectedDietTags = useMemo(() => {
    if (!data.diet_tag_ids || data.diet_tag_ids.length === 0) {
      return [];
    }
    return DIET_OPTIONS.filter(opt =>
      opt.id !== 'none' && data.diet_tag_ids.includes(opt.id)
    );
  }, [data.diet_tag_ids]);

  const handleEdit = step => {
    const stepRoutes = {
      1: 'Step1BasicInfo',
      2: 'Step2Nutrition',
      3: 'Step3RecipeInfo',
      4: 'Step4Ingredients',
      5: 'Step5CookingSteps',
    };
    navigation.navigate(stepRoutes[step]);
  };

  const handleCreateMeal = async () => {
    try {
      const carbsWeight =
        data.macros.find(m => m.type === 'Carbs')?.weight || 0;
      const proteinWeight =
        data.macros.find(m => m.type === 'Protein')?.weight || 0;
      const fatWeight = data.macros.find(m => m.type === 'Fat')?.weight || 0;
      const dishPayload = {
        name: data.name,
        servings: Number(data.recipeInfo.servings) || 1,
        calories: Number(data.totalCalories) || 0,
        protein_g: Number(proteinWeight) || 0,
        carbs_g: Number(carbsWeight) || 0,
        fats_g: Number(fatWeight) || 0,
        description: data.recipeInfo.description || '',
        prep_time_minutes: Number(data.recipeInfo.prepTime) || 0,
        cook_time_minutes: Number(data.recipeInfo.cookTime) || 0,
        image: data.image,
        is_public: false,
        ingredients: data.ingredients
          .filter(ing => ing.name.trim())
          .map((ing, index) => ({
            name: ing.name,
            quantity: ing.amount || '0',
            unit: 'g',
            sort_order: index + 1,
            is_optional: false,
          })),
        cooking_steps: data.cookingSteps
          .filter(step => step.trim())
          .map((step, index) => ({
            instruction: step,
            step_number: index + 1,
          })),
        dish_type: data.mealType ? [data.mealType] : [],
        category_ids: data.category ? [data.category] : [],
        diet_tag_ids: data.diet_tag_ids || [],
      };

      const result = await dispatch(createDish(dishPayload)).unwrap();

      if (result) {
        navigation.navigate('Success', { recipe: result, mealName: data.name });
      }
    } catch (err) {
      console.error('Create dish error:', err);
      const errorMessage =
        err?.message ||
        err?.error ||
        (typeof err === 'string'
          ? err
          : 'Failed to create dish. Please try again.');

      setValidationError(errorMessage);
      Alert.alert('Error Creating Dish', errorMessage, [{ text: 'OK' }]);
    }
  };

  return (
    <View style={localStyles.container}>
      <ScrollView
        style={localStyles.scrollView}
        contentContainerStyle={localStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={localStyles.componentContainer}>
          <View style={localStyles.heroPreview}>
            {data.image ? (
              <Image source={{ uri: data.image }} style={localStyles.heroImage} />
            ) : (
              <Text style={localStyles.heroEmoji}>{categoryEmoji}</Text>
            )}
          </View>

          <View style={localStyles.card}>
            <View style={localStyles.headerRow}>
              <Text style={localStyles.mealName}>
                {data.name || 'Untitled Meal'}
              </Text>
              <View style={localStyles.newBadge}>
                <Text style={localStyles.newBadgeText}>New</Text>
              </View>
            </View>

            <View style={localStyles.caloriesRow}>
              <Text style={localStyles.caloriesValue}>
                {data.totalCalories || '0'}
              </Text>
              <Text style={localStyles.caloriesUnit}>Kcal 🔥</Text>
            </View>

            <View style={localStyles.macroCardsRow}>
              {macroConfig.map((macro, index) => {
                return (
                  <CaloriesCard
                    key={macro.type}
                    type={macro.type}
                    themes="dark"
                    data={10}
                  />
                );
              })}
            </View>
          </View>

          <HealthScoreBar score={healthData.score} />

          {selectedDietTags.length > 0 && (
            <View style={localStyles.card}>
              <Text style={localStyles.sectionLabel}>Dietary Tags</Text>
              <View style={localStyles.dietTagsWrap}>
                {selectedDietTags.map(tag => (
                  <View key={tag.id} style={localStyles.dietTag}>
                    <Text style={localStyles.dietTagIcon}>{tag.icon}</Text>
                    <Text style={localStyles.dietTagText}>{tag.title}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={localStyles.card}>
            <Text style={localStyles.sectionLabel}>Quick Edit</Text>
            <View style={localStyles.editButtonsWrap}>
              {editButtons.map(btn => (
                <TouchableOpacity
                  key={btn.step}
                  style={localStyles.editButton}
                  onPress={() => handleEdit(btn.step)}
                >
                  <Text style={localStyles.editButtonIcon}>{btn.icon}</Text>
                  <Text style={localStyles.editButtonText}>{btn.label}</Text>
                </TouchableOpacity>
              ))}
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
          onPress={handleCreateMeal}
          backgroundColor="#272727"
          color="white"
          style={localStyles.buttonStyles}
          title="🎉 Create Meal"
          loading={loading}
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
  heroPreview: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroEmoji: {
    fontSize: 80,
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mealName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#272727',
    flex: 1,
  },
  newBadge: {
    backgroundColor: '#6B39F4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  caloriesRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  caloriesValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#272727',
    marginRight: 8,
  },
  caloriesUnit: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  macroCardsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#272727',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  editButtonsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#EEEEEE',
    backgroundColor: '#F5F5F5',
  },
  editButtonIcon: {
    fontSize: 14,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#272727',
  },
  dietTagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dietTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#272727',
  },
  dietTagIcon: {
    fontSize: 14,
  },
  dietTagText: {
    fontSize: 12,
    fontWeight: '600',
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
