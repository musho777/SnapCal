import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Apple, Facebook, Chrome } from 'lucide-react-native';
import UIInput from '../../../common-ui/uIInput/UIInput';
import AuthOutlet from '../AuthOutlet';
import { UIButton } from '../../../common-ui/uIButton';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [focusedInput, setFocusedInput] = useState(null);

  const navigation = useNavigation();

  const navigationToRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <AuthOutlet
      type={{
        bg: '#FFF8F0',
        accent: '#FF8C42',
        accentLight: '#FFE8D6',
        illustrationBg: ['#FFE8D6', '#FFD4B3'],
        shapes: ['#FFD4B3', '#FFBF8A', '#FFE8D6'],
        illustration: '🎯',
        title: "What's your main goal?",
        subtitle: "We'll build your perfect nutrition plan around it",
      }}
    >
      <View style={styles.container}>
        <Animated.View entering={FadeInUp.delay(100)} style={styles.section}>
          <UIInput
            label="Email"
            variant="meal"
            placeholder="you@example.com"
            keyboardType="numeric"
            containerStyle={[
              styles.inputContainer,
              focusedInput === 'email' && styles.inputWrapperActiveColor,
            ]}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200)} style={styles.section}>
          <UIInput
            label="Password"
            variant="meal"
            placeholder="Your Password"
            keyboardType="decimal-pad"
            containerStyle={[
              styles.inputContainer,
              focusedInput === 'password' && styles.inputWrapperActiveColor,
            ]}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}
          />
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(300)} style={styles.section}>
          <UIButton title={'Sign in '} />
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(400)} style={styles.row}>
          <UIButton variant="dark" icon={<Apple color="#fff" size={20} />} />
          <UIButton variant="dark" icon={<Chrome color="#fff" size={20} />} />
          <UIButton variant="dark" icon={<Facebook color="#fff" size={20} />} />
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(500)}
          style={styles.signupContainer}
        >
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text onPress={navigationToRegister} style={styles.signupLink}>
              Sign Up
            </Text>
          </Text>
        </Animated.View>
      </View>
    </AuthOutlet>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 8,
  },
  container: {
    gap: 20,
  },
  section: {
    gap: 8,
  },
  inputWrapperActiveColor: {
    borderColor: '#FFD4B3',
  },
  inputContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    paddingRight: 60,
    borderWidth: 2,
    borderColor: '#F0F0F0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  signupContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    fontSize: 14,
    color: '#666',
  },
  signupLink: {
    color: '#272727',
    fontWeight: '600',
  },
});

export default LoginScreen;
