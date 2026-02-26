import { useEffect } from 'react';
import {
  View,
  Animated as RNAnimated,
  Easing,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  Easing as REasing,
  FadeInUp,
} from 'react-native-reanimated';
import IllustrationHeader from './components/IllustrationHeader';

import { styles } from '../../themes';

const AuthOutlet = ({ children, type }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const bgColor = new RNAnimated.Value(0);

  const translateX = useSharedValue(300);
  const opacity = useSharedValue(0);

  useEffect(() => {
    RNAnimated.timing(bgColor, {
      toValue: 0,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [bgColor]);

  useEffect(() => {
    translateX.value = 0;
    opacity.value = 0;

    translateX.value = withTiming(0, {
      duration: 350,
      easing: REasing.out(REasing.cubic),
    });
    opacity.value = withTiming(1, { duration: 300 });
  }, [opacity, translateX]);

  const backgroundColor = bgColor.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ['#F0F0F0', '#F0F7FF', '#F0FFF6', '#F5F0FF', '#FFF0F5'],
  });

  return (
    <RNAnimated.View style={[styles.flex, { backgroundColor }]}>
      <View style={localStyles.imageContainer}>
        <IllustrationHeader meta={type} />
      </View>
      <ScrollView
        style={localStyles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flexGrow1}
        bounces={false}
      >
        <View style={localStyles.spacer} />

        <View style={localStyles.details}>
          <View style={localStyles.header}>
            <Animated.Text
              entering={FadeInUp.delay(0)}
              style={localStyles.title}
            >
              Welcome Back
            </Animated.Text>
            <Animated.Text
              entering={FadeInUp.delay(100)}
              style={localStyles.subtitle}
            >
              Sign in to continue your nutrition journey
            </Animated.Text>
          </View>
          <View style={styles.flex}>{children}</View>
        </View>
      </ScrollView>
    </RNAnimated.View>
  );
};

const localStyles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    zIndex: 0,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
    flexGrow: 1,
    position: 'relative',
  },
  spacer: {
    height: 250,
  },
  details: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    minHeight: 300,
    paddingHorizontal: 10,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: '#fff',
    shadowColor: '#1f1f1f',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 5,
    gap: 10,
    paddingBottom: 20,
    flex: 1,
  },
  header: {
    paddingTop: 28,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1A1A1A',
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
});

export default AuthOutlet;
