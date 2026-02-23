import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { WizardHeader } from './components/WizardHeader';
import { SuccessScreen } from './components/SuccessScreen';
import { Step1BasicInfo } from './components/Step1BasicInfo';
import { Step2Nutrition } from './components/Step2Nutrition';
import { Step3RecipeInfo } from './components/Step3RecipeInfo';
import { Step4Ingredients } from './components/Step4Ingredients';
import { Step5CookingSteps } from './components/Step5CookingSteps';
import { Step6Review } from './components/Step6Review';
import { UIButton } from '../../common-ui/uIButton';

const CreateMealScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [createdRecipe, setCreatedRecipe] = useState(null);

  const [data, setData] = useState({
    name: '',
    category: '',
    mealType: '',
    totalCalories: '',
    image: null,
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

  const canProceed = useMemo(() => {
    if (currentStep === 1) {
      return data.name.trim() && data.mealType && data.category;
    }
    if (currentStep === 2) {
      return data.totalCalories > 0;
    }
    if (currentStep === 3) {
      return data.recipeInfo.description.trim();
    }
    if (currentStep === 4) {
      return data.ingredients.some(i => i.name.trim());
    }
    if (currentStep === 5) {
      return data.cookingSteps.some(s => s.trim());
    }
    return true;
  }, [currentStep, data]);

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleContinue = async () => {
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    } else {
      await handleCreateMeal();
    }
  };

  const handleCreateMeal = async () => {};

  const handleCreateAnother = () => {
    setSubmitted(false);
    setCreatedRecipe(null);
    setCurrentStep(1);
    setData({
      name: '',
      category: '',
      mealType: '',
      totalCalories: '',
      image: null,
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
        <UIButton
          onPress={handleContinue}
          backgroundColor="#272727"
          color="white"
          style={localStyles.buttonStyles}
          title={currentStep < 6 ? 'Continue' : '🎉 Create Meal'}
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
  buttonStyles: {
    paddingVertical: 20,
  },
});

export default CreateMealScreen;
