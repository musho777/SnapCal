import React, { useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import aiAnimation from '../assets/ai.json';

const BUTTON_SIZE = 40;
const BUTTON_RADIUS = BUTTON_SIZE / 2;

const DraggableAIButton = ({ onPress }) => {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const initialX = screenWidth - BUTTON_SIZE - 15;
  const initialY = screenHeight - BUTTON_SIZE - insets.bottom - 80;

  const pan = useRef(
    new Animated.ValueXY({ x: initialX, y: initialY }),
  ).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isDragging, setIsDragging] = useState(false);

  const handlePressIn = () => {
    if (!isDragging) {
      Animated.spring(scaleAnim, {
        toValue: 0.92,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (!isDragging) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }).start();
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        setIsDragging(true);
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),

      onPanResponderRelease: (_, gesture) => {
        pan.flattenOffset();
        setIsDragging(false);

        const currentX = pan.x._value;
        const currentY = pan.y._value;

        const minX = 0;
        const maxX = screenWidth - BUTTON_SIZE;
        const minY = insets.top;
        const maxY = screenHeight - BUTTON_SIZE - insets.bottom;

        let finalX = Math.max(minX, Math.min(currentX, maxX));
        let finalY = Math.max(minY, Math.min(currentY, maxY));

        if (Math.abs(gesture.dx) > 5 || Math.abs(gesture.dy) > 5) {
          const centerX = finalX + BUTTON_RADIUS;
          if (centerX < screenWidth / 2) {
            finalX = minX + 16; // Snap to left with padding
          } else {
            finalX = maxX - 16; // Snap to right with padding
          }
        }

        // Animate to final position
        Animated.spring(pan, {
          toValue: { x: finalX, y: finalY },
          useNativeDriver: false,
          friction: 7,
          tension: 40,
        }).start();

        // If no significant drag happened, treat as tap
        if (Math.abs(gesture.dx) < 5 && Math.abs(gesture.dy) < 5) {
          onPress?.();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.container,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.button}
        >
          <LottieView
            source={aiAnimation}
            autoPlay
            loop
            style={styles.lottie}
          />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    zIndex: 9999,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_RADIUS,
    backgroundColor: '#6B39F4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  lottie: {
    width: 82,
    height: 82,
  },
});

export default DraggableAIButton;
