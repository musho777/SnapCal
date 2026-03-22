import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateMeal } from '../../contexts/CreateMealContext';
import { UIButton } from '../../common-ui/uIButton';
import { createDish } from '../../features/dishes/dishesActions';
import { HealthScoreBar } from '../recipeScreen/components/HealthScoreBar';
import { calculateHealthScore } from '../../utils/healthScore';
import { CaloriesCard } from '../../components/cards/CaloriesCard';
import { RecipeInfo } from '../recipeScreen/components/RecipeInfo';
import { Ingredients } from '../recipeScreen/components/Ingredients';
import { CookingSteps } from '../recipeScreen/components/CookingSteps';
import { FireIcon } from '../../assets/Icons';
import { styles } from '../../themes';

export const Step6ReviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data } = useCreateMeal();
  const { loading } = useSelector(state => state.dishes);
  const [validationError, setValidationError] = useState('');

  const healthData = useMemo(() => {
    const macrosForCalc = {
      carbs_g: data.macros.find(m => m.type === 'Carbs')?.weight || 0,
      protein_g: data.macros.find(m => m.type === 'Protein')?.weight || 0,
      fat_g: data.macros.find(m => m.type === 'Fat')?.weight || 0,
    };
    return calculateHealthScore(macrosForCalc);
  }, [data.macros]);

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
      <View style={localStyles.imageContainer}>
        <Image
          style={localStyles.img}
          source={
            data.image
              ? { uri: data.image }
              : require('../../assets/greekYogurt.png')
          }
        />
      </View>
      <ScrollView
        style={localStyles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={localStyles.spacer} />
        <View style={localStyles.details}>
          <View style={localStyles.titleWrapper}>
            <Text style={styles.title}>{data.name || 'Untitled Meal'}</Text>
            <View style={localStyles.newBadge}>
              <Text style={localStyles.newBadgeText}>New</Text>
            </View>
          </View>
          <View style={localStyles.kcal}>
            <Text style={styles.captionPrimary}>
              Total {data.totalCalories || '0'} Kcal
            </Text>
            <FireIcon />
          </View>
          <View style={localStyles.row}>
            <CaloriesCard
              type="Carbs"
              data={+(data.macros.find(m => m.type === 'Carbs')?.weight || 0)}
            />
            <CaloriesCard
              type="Protein"
              data={+(data.macros.find(m => m.type === 'Protein')?.weight || 0)}
            />
            <CaloriesCard
              type="Fat"
              data={+(data.macros.find(m => m.type === 'Fat')?.weight || 0)}
            />
          </View>
          <HealthScoreBar score={healthData.score} />

          <RecipeInfo
            description={data.recipeInfo?.description || ''}
            prepTime={data.recipeInfo?.prepTime || 0}
            cookTime={data.recipeInfo?.cookTime || 0}
            servings={data.recipeInfo?.servings || 1}
          />

          {data.ingredients &&
            data.ingredients.length > 0 &&
            data.ingredients[0].name && (
              <Ingredients
                ingredients={data.ingredients
                  .filter(ing => ing.name.trim())
                  .map((ing, index) => ({
                    name: ing.name,
                    quantity: ing.amount || '0',
                    unit: 'g',
                    sort_order: index + 1,
                  }))}
              />
            )}

          {data.cookingSteps &&
            data.cookingSteps.length > 0 &&
            data.cookingSteps[0].trim() && (
              <CookingSteps
                steps={data.cookingSteps
                  .filter(step => step.trim())
                  .map((step, index) => ({
                    instruction: step,
                    step_number: index + 1,
                  }))}
                cookTime={data.recipeInfo?.cookTime || 0}
              />
            )}
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
    position: 'relative',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 450,
    alignItems: 'center',
    zIndex: 0,
  },
  img: {
    width: 300,
    height: 300,
    objectFit: 'contain',
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
    marginBottom: 20,
  },
  spacer: {
    height: 300,
  },
  details: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 15,
    paddingHorizontal: 15,
    minHeight: 300,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: '#F9FAFB',
    shadowColor: '#1f1f1f',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 5,
    gap: 10,
    paddingBottom: 80,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  kcal: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    shadowColor: '#1f1f1f',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 1,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    zIndex: 2,
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
