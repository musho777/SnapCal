import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
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
} from '@gorhom/bottom-sheet';

const MIN = 120;
const MAX = 220;

const HeightModal = ({
  visible,
  current,
  onSave,
  onClose,
  loading = false,
}) => {
  const unit = 'cm';
  const [cm, setCm] = useState(current || 170);

  const bottomSheetRef = useRef(null);
  const displayAnim = useSharedValue(1);

  const snapPoints = useMemo(() => ['53%'], []);

  useEffect(() => {
    if (visible) {
      setCm(current || 170);
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [visible, current]);

  useEffect(() => {
    displayAnim.value = withSequence(
      withTiming(0.85, { duration: 80 }),
      withSpring(1, { damping: 10, stiffness: 300 }),
    );
  }, [cm]);

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
    onSave(cm);
    onClose();
  }, [cm, onSave, onClose]);

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

  const cmToFeetInches = paramCm => {
    const totalInches = paramCm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  };

  const getDisplayValue = () => {
    if (unit === 'cm') {
      return { main: cm, unit: 'cm' };
    } else {
      const { feet, inches } = cmToFeetInches(cm);
      return { main: `${feet}' ${inches}"`, unit: '' };
    }
  };

  const displayVal = getDisplayValue();

  // Height category based on cm
  const getHeightCategory = () => {
    if (cm < 150) return { label: 'Short', color: '#3B82F6' };
    if (cm < 165) return { label: 'Below Average', color: '#8B5CF6' };
    if (cm < 175) return { label: 'Average', color: '#22C55E' };
    if (cm < 185) return { label: 'Above Average', color: '#F59E0B' };
    return { label: 'Tall', color: '#EF4444' };
  };

  const heightInfo = getHeightCategory();

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onDismiss={handleDismiss}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.bottomSheetBackground}
      activeOffsetX={[-999, 999]}
      activeOffsetY={[-5, 5]}
      enableContentPanningGesture={false}
    >
      <BottomSheetView style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} disabled={loading}>
            <Text style={[styles.cancelText, loading && styles.disabledText]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Height</Text>
          <TouchableOpacity
            onPress={handleSave}
            style={[styles.saveBtn, loading && styles.saveBtnDisabled]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.saveBtnText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </BottomSheetView>

      <BottomSheetView style={styles.content}>
        {/* <View style={styles.unitToggle}>
          {['cm', 'ft'].map(u => (
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
                {u === 'cm' ? 'Centimeters' : 'Feet & Inches'}
              </Text>
            </TouchableOpacity>
          ))}
        </View> */}

        {/* Big display */}
        <View style={styles.displayContainer}>
          <Animated.View style={[styles.displayRow, displayStyle]}>
            <Text style={styles.bigNumber}>{displayVal.main}</Text>
            {displayVal.unit && (
              <Text style={styles.bigUnit}>{displayVal.unit}</Text>
            )}
          </Animated.View>

          {/* Height category badge */}
          <View style={styles.categoryRow}>
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: heightInfo.color + '18' },
              ]}
            >
              <Text style={[styles.categoryLabel, { color: heightInfo.color }]}>
                {heightInfo.label}
              </Text>
            </View>
          </View>

          <Text style={styles.infoText}>
            Height is used for BMI calculation and calorie recommendations
          </Text>
        </View>

        {/* Slider */}
        <View style={styles.sliderContainer}>
          <View style={styles.sliderWrapper}>
            <Slider
              value={cm}
              onValueChange={val => setCm(Math.round(val))}
              minimumValue={MIN}
              maximumValue={MAX}
              step={1}
              minimumTrackTintColor={heightInfo.color}
              maximumTrackTintColor="#F0F0F0"
              thumbTintColor="#1A1A1A"
              style={styles.slider}
            />
          </View>

          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>{MIN} cm</Text>
            <Text style={styles.sliderCenterLabel}>Height Range</Text>
            <Text style={styles.sliderLabel}>{MAX} cm</Text>
          </View>
        </View>

        {/* Manual ± */}
        <View style={styles.manualRow}>
          <Text style={styles.manualLabel}>Enter manually</Text>
          <View style={styles.manualControls}>
            <TouchableOpacity
              onPress={() => setCm(h => Math.max(MIN, h - 1))}
              style={styles.minusBtn}
            >
              <Text style={styles.minusBtnText}>−</Text>
            </TouchableOpacity>
            <View style={styles.valueBox}>
              <Text style={styles.valueBoxText}>{cm}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setCm(h => Math.min(MAX, h + 1))}
              style={styles.plusBtn}
            >
              <Text style={styles.plusBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetView>
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
    zIndex: 10,
    backgroundColor: '#fff',
  },
  content: {
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 7,
    paddingBottom: 14,
  },
  cancelText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  disabledText: {
    opacity: 0.4,
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
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnDisabled: {
    opacity: 0.6,
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
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  categoryBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  infoText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 6,
    textAlign: 'center',
  },
  sliderContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sliderWrapper: {
    position: 'relative',
    marginBottom: 8,
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
  sliderCenterLabel: {
    fontSize: 10,
    color: '#6B7280',
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

export default HeightModal;
