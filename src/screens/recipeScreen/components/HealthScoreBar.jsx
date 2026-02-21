import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { getHealthStatus } from '../../../utils/healthScore';

export const HealthScoreBar = ({ score }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const status = getHealthStatus(score);

  useEffect(() => {
    Animated.spring(progressAnim, {
      toValue: score,
      friction: 4,
      tension: 40,
      useNativeDriver: false,
    }).start();
  }, [score]);

  // Calculate width percentage (score is 0-10)
  const widthPercentage = progressAnim.interpolate({
    inputRange: [0, 10],
    outputRange: ['0%', '100%'],
  });

  // Create segments for the progress bar
  const renderSegments = () => {
    const segments = [];
    const segmentCount = 10;
    const colors = [
      '#FF4444', // 0-1: Red (Poor)
      '#FF6644', // 1-2: Red-Orange
      '#FF8844', // 2-3: Orange
      '#FFB844', // 3-4: Light Orange
      '#FFD844', // 4-5: Yellow
      '#E8D844', // 5-6: Yellow-Green
      '#C8D844', // 6-7: Light Green
      '#9ED844', // 7-8: Green
      '#5CD844', // 8-9: Bright Green
      '#1DCE5C', // 9-10: Excellent Green
    ];

    for (let i = 0; i < segmentCount; i++) {
      segments.push(
        <View
          key={i}
          style={[
            localStyles.segment,
            {
              backgroundColor: i < Math.floor(score) ? colors[i] : '#E5E5E5',
            },
          ]}
        />,
      );
    }
    return segments;
  };

  return (
    <View style={localStyles.container}>
      <View style={localStyles.header}>
        <Text style={localStyles.title}>Health Score</Text>
        <View style={localStyles.scoreContainer}>
          <Text style={[localStyles.score, { color: status.color }]}>
            {score.toFixed(1)}
          </Text>
          <Text style={localStyles.maxScore}>/10</Text>
        </View>
      </View>

      <View style={localStyles.statusContainer}>
        <Text style={localStyles.emoji}>{status.emoji}</Text>
        <Text style={[localStyles.statusLabel, { color: status.color }]}>
          {status.label}
        </Text>
      </View>

      {/* Segmented Progress Bar */}
      <View style={localStyles.progressBarContainer}>
        <View style={localStyles.segmentsContainer}>{renderSegments()}</View>

        {/* Animated Progress Overlay */}
        <View style={localStyles.progressOverlay}>
          <Animated.View
            style={[
              localStyles.progressFill,
              {
                width: widthPercentage,
              },
            ]}
          />
        </View>

        {/* Score Labels */}
        <View style={localStyles.labelsContainer}>
          <Text style={localStyles.label}>0</Text>
          <Text style={localStyles.label}>5</Text>
          <Text style={localStyles.label}>10</Text>
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  score: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
  },
  maxScore: {
    fontSize: 18,
    fontWeight: '600',
    color: '#A3A3A3',
    marginLeft: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  emoji: {
    fontSize: 20,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressBarContainer: {
    position: 'relative',
  },
  segmentsContainer: {
    flexDirection: 'row',
    gap: 4,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    borderRadius: 4,
  },
  progressOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 24,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'transparent',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A3A3A3',
  },
});
