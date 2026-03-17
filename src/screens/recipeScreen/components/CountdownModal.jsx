import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CLOCK_SIZE = width * 0.7;
const STROKE_WIDTH = 20;
const RADIUS = (CLOCK_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CountdownModal = ({ visible, onClose, cookTime, stepText }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      const minutes = parseInt(cookTime) || 0;
      setTimeLeft(minutes * 60);

      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [visible, timeLeft]);

  useEffect(() => {
    const minutes = parseInt(cookTime) || 1;
    const totalSeconds = minutes * 60;
    const progress = timeLeft / totalSeconds;

    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [timeLeft]);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.stepLabel}>Cooking Timer</Text>
          </View>

          {stepText && (
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepText} numberOfLines={2}>
                {stepText}
              </Text>
            </View>
          )}

          <Animated.View style={[styles.clockContainer]}>
            <Svg width={CLOCK_SIZE} height={CLOCK_SIZE}>
              <G rotation="-90" origin={`${CLOCK_SIZE / 2}, ${CLOCK_SIZE / 2}`}>
                <Circle
                  cx={CLOCK_SIZE / 2}
                  cy={CLOCK_SIZE / 2}
                  r={RADIUS}
                  stroke="#F3F4F6"
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
                />
                <AnimatedCircle
                  cx={CLOCK_SIZE / 2}
                  cy={CLOCK_SIZE / 2}
                  r={RADIUS}
                  stroke="#10B981"
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </G>
            </Svg>

            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
              <Text style={styles.timeLabel}>
                {timeLeft > 60 ? 'minutes left' : 'seconds left'}
              </Text>
            </View>
          </Animated.View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.closeButton}
              onPress={handleClose}
              android_ripple={{ color: '#E5E7EB' }}
            >
              <Text style={styles.closeButtonText}>Close Timer</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 30,
    width: width * 0.9,
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    marginBottom: 15,
  },
  stepLabel: {
    fontSize: 24,
    fontWeight: '700',
    color: '#171717',
    textAlign: 'center',
  },
  stepTextContainer: {
    backgroundColor: '#F9FAFB',
    padding: 15,
    borderRadius: 15,
    marginBottom: 25,
    width: '100%',
  },
  stepText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  clockContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  timeContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 56,
    fontWeight: '700',
    color: '#171717',
    letterSpacing: -2,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
  },
});
