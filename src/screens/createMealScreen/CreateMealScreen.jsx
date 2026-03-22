import React, { useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { WizardHeader } from './components/WizardHeader';
import { SuccessScreen } from './components/SuccessScreen';
import { Step1BasicInfo } from './components/Step1BasicInfo';
import { Step2Nutrition } from './components/Step2Nutrition';
import { Step3RecipeInfo } from './components/Step3RecipeInfo';
import { Step4Ingredients } from './components/Step4Ingredients';
import { Step5CookingSteps } from './components/Step5CookingSteps';
import { Step6Review } from './components/Step6Review';
import { UIButton } from '../../common-ui/uIButton';
import { createDish } from '../../features/dishes/dishesActions';
import { resetDishState } from '../../features/dishes/dishesSlice';

const CreateMealScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.dishes);

  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [createdRecipe, setCreatedRecipe] = useState(null);
  const [validationError, setValidationError] = useState('');

  const [data, setData] = useState({
    name: '',
    category: '4439d330-2a2e-46f5-b4ac-e2fab645218c',
    mealType: '',
    totalCalories: '',
    image: null,
    diet_tag_ids: [],
    macros: [
      { weight: 0, type: 'Carbs' },
      { weight: 0, type: 'Protein' },
      { weight: 0, type: 'Fat' },
    ],
    recipeInfo: {
      description: '',
      prepTime: '',
      cookTime: '',
      servings: '4',
    },
    ingredients: [{ name: '', amount: '' }],
    cookingSteps: [''],
  });

  const getValidationError = useMemo(() => {
    if (currentStep === 1) {
      if (!data.name.trim()) return 'Please enter a dish name';
      if (!data.mealType) return 'Please select a meal type';
      if (!data.category) return 'Please select a category';
    }
    if (currentStep === 2) {
      if (!data.totalCalories || data.totalCalories <= 0) {
        return 'Please enter total calories (must be greater than 0)';
      }
    }
    return null;
  }, [currentStep, data]);

  const canProceed = useMemo(() => {
    return getValidationError === null;
  }, [getValidationError]);

  const handleBack = () => {
    setValidationError('');
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleContinue = async () => {
    setValidationError('');

    if (currentStep < 6 && !canProceed) {
      setValidationError(getValidationError);
      return;
    }

    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    } else {
      await handleCreateMeal();
    }
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
        setCreatedRecipe(result);
        setSubmitted(true);
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

  const handleCreateAnother = () => {
    dispatch(resetDishState());
    setSubmitted(false);
    setCreatedRecipe(null);
    setCurrentStep(1);
    setData({
      name: '',
      category: '',
      mealType: '',
      totalCalories: '',
      image: null,
      diet_tag_ids: [],
      macros: [
        { weight: 0, type: 'Carbs' },
        { weight: 0, type: 'Protein' },
        { weight: 0, type: 'Fat' },
      ],
      recipeInfo: {
        description: '',
        prepTime: '',
        cookTime: '',
        servings: '4',
      },
      ingredients: [{ name: '', amount: '' }],
      cookingSteps: [''],
    });
  };

  const handleViewRecipe = () => {
    if (createdRecipe) {
      navigation.navigate('Home', {
        screen: 'Recipient',
        params: { recipeId: createdRecipe.id },
      });
    }
  };

  const handleEdit = step => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo data={data} setData={setData} />;
      case 2:
        return <Step2Nutrition data={data} setData={setData} />;
      case 3:
        return <Step3RecipeInfo data={data} setData={setData} />;
      case 4:
        return <Step4Ingredients data={data} setData={setData} />;
      case 5:
        return <Step5CookingSteps data={data} setData={setData} />;
      case 6:
        return <Step6Review data={data} onEdit={handleEdit} />;
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <SuccessScreen
        mealName={data.name}
        onCreateAnother={handleCreateAnother}
        onViewRecipe={handleViewRecipe}
      />
    );
  }

  return (
    <View style={localStyles.container}>
      <WizardHeader
        currentStep={currentStep}
        onBack={handleBack}
        totalSteps={6}
      />

      <ScrollView
        style={localStyles.scrollView}
        contentContainerStyle={localStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderStep()}
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
          title={currentStep < 6 ? 'Continue' : '🎉 Create Meal'}
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

export default CreateMealScreen;
