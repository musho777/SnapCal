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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
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
import { useDispatch } from 'react-redux';
import { createGuestUser } from '../../features/auth/authActions';
import { calculateAgeFromBirthDate } from '../../utils/commonUtils';

const OnboardingFlow = () => {
  const navigation = useNavigation();
  const [screen, setScreen] = useState('splash');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState('forward');
  const [data, setData] = useState({
    goal: '',
    gender: '',
    birthDate: '',
    weight: '',
    height: '',
    diet: [],
    activity: '',
    calorieGoal: '',
    customCalories: null,
  });

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

  useEffect(() => {
    if (screen === 'steps' && step === 4 && !data.calorieGoal) {
      const activityOption = ACTIVITY_OPTIONS.find(
        opt => opt.id === data.activity,
      );
      if (activityOption) {
        const age = calculateAgeFromBirthDate(data.birthDate);
        const bmr = calculateBMR(data.weight, data.height, age, data.gender);
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
    data.birthDate,
    data.gender,
    data.goal,
  ]);

  const updateData = newData => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const handleSelectDiet = diet => {
    const exists = data.diet.some(d => d.id === diet.id);
    const newDiets = exists
      ? data.diet.filter(d => d.id !== diet.id)
      : [...data.diet, { id: diet.id, title: diet.title }];

    updateData({ diet: newDiets });
  };

  const canProceed = () => {
    if (step === 0) return !!data.goal;
    if (step === 1)
      return !!(data.weight && data.height && data.birthDate && data.gender);
    if (step === 2) return data.diet && data.diet.length > 0;
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

  const handleFinish = async () => {
    setLoading(true);
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      await dispatch(createGuestUser(data)).unwrap();
      navigation.replace('MainApp');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (screen === 'splash') {
    return <SplashScreen onGetStarted={handleGetStarted} />;
  }

  if (screen === 'done') {
    return <DoneScreen loading={loading} data={data} onFinish={handleFinish} />;
  }

  const currentMeta = STEPS_META[step];

  return (
    <RNAnimated.View style={[styles.page, localStyles.container]}>
      <TouchableOpacity onPress={goBack} style={localStyles.zIndex}>
        <GoBackIcon />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'height' : 'height'}
        style={styles.flex}
      >
        <StepContainer
          title={currentMeta.title}
          subtitle={currentMeta.subtitle}
        >
          <StepContent
            step={step}
            data={data}
            updateData={updateData}
            handleSelectDiet={handleSelectDiet}
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

const StepContent = ({
  step,
  data,
  updateData,
  handleSelectDiet,
  currentMeta,
  direction,
}) => {
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
            onSelectDiet={handleSelectDiet}
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
  zIndex: {
    zIndex: 1,
  },
});

export default OnboardingFlow;
