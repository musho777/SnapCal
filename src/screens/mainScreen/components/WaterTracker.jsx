import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';

export const WaterTracker = ({ waterIntake = 0, onWaterChange }) => {
  const scaleAnims = useRef(
    Array.from({ length: 8 }).map(() => new Animated.Value(1)),
  ).current;

  const pressScaleAnims = useRef(
    Array.from({ length: 8 }).map(() => new Animated.Value(1)),
  ).current;

  useEffect(() => {
    scaleAnims.forEach((scale, index) => {
      const isFilled = index < waterIntake;
      Animated.spring(scale, {
        toValue: isFilled ? 1.05 : 1,
        damping: 10,
        stiffness: 180,
        useNativeDriver: true,
      }).start();
    });
  }, [waterIntake]);

  const handleGlassTap = index => {
    let newWater;

    if (index < waterIntake) {
      newWater = index;
    } else {
      newWater = index + 1;
    }

    Animated.sequence([
      Animated.spring(scaleAnims[index], {
        toValue: 1.1,
        damping: 12,
        stiffness: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnims[index], {
        toValue: newWater > index ? 1.05 : 1,
        damping: 10,
        stiffness: 180,
        useNativeDriver: true,
      }),
    ]).start();

    if (onWaterChange) {
      onWaterChange(newWater);
    }
  };

  const handlePressIn = index => {
    Animated.spring(pressScaleAnims[index], {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = index => {
    Animated.spring(pressScaleAnims[index], {
      toValue: 1,
      friction: 4,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const getStatusColor = () => {
    if (waterIntake === 0) return '#9CA3AF';
    if (waterIntake >= 1 && waterIntake <= 3) return '#EF4444';
    if (waterIntake >= 4 && waterIntake <= 5) return '#F59E0B';
    if (waterIntake >= 6 && waterIntake <= 8) return '#3B82F6';
    return '#9CA3AF';
  };

  const getStatusText = () => {
    if (waterIntake === 0) return 'Not started';
    if (waterIntake >= 1 && waterIntake <= 3) return 'Low hydration';
    if (waterIntake >= 4 && waterIntake <= 5) return 'Getting there';
    if (waterIntake >= 6 && waterIntake <= 7) return 'Good progress';
    if (waterIntake === 8) return 'Goal achieved!';
    return '';
  };
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>TODAY'S WATER</Text>
        <View>
          <View style={styles.statusContainer}>
            <View style={styles.valueRow}>
              <Text style={styles.value}>{waterIntake}</Text>
              <Text style={styles.goal}> / 8 glasses</Text>
            </View>
            <View
              style={[
                styles.valueRow,
                styles.gap,
                { backgroundColor: getStatusColor() + '10' },
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getStatusColor() },
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  {
                    color: getStatusColor(),
                  },
                ]}
              >
                {getStatusText()}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.glassesContainer}>
        {Array.from({ length: 8 }).map((_, i) => {
          const filled = i < waterIntake;
          return (
            <Animated.View
              key={i}
              style={[
                styles.glassWrapper,
                {
                  transform: [
                    { scale: scaleAnims[i] },
                    { scale: pressScaleAnims[i] },
                  ],
                },
              ]}
            >
              <Pressable
                onPress={() => handleGlassTap(i)}
                onPressIn={() => handlePressIn(i)}
                onPressOut={() => handlePressOut(i)}
                style={[
                  styles.glass,
                  filled ? styles.glassFilled : styles.glassEmpty,
                ]}
              >
                <Text style={styles.dropEmoji}>{filled ? '💧' : ''}</Text>
              </Pressable>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gap: {
    gap: 4,
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  value: {
    fontSize: 12,
    fontWeight: '900',
    color: '#272727',
  },
  goal: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  glassesContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  glassWrapper: {
    flex: 1,
  },
  glass: {
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassFilled: {
    borderColor: '#3B82F6',
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  glassEmpty: {
    borderColor: '#E8E8E8',
    backgroundColor: '#F7F8FA',
  },
  dropEmoji: {
    fontSize: 15,
  },
});
