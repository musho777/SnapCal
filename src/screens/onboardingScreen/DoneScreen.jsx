import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import Animated, {
  FadeInLeft,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { GOAL_OPTIONS, DIET_OPTIONS, ACTIVITY_OPTIONS } from './constants';

const DoneScreen = ({ data, onFinish }) => {
  const confettiScale = useSharedValue(0.5);

  React.useEffect(() => {
    confettiScale.value = withSpring(1, {
      damping: 8,
      stiffness: 100,
    });
  }, []);

  const confettiStyle = useAnimatedStyle(() => ({
    transform: [{ scale: confettiScale.value }],
  }));

  const goalOption = GOAL_OPTIONS.find(opt => opt.id === data.goal);
  const dietOption = DIET_OPTIONS.find(opt => opt.id === data.diet);
  const activityOption = ACTIVITY_OPTIONS.find(opt => opt.id === data.activity);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.container}>
        {/* Hero Section */}
        <LinearGradient colors={['#1A1A1A', '#333']} style={styles.hero}>
          <Animated.Text style={[styles.confetti, confettiStyle]}>
            🎉
          </Animated.Text>
          <Text style={styles.heroTitle}>You're All Set!</Text>
          <Text style={styles.heroSubtitle}>
            Your personalized nutrition plan{'\n'}is ready to go
          </Text>

          <View style={styles.calorieBadge}>
            <Text style={styles.calorieValue}>{data.calorieGoal}</Text>
            <Text style={styles.calorieLabel}>cal/day</Text>
          </View>
        </LinearGradient>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Your Profile Summary</Text>

          <SummaryRow
            icon="🎯"
            label="Goal"
            value={goalOption?.title || data.goal}
            delay={0}
          />
          <SummaryRow
            icon="📏"
            label="Stats"
            value={`${data.age} years, ${data.weight}kg, ${data.height}cm`}
            delay={80}
          />
          <SummaryRow
            icon="🥗"
            label="Diet"
            value={dietOption?.title || data.diet}
            delay={160}
          />
          <SummaryRow
            icon="🏃"
            label="Activity"
            value={activityOption?.title || data.activity}
            delay={240}
          />
          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>💡</Text>
            <Text style={styles.infoText}>
              You can always update these preferences in your profile settings.
            </Text>
          </View>
          <View style={styles.ctaContainer}>
            <TouchableOpacity
              onPress={onFinish}
              style={styles.button}
              activeOpacity={0.9}
            >
              <Text style={styles.buttonText}>Start Tracking →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const SummaryRow = ({ icon, label, value, delay }) => (
  <Animated.View entering={FadeInLeft.delay(delay)} style={styles.summaryRow}>
    <View style={styles.summaryIconBox}>
      <Text style={styles.summaryIcon}>{icon}</Text>
    </View>
    <View style={styles.summaryTextContainer}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hero: {
    padding: 60,
    paddingTop: 80,
    paddingBottom: 50,
    alignItems: 'center',
  },
  confetti: {
    fontSize: 60,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
  },
  calorieBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  calorieValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
  },
  calorieLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },
  scrollContent: {},
  summaryCard: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    flex: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A1A1A',
    padding: 20,
    paddingBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  summaryIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryIcon: {
    fontSize: 20,
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 2,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  infoBox: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
  },
  ctaContainer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#1A1A1A',
    borderRadius: 22,
    padding: 18,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 28,
        shadowOffset: { width: 0, height: 8 },
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
});

export default DoneScreen;
