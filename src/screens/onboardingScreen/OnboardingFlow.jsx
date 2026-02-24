import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated as RNAnimated, Easing } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing as REasing,
} from 'react-native-reanimated';
import SplashScreen from './SplashScreen';
import DoneScreen from './DoneScreen';
import IllustrationHeader from './components/IllustrationHeader';
import StepContainer from './components/StepContainer';
import BackButton from './components/BackButton';
import BottomCTA from './components/BottomCTA';
import GoalStep from './steps/GoalStep';
import StatsStep from './steps/StatsStep';
import DietStep from './steps/DietStep';
import ActivityStep from './steps/ActivityStep';
import CaloriesStep from './steps/CaloriesStep';
import {
  STEPS_META,
  ACTIVITY_OPTIONS,
  calculateBMR,
  calculateTDEE,
  adjustCaloriesForGoal,
} from './constants';

const OnboardingFlow = ({ onComplete }) => {
  const [screen, setScreen] = useState('splash'); // splash | steps | done
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState('forward');
  const [data, setData] = useState({
    goal: '',
    gender: '',
    age: '',
    weight: '',
    height: '',
    diet: '',
    activity: '',
    calorieGoal: '',
    customCalories: null,
  });

  // Background color animation
  const bgColor = new RNAnimated.Value(0);

  useEffect(() => {
    if (screen === 'steps') {
      RNAnimated.timing(bgColor, {
        toValue: step,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }
  }, [step, screen]);

  const backgroundColor = bgColor.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: STEPS_META.map((meta) => meta.bg),
  });

  // Calculate suggested calories when reaching step 4 (calories step)
  useEffect(() => {
    if (screen === 'steps' && step === 4 && !data.calorieGoal) {
      const activityOption = ACTIVITY_OPTIONS.find(
        (opt) => opt.id === data.activity
      );
      if (activityOption) {
        const bmr = calculateBMR(
          data.weight,
          data.height,
          data.age,
          data.gender
        );
        const tdee = calculateTDEE(bmr, activityOption.multiplier);
        const suggested = adjustCaloriesForGoal(tdee, data.goal);

        if (suggested) {
          updateData({ calorieGoal: suggested.toString() });
        }
      }
    }
  }, [screen, step, data.activity]);

  const updateData = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const canProceed = () => {
    if (step === 0) return !!data.goal;
    if (step === 1)
      return !!(data.weight && data.height && data.age && data.gender);
    if (step === 2) return !!data.diet;
    if (step === 3) return !!data.activity;
    return true;
  };

  const goNext = () => {
    if (!canProceed()) return;
    if (step === 4) {
      setScreen('done');
      return;
    }
    setDirection('forward');
    setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step === 0) {
      setScreen('splash');
      return;
    }
    setDirection('back');
    setStep((s) => s - 1);
  };

  const handleGetStarted = () => {
    setScreen('steps');
  };

  const handleFinish = () => {
    if (onComplete) {
      onComplete(data);
    }
  };

  // Render Splash Screen
  if (screen === 'splash') {
    return <SplashScreen onGetStarted={handleGetStarted} />;
  }

  // Render Done Screen
  if (screen === 'done') {
    return <DoneScreen data={data} onFinish={handleFinish} />;
  }

  // Render Steps
  const currentMeta = STEPS_META[step];

  return (
    <RNAnimated.View style={[styles.container, { backgroundColor }]}>
      {/* Back Button */}
      <BackButton onPress={goBack} />

      {/* Illustration Header */}
      <IllustrationHeader
        meta={currentMeta}
        currentStep={step}
        totalSteps={STEPS_META.length}
      />

      {/* Step Content with Slide Animation */}
      <StepContainer title={currentMeta.title} subtitle={currentMeta.subtitle}>
        <StepContent
          step={step}
          data={data}
          updateData={updateData}
          currentMeta={currentMeta}
          direction={direction}
        />
      </StepContainer>

      {/* Bottom CTA */}
      <BottomCTA
        onPress={goNext}
        disabled={!canProceed()}
        isLastStep={step === 4}
        accentColor={currentMeta.accent}
      />
    </RNAnimated.View>
  );
};

// Step Content Component with Slide Animation
const StepContent = ({ step, data, updateData, currentMeta, direction }) => {
  const translateX = useSharedValue(direction === 'back' ? -300 : 300);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = 0;
    opacity.value = 0;

    translateX.value = withTiming(0, {
      duration: 350,
      easing: REasing.out(REasing.cubic),
    });
    opacity.value = withTiming(1, { duration: 300 });
  }, [step]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <GoalStep
            selectedGoal={data.goal}
            onSelectGoal={(goal) => updateData({ goal })}
            accentColor={currentMeta.accent}
            accentLight={currentMeta.accentLight}
          />
        );
      case 1:
        return (
          <StatsStep
            data={data}
            onUpdateData={updateData}
            accentColor={currentMeta.accent}
            accentLight={currentMeta.accentLight}
          />
        );
      case 2:
        return (
          <DietStep
            selectedDiet={data.diet}
            onSelectDiet={(diet) => updateData({ diet })}
            accentColor={currentMeta.accent}
            accentLight={currentMeta.accentLight}
          />
        );
      case 3:
        return (
          <ActivityStep
            selectedActivity={data.activity}
            onSelectActivity={(activity) => updateData({ activity })}
            accentColor={currentMeta.accent}
            accentLight={currentMeta.accentLight}
          />
        );
      case 4:
        return (
          <CaloriesStep
            suggestedCalories={parseInt(data.calorieGoal, 10) || 2000}
            customCalories={data.customCalories}
            onSetCustomCalories={(calories) =>
              updateData({
                customCalories: calories,
                calorieGoal: calories.toString(),
              })
            }
            accentColor={currentMeta.accent}
            accentLight={currentMeta.accentLight}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Animated.View style={[styles.stepContent, animatedStyle]}>
      {renderStep()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContent: {
    flex: 1,
  },
});

export default OnboardingFlow;
