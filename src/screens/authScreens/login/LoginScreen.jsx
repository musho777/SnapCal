import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Apple, Facebook, Chrome } from 'lucide-react-native';
import UIInput from '../../../common-ui/uIInput/UIInput';
import AuthOutlet from '../AuthOutlet';
import { UIButton } from '../../../common-ui/uIButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../../features/auth/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateEmail } from '../../../utils/commonUtils';

const LoginScreen = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

  const navigationToRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  const handleEmailChange = text => {
    setEmail(text);
    setEmailError('');
    setError('');
  };

  const handlePasswordChange = text => {
    setPassword(text);
    setPasswordError('');
    setError('');
  };

  const handleFocus = inputName => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const validateForm = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(userLogin({ email: email.trim(), password })).unwrap();
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      navigation.replace('MainApp');
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Password reset functionality will be available soon.',
      [{ text: 'OK' }],
    );
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
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.section}>
          <UIInput
            label="Email"
            variant="meal"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={handleEmailChange}
            containerStyle={[
              styles.inputContainer,
              focusedInput === 'email' && styles.inputWrapperActiveColor,
            ]}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
            error={!!emailError}
            errorText={emailError}
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200)} style={styles.section}>
          <UIInput
            label="Password"
            variant="meal"
            placeholder="Your Password"
            secureTextEntry={true}
            autoCapitalize="none"
            value={password}
            onChangeText={handlePasswordChange}
            containerStyle={[
              styles.inputContainer,
              focusedInput === 'password' && styles.inputWrapperActiveColor,
            ]}
            onFocus={() => handleFocus('password')}
            onBlur={handleBlur}
            error={!!passwordError}
            errorText={passwordError}
          />
          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300)} style={styles.section}>
          <UIButton
            loading={loading}
            onPress={handleLogin}
            title="Sign in"
            disabled={loading}
          />
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#FF8C42',
    fontSize: 14,
    fontWeight: '600',
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
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default LoginScreen;
