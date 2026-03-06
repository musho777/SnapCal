import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  X,
  Calendar,
  Sun,
  CloudSun,
  Moon,
  Pizza,
  Minus,
  Plus,
} from 'lucide-react-native';

const MEAL_TYPES = [
  { label: 'Breakfast', value: 'breakfast', Icon: Sun },
  { label: 'Lunch', value: 'lunch', Icon: CloudSun },
  { label: 'Dinner', value: 'dinner', Icon: Moon },
  { label: 'Snack', value: 'snack', Icon: Pizza },
];

const AddToMealModal = ({ visible, onClose, onSubmit, dishId, loading }) => {
  const [mealType, setMealType] = useState('breakfast');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [servings, setServings] = useState('1');
  const [errors, setErrors] = useState({});

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);

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

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!mealType) {
      newErrors.mealType = 'Please select a meal type';
    }

    if (!date) {
      newErrors.date = 'Date is required';
    }

    const servingsNum = parseInt(servings, 10);
    if (!servings || isNaN(servingsNum) || servingsNum < 1) {
      newErrors.servings = 'Servings must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
  };

  const formatDate = selectedDate => {
    return selectedDate.toISOString().split('T')[0];
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const data = {
      dish_id: dishId,
      meal_type: mealType,
      date: formatDate(date),
      servings: parseInt(servings, 10),
    };

    onSubmit(data);
  };

  const incrementServings = () => {
    const current = parseInt(servings, 10) || 0;
    setServings(String(current + 1));
  };

  const decrementServings = () => {
    const current = parseInt(servings, 10) || 1;
    if (current > 1) {
      setServings(String(current - 1));
    }
  };
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={localStyles.container}
      >
        <Animated.View style={[localStyles.overlay, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={localStyles.overlayTouchable}
            activeOpacity={1}
            onPress={handleClose}
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
            <Text style={localStyles.title}>Add to Meal</Text>
            <TouchableOpacity
              onPress={handleClose}
              style={localStyles.closeButton}
            >
              <X size={18} color="#272727" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={localStyles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* Meal Type Selection */}
            <View style={localStyles.section}>
              <Text style={localStyles.label}>Meal Type</Text>
              <View style={localStyles.mealTypeContainer}>
                {MEAL_TYPES.map(type => {
                  const IconComponent = type.Icon;
                  return (
                    <TouchableOpacity
                      key={type.value}
                      style={[
                        localStyles.mealTypeButton,
                        mealType === type.value &&
                          localStyles.mealTypeButtonActive,
                      ]}
                      onPress={() => setMealType(type.value)}
                    >
                      <IconComponent
                        size={18}
                        color={mealType === type.value ? '#FFFFFF' : '#272727'}
                      />
                      <Text
                        style={[
                          localStyles.mealTypeText,
                          mealType === type.value &&
                            localStyles.mealTypeTextActive,
                        ]}
                      >
                        {type.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {errors.mealType && (
                <Text style={localStyles.errorText}>{errors.mealType}</Text>
              )}
            </View>

            {/* Date Input */}
            <View style={localStyles.section}>
              <Text style={localStyles.label}>Date</Text>
              <TouchableOpacity
                style={localStyles.inputContainer}
                onPress={() => setShowDatePicker(true)}
              >
                <Calendar
                  size={18}
                  color="#6B39F4"
                  style={localStyles.inputIcon}
                />
                <Text style={localStyles.dateText}>{formatDate(date)}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <>
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                  />
                  {Platform.OS === 'ios' && (
                    <TouchableOpacity
                      style={localStyles.datePickerDoneButton}
                      onPress={closeDatePicker}
                    >
                      <Text style={localStyles.datePickerDoneText}>Done</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
              {errors.date && (
                <Text style={localStyles.errorText}>{errors.date}</Text>
              )}
            </View>

            {/* Servings Input */}
            <View style={localStyles.section}>
              <Text style={localStyles.label}>Servings</Text>
              <View style={localStyles.servingsContainer}>
                <TouchableOpacity
                  style={localStyles.servingsButton}
                  onPress={decrementServings}
                >
                  <Minus size={18} color="#6B39F4" />
                </TouchableOpacity>
                <TextInput
                  style={localStyles.servingsInput}
                  value={servings}
                  onChangeText={setServings}
                  keyboardType="numeric"
                  textAlign="center"
                />
                <TouchableOpacity
                  style={localStyles.servingsButton}
                  onPress={incrementServings}
                >
                  <Plus size={18} color="#6B39F4" />
                </TouchableOpacity>
              </View>
              {errors.servings && (
                <Text style={localStyles.errorText}>{errors.servings}</Text>
              )}
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={localStyles.footer}>
            <TouchableOpacity
              style={localStyles.cancelButton}
              onPress={handleClose}
            >
              <Text style={localStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                localStyles.submitButton,
                loading && localStyles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={localStyles.submitButtonText}>
                {loading ? 'Adding...' : 'Add to Meal'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouchable: {
    flex: 1,
  },
  modalContent: {
    position: 'absolute',
    width: '90%',
    maxWidth: 450,
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#272727',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#272727',
    marginBottom: 10,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  mealTypeButton: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  mealTypeButtonActive: {
    backgroundColor: '#6B39F4',
    borderColor: '#6B39F4',
  },
  mealTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#272727',
  },
  mealTypeTextActive: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#272727',
    padding: 0,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#272727',
  },
  datePickerDoneButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#6B39F4',
    borderRadius: 8,
    alignItems: 'center',
  },
  datePickerDoneText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  servingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  servingsButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  servingsInput: {
    fontSize: 20,
    fontWeight: '700',
    color: '#272727',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 10,
    width: 80,
  },
  errorText: {
    fontSize: 12,
    color: '#FF4444',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#272727',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default AddToMealModal;
