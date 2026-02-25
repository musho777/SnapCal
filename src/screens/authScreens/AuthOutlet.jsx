import { useState, useEffect } from 'react';
import { View, Animated as RNAnimated, Easing } from 'react-native';
import {
  useSharedValue,
  withTiming,
  Easing as REasing,
} from 'react-native-reanimated';
import IllustrationHeader from './components/IllustrationHeader';
import StepContainer from './components/StepContainer';

import { styles } from '../../themes';
import { STEPS_META } from '../onboardingScreen/constants';

const AuthOutlet = ({ children }) => {
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

  const backgroundColor = bgColor.interpolate({
    inputRange: [0, 1, 2, 3, 4],

    outputRange: STEPS_META.map(meta => meta.bg),
  });
  const currentMeta = STEPS_META[0];

  return (
    <RNAnimated.View style={[styles.flex, { backgroundColor }]}>
      <IllustrationHeader meta={currentMeta} currentStep={step} />
      <StepContainer
        title={'Welcome Back '}
        subtitle={'Sign in to continue your nutrition journey'}
      >
        <StepContent children={children} />
      </StepContainer>
    </RNAnimated.View>
  );
};

const StepContent = ({ step, direction, children }) => {
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

  return <View style={[styles.flex]}>{children}</View>;
};

export default AuthOutlet;
