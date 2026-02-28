import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { SPLASH_FEATURES } from './constants';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = ({ onGetStarted }) => {
  const navigation = useNavigation();

  const handleNavigateLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.blob, styles.blob1]} />
      <View style={[styles.blob, styles.blob2]} />
      <View style={[styles.blob, styles.blob3]} />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoEmoji}>🥗</Text>
          </View>
          <Text style={styles.title}>NutriTrack</Text>
          <Text style={styles.subtitle}>
            Your personal nutrition companion{'\n'}powered by smart AI tracking
          </Text>
        </View>

        <View style={styles.features}>
          {SPLASH_FEATURES.map((feature, index) => {
            console.log(feature);
            return (
              <Animated.View
                key={index}
                entering={FadeInLeft.delay(200 + index * 100)}
                style={styles.featureRow}
              >
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={styles.featureText}>{feature.text}</Text>
              </Animated.View>
            );
          })}
        </View>
      </View>

      <View style={styles.ctaContainer}>
        <TouchableOpacity
          onPress={onGetStarted}
          style={styles.button}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleNavigateLogin} activeOpacity={0.7}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
  },
  blob1: {
    width: 320,
    height: 320,
    backgroundColor: 'rgba(255,140,66,0.12)',
    top: -100,
    right: -80,
  },
  blob2: {
    width: 200,
    height: 200,
    backgroundColor: 'rgba(61,190,122,0.08)',
    top: -50,
    left: -60,
  },
  blob3: {
    width: 180,
    height: 180,
    backgroundColor: 'rgba(139,92,246,0.10)',
    bottom: 100,
    right: -40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#fff',
        shadowOpacity: 0.3,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 8 },
      },
      android: {
        elevation: 8,
      },
    }),
  },
  logoEmoji: {
    fontSize: 50,
  },
  title: {
    fontSize: 38,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1.5,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
    lineHeight: 28,
  },
  features: {
    gap: 16,
    width: '100%',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    width: '100%',
    gap: 14,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
    flex: 1,
  },
  ctaContainer: {
    width: '100%',
    paddingHorizontal: 32,
    paddingBottom: 50,
    zIndex: 1,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 18,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#fff',
        shadowOpacity: 0.15,
        shadowRadius: 30,
        shadowOffset: { width: 0, height: 8 },
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1A1A1A',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signInText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.3)',
  },
  signInLink: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '600',
  },
});

export default SplashScreen;
