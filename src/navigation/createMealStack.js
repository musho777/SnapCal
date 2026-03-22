import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateMealProvider } from '../contexts/CreateMealContext';
import { WizardHeader } from '../screens/createMealScreen/components/WizardHeader';
import { Step1BasicInfoScreen } from '../screens/createMealScreen/Step1BasicInfoScreen';
import { Step2NutritionScreen } from '../screens/createMealScreen/Step2NutritionScreen';
import { Step3RecipeInfoScreen } from '../screens/createMealScreen/Step3RecipeInfoScreen';
import { Step4IngredientsScreen } from '../screens/createMealScreen/Step4IngredientsScreen';
import { Step5CookingStepsScreen } from '../screens/createMealScreen/Step5CookingStepsScreen';
import { Step6ReviewScreen } from '../screens/createMealScreen/Step6ReviewScreen';
import { SuccessScreen } from '../screens/createMealScreen/SuccessScreen';

const Stack = createNativeStackNavigator();

const STEP_ROUTES = {
  Step1BasicInfo: 1,
  Step2Nutrition: 2,
  Step3RecipeInfo: 3,
  Step4Ingredients: 4,
  Step5CookingSteps: 5,
  Step6Review: 6,
};

const CreateMealStack = () => {
  return (
    <CreateMealProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          animation: 'slide_from_right',
          header: ({ route, navigation }) => {
            // Hide header on Success screen
            if (route.name === 'Success') {
              return null;
            }

            const currentStep = STEP_ROUTES[route.name];

            const handleBack = () => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.getParent()?.goBack();
              }
            };

            return (
              <WizardHeader
                currentStep={currentStep}
                onBack={handleBack}
                totalSteps={6}
              />
            );
          },
        }}
        initialRouteName="Step1BasicInfo"
      >
        <Stack.Screen name="Step1BasicInfo" component={Step1BasicInfoScreen} />
        <Stack.Screen name="Step2Nutrition" component={Step2NutritionScreen} />
        <Stack.Screen name="Step3RecipeInfo" component={Step3RecipeInfoScreen} />
        <Stack.Screen name="Step4Ingredients" component={Step4IngredientsScreen} />
        <Stack.Screen name="Step5CookingSteps" component={Step5CookingStepsScreen} />
        <Stack.Screen name="Step6Review" component={Step6ReviewScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
      </Stack.Navigator>
    </CreateMealProvider>
  );
};

export default CreateMealStack;
