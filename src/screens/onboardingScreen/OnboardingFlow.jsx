import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated as RNAnimated,
  Easing,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  useSharedValue,
  withTiming,
  Easing as REasing,
} from 'react-native-reanimated';
import SplashScreen from './SplashScreen';
import DoneScreen from './DoneScreen';
import StepContainer from './components/StepContainer';
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
import { styles } from '../../themes';
import { GoBackIcon } from '../../assets/Icons';

const OnboardingFlow = ({ onComplete }) => {
  const [screen, setScreen] = useState('splash');
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [step, screen, bgColor]);

  // const backgroundColor = bgColor.interpolate({
  //   inputRange: [0, 1, 2, 3, 4],
  //   outputRange: STEPS_META.map(meta => meta.bg),
  // });

  useEffect(() => {
    if (screen === 'steps' && step === 4 && !data.calorieGoal) {
      const activityOption = ACTIVITY_OPTIONS.find(
        opt => opt.id === data.activity,
      );
      if (activityOption) {
        const bmr = calculateBMR(
          data.weight,
          data.height,
          data.age,
          data.gender,
        );
        const tdee = calculateTDEE(bmr, activityOption.multiplier);
        const suggested = adjustCaloriesForGoal(tdee, data.goal);

        if (suggested) {
          updateData({ calorieGoal: suggested.toString() });
        }
      }
    }
  }, [
    screen,
    step,
    data.activity,
    data.calorieGoal,
    data.weight,
    data.height,
    data.age,
    data.gender,
    data.goal,
  ]);

  const updateData = newData => {
    setData(prev => ({ ...prev, ...newData }));
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
    setStep(s => s + 1);
  };

  const goBack = () => {
    if (step === 0) {
      setScreen('splash');
      return;
    }
    setDirection('back');
    setStep(s => s - 1);
  };

  const handleGetStarted = () => {
    setScreen('steps');
  };

  const handleFinish = () => {
    if (onComplete) {
      onComplete(data);
    }
  };

  if (screen === 'splash') {
    return <SplashScreen onGetStarted={handleGetStarted} />;
  }

  if (screen === 'done') {
    return <DoneScreen data={data} onFinish={handleFinish} />;
  }

  const currentMeta = STEPS_META[step];

  return (
    <RNAnimated.View style={[styles.page, localStyles.container]}>
      <TouchableOpacity onPress={goBack} style={localStyles.zIndex}>
        <GoBackIcon />
      </TouchableOpacity>

      {/* <IllustrationHeader
        meta={currentMeta}
        currentStep={step}
        totalSteps={STEPS_META.length}
      /> */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'height' : 'height'}
        style={localStyles.keyboardAvoidingView}
      >
        <StepContainer
          title={currentMeta.title}
          subtitle={currentMeta.subtitle}
        >
          <StepContent
            step={step}
            data={data}
            updateData={updateData}
            currentMeta={currentMeta}
            direction={direction}
          />
        </StepContainer>
        <BottomCTA
          onPress={goNext}
          disabled={!canProceed()}
          isLastStep={step === 4}
          accentColor={currentMeta.accent}
        />
      </KeyboardAvoidingView>
    </RNAnimated.View>
  );
};

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
  }, [opacity, step, translateX]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <GoalStep
            selectedGoal={data.goal}
            onSelectGoal={goal => updateData({ goal })}
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
            onSelectDiet={diet => updateData({ diet })}
            accentColor={currentMeta.accent}
            accentLight={currentMeta.accentLight}
          />
        );
      case 3:
        return (
          <ActivityStep
            selectedActivity={data.activity}
            onSelectActivity={activity => updateData({ activity })}
            accentColor={currentMeta.accent}
            accentLight={currentMeta.accentLight}
          />
        );
      case 4:
        return (
          <CaloriesStep
            suggestedCalories={parseInt(data.calorieGoal, 10) || 2000}
            customCalories={data.customCalories}
            onSetCustomCalories={calories =>
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

  return <View style={[styles.flex]}>{renderStep()}</View>;
};

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  zIndex: {
    zIndex: 1,
  },
});

export default OnboardingFlow;
