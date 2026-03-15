import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Header = ({ current, date, getBmiStyles, height }) => {
  const insets = useSafeAreaInsets();
  const calcBmi = w => parseFloat((w / (height / 100) ** 2).toFixed(1));

  const bmiCurrent = calcBmi(current);
  const currentBmiStyles = getBmiStyles(bmiCurrent);

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const headerStyle = [localStyles.header, { paddingTop: insets.top + 8 }];
  const navigation = useNavigation();
  return (
    <View style={headerStyle}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={localStyles.backButton}
      >
        <Text style={localStyles.backButtonText}>‹</Text>
      </TouchableOpacity>

      <View style={localStyles.headerTextContainer}>
        <Text style={localStyles.headerTitle}>⚖️ Weight Progress</Text>
        {formattedDate && (
          <Text style={localStyles.headerSubtitle}>
            Tracking since {formattedDate}
          </Text>
        )}
      </View>

      {/* BMI badge */}
      <View style={[localStyles.bmiBadge, currentBmiStyles.bg]}>
        <Text style={[localStyles.bmiBadgeText, currentBmiStyles.text]}>
          BMI {bmiCurrent}
        </Text>
      </View>
    </View>
  );
};
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  scrollContent: {
    paddingBottom: 35,
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F7F8FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A1A1A',
    letterSpacing: -0.4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  bmiBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  bmiBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  // Stat pills
  statPillsRow: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  statPill: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  statPillIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  statPillValue: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  statPillLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '600',
    marginTop: 2,
  },
  bmiUnderweightBg: {
    backgroundColor: '#3B82F618',
  },
  bmiNormalBg: {
    backgroundColor: '#22C55E18',
  },
  bmiOverweightBg: {
    backgroundColor: '#F59E0B18',
  },
  bmiObeseBg: {
    backgroundColor: '#EF444418',
  },
  // BMI category text styles
  bmiUnderweightText: {
    color: '#3B82F6',
  },
  bmiNormalText: {
    color: '#22C55E',
  },
  bmiOverweightText: {
    color: '#F59E0B',
  },
  bmiObeseText: {
    color: '#EF4444',
  },
});
