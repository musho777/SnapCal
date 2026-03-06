import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { CheckCircle, XCircle, X } from 'lucide-react-native';

const AlertModal = ({ visible, type = 'success', title, message, onClose }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
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
      ]).start();
    }
  }, [visible, scaleAnim, fadeAnim]);

  const isSuccess = type === 'success';
  const iconColor = isSuccess ? '#10B981' : '#EF4444';
  const IconComponent = isSuccess ? CheckCircle : XCircle;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[localStyles.overlay, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={localStyles.overlayTouchable}
          activeOpacity={1}
          onPress={onClose}
        />
      </Animated.View>

      <Animated.View
        style={[
          localStyles.modalContent,
          {
            transform: [{ scale: scaleAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <View style={localStyles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={localStyles.closeButton}
          >
            <X size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={localStyles.content}>
          <View style={[localStyles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
            <IconComponent size={48} color={iconColor} />
          </View>

          <Text style={localStyles.title}>{title}</Text>
          <Text style={localStyles.message}>{message}</Text>
        </View>

        <TouchableOpacity
          style={[
            localStyles.button,
            { backgroundColor: iconColor },
          ]}
          onPress={onClose}
        >
          <Text style={localStyles.buttonText}>OK</Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTouchable: {
    flex: 1,
    width: '100%',
  },
  modalContent: {
    position: 'absolute',
    width: '85%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    alignSelf: 'center',
    top: '35%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 15,
    paddingRight: 15,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 25,
    paddingBottom: 20,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#272727',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default AlertModal;
