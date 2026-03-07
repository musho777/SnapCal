import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import Slider from '@react-native-community/slider';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

const MIN = 30;
const MAX = 200;

const WeightModal = ({ visible, current, height, onSave, onClose }) => {
  const [unit, setUnit] = useState('kg');
  const [kg, setKg] = useState(current || 70);

  const bottomSheetRef = useRef(null);
  const displayAnim = useSharedValue(1);

  const snapPoints = useMemo(() => ['66%'], []);

  useEffect(() => {
    if (visible) {
      setKg(current || 70);
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [visible, current]);

  // Animate display value when kg changes
  useEffect(() => {
    displayAnim.value = withSequence(
      withTiming(0.85, { duration: 80 }),
      withSpring(1, { damping: 10, stiffness: 300 }),
    );
  }, [kg]);

  const displayStyle = useAnimatedStyle(() => ({
    transform: [{ scale: displayAnim.value }],
  }));

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleDismiss = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSave = useCallback(() => {
    onSave(kg);
    handleClose();
  }, [kg, onSave, handleClose]);

  // Render custom backdrop
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    [],
  );

  // BMI calculation
  const bmiVal = (kg / (height / 100) ** 2).toFixed(1);

  const getBmiInfo = () => {
    const b = parseFloat(bmiVal);
    if (b < 18.5) return { label: 'Underweight', color: '#3B82F6' };
    if (b < 25) return { label: 'Normal ✓', color: '#22C55E' };
    if (b < 30) return { label: 'Overweight', color: '#F59E0B' };
    return { label: 'Obese', color: '#EF4444' };
  };

  const bmiInfo = getBmiInfo();

  // Ideal weight range (BMI 18.5–24.9)
  const idealMin = Math.round(18.5 * (height / 100) ** 2);
  const idealMax = Math.round(24.9 * (height / 100) ** 2);

  // Slider positions (0–100%)
  const idealMinPct = ((idealMin - MIN) / (MAX - MIN)) * 100;
  const idealMaxPct = ((idealMax - MIN) / (MAX - MIN)) * 100;

  // Display value: kg or lbs
  const displayVal = unit === 'kg' ? kg : Math.round(kg * 2.2046);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onDismiss={handleDismiss}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.bottomSheetBackground}
    >
      <BottomSheetView style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Weight</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>

      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.unitToggle}>
          {['kg', 'lbs'].map(u => (
            <TouchableOpacity
              key={u}
              onPress={() => setUnit(u)}
              style={[styles.unitBtn, unit === u && styles.unitBtnActive]}
            >
              <Text
                style={[
                  styles.unitBtnText,
                  unit === u && styles.unitBtnTextActive,
                ]}
              >
                {u === 'kg' ? 'Kilograms' : 'Pounds'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Big display */}
        <View style={styles.displayContainer}>
          <Animated.View style={[styles.displayRow, displayStyle]}>
            <Text style={styles.bigNumber}>{displayVal}</Text>
            <Text style={styles.bigUnit}>{unit}</Text>
          </Animated.View>

          {/* BMI badge */}
          <View style={styles.bmiRow}>
            <Text style={styles.bmiText}>BMI {bmiVal}</Text>
            <View
              style={[
                styles.bmiBadge,
                { backgroundColor: bmiInfo.color + '18' },
              ]}
            >
              <Text style={[styles.bmiLabel, { color: bmiInfo.color }]}>
                {bmiInfo.label}
              </Text>
            </View>
          </View>

          {/* Ideal range text */}
          <Text style={styles.idealText}>
            Ideal for your height:{' '}
            <Text style={styles.idealRange}>
              {idealMin}–{idealMax} kg
            </Text>
          </Text>
        </View>

        {/* Slider */}
        <View style={styles.sliderContainer}>
          <View style={styles.sliderWrapper}>
            {/* Ideal zone overlay */}
            <View
              style={[
                styles.idealZone,
                {
                  left: `${idealMinPct}%`,
                  width: `${idealMaxPct - idealMinPct}%`,
                },
              ]}
            />

            <Slider
              value={kg}
              onValueChange={val => setKg(Math.round(val * 2) / 2)}
              minimumValue={MIN}
              maximumValue={MAX}
              step={0.5}
              minimumTrackTintColor={bmiInfo.color}
              maximumTrackTintColor="#F0F0F0"
              thumbTintColor="#1A1A1A"
              style={styles.slider}
            />
          </View>

          {/* Min / Ideal label / Max */}
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>{MIN} kg</Text>
            <Text style={styles.sliderIdealLabel}>
              ✓ Ideal: {idealMin}–{idealMax} kg
            </Text>
            <Text style={styles.sliderLabel}>{MAX} kg</Text>
          </View>
        </View>

        {/* Manual ± */}
        <View style={styles.manualRow}>
          <Text style={styles.manualLabel}>Enter manually</Text>
          <View style={styles.manualControls}>
            <TouchableOpacity
              onPress={() =>
                setKg(k => Math.max(MIN, parseFloat((k - 0.5).toFixed(1))))
              }
              style={styles.minusBtn}
            >
              <Text style={styles.minusBtnText}>−</Text>
            </TouchableOpacity>
            <View style={styles.valueBox}>
              <Text style={styles.valueBoxText}>{kg}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                setKg(k => Math.min(MAX, parseFloat((k + 0.5).toFixed(1))))
              }
              style={styles.plusBtn}
            >
              <Text style={styles.plusBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#fff',
  },
  handleIndicator: {
    backgroundColor: '#E5E7EB',
    width: 36,
    height: 4,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  cancelText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1A1A1A',
    letterSpacing: -0.3,
  },
  saveBtn: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  saveBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#fff',
  },
  unitToggle: {
    flexDirection: 'row',
    backgroundColor: '#F7F8FA',
    borderRadius: 14,
    padding: 4,
    marginHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
  },
  unitBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  unitBtnActive: {
    backgroundColor: '#1A1A1A',
  },
  unitBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#9CA3AF',
  },
  unitBtnTextActive: {
    color: '#fff',
  },
  displayContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  bigNumber: {
    fontSize: 72,
    fontWeight: '900',
    color: '#1A1A1A',
    letterSpacing: -3,
  },
  bigUnit: {
    fontSize: 22,
    fontWeight: '700',
    color: '#9CA3AF',
    marginLeft: 6,
  },
  bmiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  bmiText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  bmiBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  bmiLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  idealText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 6,
  },
  idealRange: {
    color: '#22C55E',
    fontWeight: '700',
  },
  sliderContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sliderWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  idealZone: {
    position: 'absolute',
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E33',
    top: 17,
    zIndex: 1,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  sliderIdealLabel: {
    fontSize: 10,
    color: '#22C55E',
    fontWeight: '700',
  },
  quickSelectContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FAFAFA',
    borderWidth: 2,
    borderColor: '#F0F0F0',
  },
  pillActive: {
    backgroundColor: '#1A1A1A',
    borderColor: '#1A1A1A',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },
  pillTextActive: {
    color: '#fff',
  },
  manualRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F7F8FA',
    borderRadius: 16,
    paddingLeft: 16,
    paddingRight: 4,
    paddingVertical: 4,
    marginHorizontal: 20,
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
  },
  manualLabel: {
    flex: 1,
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  manualControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  minusBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  minusBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  valueBox: {
    width: 60,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueBoxText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  plusBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
});

export default WeightModal;
