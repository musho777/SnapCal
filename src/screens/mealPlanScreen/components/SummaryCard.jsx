import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const SummaryCard = ({ totalKcal, goalKcal, totalCarbs, totalProtein, totalFat }) => {
  const percentComplete = Math.min(
    Math.round((totalKcal / goalKcal) * 100),
    100,
  );
  const kcalLeft = Math.max(goalKcal - totalKcal, 0);

  // Animated values
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: totalKcal,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [totalKcal]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, goalKcal],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.summaryCard}>
      {/* Decorative circles */}
      <View
        style={[
          styles.decorativeCircle,
          { width: 120, height: 120, top: -20, right: -20 },
        ]}
      />
      <View
        style={[
          styles.decorativeCircle,
          { width: 80, height: 80, bottom: 20, left: -10 },
        ]}
      />

      {/* Top Row */}
      <View style={styles.summaryTop}>
        <View>
          <Text style={styles.summaryLabel}>TODAY'S CALORIES</Text>
          <View style={styles.summaryCalorieRow}>
            <Text style={styles.summaryCalories}>{totalKcal}</Text>
            <Text style={styles.summaryGoal}> / {goalKcal} Kcal</Text>
          </View>
        </View>
        <View style={styles.summaryIcon}>
          <Text style={styles.summaryEmoji}>🔥</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressBar, { width: progressWidth }]}
          />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>
            {percentComplete}% of daily goal
          </Text>
          <Text style={styles.progressLabel}>{kcalLeft} Kcal left</Text>
        </View>
      </View>

      {/* Macro Pills */}
      <View style={styles.macroPills}>
        <View style={styles.macroPill}>
          <Text style={styles.macroPillValue}>{totalCarbs}g</Text>
          <Text style={styles.macroPillLabel}>CARBS</Text>
          <View style={styles.macroPillProgress}>
            <View
              style={[
                styles.macroPillProgressBar,
                { width: '65%', backgroundColor: '#F59E0B' },
              ]}
            />
          </View>
        </View>
        <View style={styles.macroPill}>
          <Text style={styles.macroPillValue}>{totalProtein}g</Text>
          <Text style={styles.macroPillLabel}>PROTEIN</Text>
          <View style={styles.macroPillProgress}>
            <View
              style={[
                styles.macroPillProgressBar,
                { width: '78%', backgroundColor: '#6366F1' },
              ]}
            />
          </View>
        </View>
        <View style={styles.macroPill}>
          <Text style={styles.macroPillValue}>{totalFat}g</Text>
          <Text style={styles.macroPillLabel}>FAT</Text>
          <View style={styles.macroPillProgress}>
            <View
              style={[
                styles.macroPillProgressBar,
                { width: '52%', backgroundColor: '#22C55E' },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: '#272727',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  summaryCalorieRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  summaryCalories: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
  },
  summaryGoal: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryEmoji: {
    fontSize: 24,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
  },
  macroPills: {
    flexDirection: 'row',
    gap: 8,
  },
  macroPill: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    gap: 4,
  },
  macroPillValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#fff',
  },
  macroPillLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  macroPillProgress: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 2,
    marginTop: 4,
    overflow: 'hidden',
  },
  macroPillProgressBar: {
    height: '100%',
    borderRadius: 2,
  },
});

export default SummaryCard;
