import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useDispatch, useSelector } from 'react-redux';
import { getUserMeasurement } from '../../features/user/userAction';
import {
  selectLoading,
  selectUserMeasurement,
} from '../../features/user/userSlice';
import Loading from '../../components/loading/Loading';
import { Header } from './components/Header';

const MOCK_WEIGHT_HISTORY = [
  { id: 1, date: '2025-12-01', weight: 85.5, note: '' },
  { id: 2, date: '2025-12-03', weight: 85.2, note: '' },
  { id: 3, date: '2025-12-05', weight: 84.8, note: '' },
  { id: 4, date: '2025-12-08', weight: 84.5, note: '' },
  { id: 5, date: '2025-12-10', weight: 84.0, note: '' },
  { id: 6, date: '2025-12-12', weight: 83.8, note: '' },
  { id: 7, date: '2025-12-15', weight: 83.5, note: '' },
  { id: 8, date: '2025-12-17', weight: 83.0, note: '' },
  { id: 9, date: '2025-12-20', weight: 82.8, note: '' },
  { id: 10, date: '2025-12-22', weight: 82.5, note: '' },
  { id: 11, date: '2025-12-25', weight: 82.2, note: '' },
  { id: 12, date: '2025-12-27', weight: 81.8, note: '' },
  { id: 13, date: '2025-12-30', weight: 81.5, note: '' },
  { id: 14, date: '2026-01-02', weight: 81.0, note: '' },
  { id: 15, date: '2026-01-05', weight: 80.8, note: '' },
  { id: 16, date: '2026-01-08', weight: 80.5, note: '' },
  { id: 17, date: '2026-01-10', weight: 80.2, note: '' },
  { id: 18, date: '2026-01-13', weight: 79.8, note: '' },
  { id: 19, date: '2026-01-15', weight: 79.5, note: '' },
  { id: 20, date: '2026-01-18', weight: 79.0, note: '' },
  { id: 21, date: '2026-01-20', weight: 78.8, note: '' },
  { id: 22, date: '2026-01-23', weight: 78.5, note: '' },
  { id: 23, date: '2026-01-25', weight: 78.2, note: '' },
  { id: 24, date: '2026-01-28', weight: 78.0, note: '' },
  { id: 25, date: '2026-02-01', weight: 77.5, note: '' },
  { id: 26, date: '2026-02-03', weight: 77.2, note: '' },
  { id: 27, date: '2026-02-06', weight: 76.8, note: '' },
  { id: 28, date: '2026-02-08', weight: 76.5, note: '' },
  { id: 29, date: '2026-02-11', weight: 76.0, note: '' },
  { id: 30, date: '2026-02-14', weight: 75.8, note: '' },
  { id: 31, date: '2026-02-17', weight: 75.5, note: '' },
  { id: 32, date: '2026-02-20', weight: 75.0, note: '' },
  { id: 33, date: '2026-02-23', weight: 74.8, note: '' },
  { id: 34, date: '2026-02-26', weight: 74.5, note: '' },
  { id: 35, date: '2026-03-01', weight: 74.2, note: '' },
  { id: 36, date: '2026-03-04', weight: 74.0, note: '' },
  { id: 37, date: '2026-03-07', weight: 73.5, note: '' },
];

const GOAL_WEIGHT = 70;
const HEIGHT_CM = 175;

const calcBmi = w => parseFloat((w / (HEIGHT_CM / 100) ** 2).toFixed(1));

const bmiInfo = b => {
  if (b < 18.5) return { label: 'Underweight', color: '#3B82F6' };
  if (b < 25) return { label: 'Normal ✓', color: '#22C55E' };
  if (b < 30) return { label: 'Overweight', color: '#F59E0B' };
  return { label: 'Obese', color: '#EF4444' };
};

const filterEntries = (entries, f) => {
  const days = f === '1W' ? 7 : f === '1M' ? 30 : f === '3M' ? 90 : 9999;
  return entries.slice(-days);
};

const WeightProgressScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const screenWidth = Dimensions.get('window').width;
  const data = useSelector(selectUserMeasurement);
  const loading = useSelector(selectLoading);
  const [allEntries] = useState(MOCK_WEIGHT_HISTORY);
  const [filter, setFilter] = useState('1M');
  const [showAllLog, setShowAllLog] = useState(false);

  const filtered = useMemo(
    () => filterEntries(allEntries, filter),
    [allEntries, filter],
  );
  const current = +data[data.length - 1]?.weight_kg ?? 0;
  const startWeight = +data[0]?.weight_kg ?? 0;

  const chartWidth = screenWidth - 100;
  const barWidth = filtered.length > 30 ? 6 : filtered.length > 14 ? 10 : 14;
  const totalBarsWidth = barWidth * filtered.length;
  const availableSpace = chartWidth - totalBarsWidth - 20;
  const spacing = Math.max(2, availableSpace / (filtered.length - 1));

  // Build bar chart data
  const barData = filtered.map((e, i) => {
    const d = new Date(e.date + 'T00:00:00');
    const isLatest = i === filtered.length - 1;

    // Show label for every ~5th entry or if very few entries
    const labelStep = Math.max(1, Math.floor(filtered.length / 5));
    const showLabel = i % labelStep === 0 || isLatest || i === 0;

    const label = showLabel
      ? filtered.length <= 7
        ? d.toLocaleDateString('en-US', { weekday: 'short' })
        : `${d.getMonth() + 1}/${d.getDate()}`
      : '';

    return {
      value: e.weight,
      label: label,
      frontColor: isLatest ? '#272727' : '#E5E7EB',
      labelTextStyle: isLatest
        ? localStyles.barLabelActive
        : localStyles.barLabelInactive,
    };
  });

  const minW = Math.floor(
    Math.min(...filtered.map(e => e.weight), GOAL_WEIGHT) - 1,
  );
  const maxW = Math.ceil(
    Math.max(...filtered.map(e => e.weight), GOAL_WEIGHT) + 1,
  );

  const reversedEntries = [...allEntries].reverse();
  const visibleEntries = showAllLog
    ? reversedEntries
    : reversedEntries.slice(0, 7);

  const bmiStart = calcBmi(startWeight);
  const bmiCurrent = calcBmi(current);

  const getBmiStyles = bmi => {
    const info = bmiInfo(bmi);
    if (info.color === '#3B82F6')
      return {
        bg: localStyles.bmiUnderweightBg,
        text: localStyles.bmiUnderweightText,
      };
    if (info.color === '#22C55E')
      return { bg: localStyles.bmiNormalBg, text: localStyles.bmiNormalText };
    if (info.color === '#F59E0B')
      return {
        bg: localStyles.bmiOverweightBg,
        text: localStyles.bmiOverweightText,
      };
    return { bg: localStyles.bmiObeseBg, text: localStyles.bmiObeseText };
  };

  const startBmiStyles = getBmiStyles(bmiStart);
  const currentBmiStyles = getBmiStyles(bmiCurrent);

  useEffect(() => {
    dispatch(getUserMeasurement());
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <View style={localStyles.container}>
      <Header current={current} date={allEntries[0]?.date} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={localStyles.scrollContent}
      >
        <View style={localStyles.beforeAfterContainer}>
          <View style={localStyles.beforeAfterRow}>
            {/* Starting */}
            <View style={localStyles.startingCard}>
              <Text style={localStyles.cardLabel}>STARTING</Text>
              <Text style={localStyles.startingWeight}>
                {startWeight}
                <Text style={localStyles.weightUnit}> kg</Text>
              </Text>
              <View style={[localStyles.bmiTag, startBmiStyles.bg]}>
                <Text style={[localStyles.bmiTagText, startBmiStyles.text]}>
                  BMI {bmiStart} · {bmiInfo(bmiStart).label}
                </Text>
              </View>
            </View>

            <Text style={localStyles.arrow}>→</Text>

            {/* Current */}
            <View style={localStyles.currentCard}>
              <Text style={localStyles.currentCardLabel}>CURRENT</Text>
              <Text style={localStyles.currentWeight}>
                {current}
                <Text style={localStyles.currentWeightUnit}> kg</Text>
              </Text>
              <View style={localStyles.currentBmiTag}>
                <Text
                  style={[localStyles.currentBmiTagText, currentBmiStyles.text]}
                >
                  BMI {bmiCurrent} · {bmiInfo(bmiCurrent).label}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={localStyles.chartCard}>
          <View style={localStyles.chartHeader}>
            <View>
              <Text style={localStyles.chartTitle}>Weight Chart</Text>
              <Text style={localStyles.chartSubtitle}>
                {filtered.length > 1
                  ? `${Math.abs(
                      parseFloat(
                        (
                          filtered[0].weight -
                          filtered[filtered.length - 1].weight
                        ).toFixed(1),
                      ),
                    )} kg change this period`
                  : ''}
              </Text>
            </View>

            <View style={localStyles.filterTabs}>
              {['1W', '1M', '3M', 'All'].map(f => (
                <TouchableOpacity
                  key={f}
                  onPress={() => setFilter(f)}
                  style={[
                    localStyles.filterTab,
                    filter === f && localStyles.filterTabActive,
                  ]}
                >
                  <Text
                    style={[
                      localStyles.filterTabText,
                      filter === f && localStyles.filterTabTextActive,
                    ]}
                  >
                    {f}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={localStyles.chartWrapper}>
            <BarChart
              data={barData}
              barWidth={barWidth}
              width={chartWidth}
              barBorderRadius={4}
              noOfSections={4}
              maxValue={maxW}
              minValue={minW}
              yAxisThickness={1}
              yAxisColor="#F3F4F6"
              xAxisThickness={0}
              hideRules={false}
              rulesColor="#F3F4F6"
              rulesType="solid"
              hideYAxisText={false}
              yAxisTextStyle={localStyles.yAxisText}
              yAxisLabelWidth={35}
              initialSpacing={10}
              spacing={spacing}
              height={180}
              isAnimated
              animationDuration={300}
              showLine={false}
              referenceLine1Position={GOAL_WEIGHT}
            />
          </View>
        </View>

        <View style={localStyles.logCard}>
          <View style={localStyles.logHeader}>
            <Text style={localStyles.logTitle}>Weight Log</Text>
            <Text style={localStyles.logCount}>
              {allEntries.length} entries
            </Text>
          </View>

          {visibleEntries.map((entry, i) => {
            const idx = allEntries.findIndex(e => e.date === entry.date);
            const prev = idx > 0 ? allEntries[idx - 1].weight : null;
            const diff =
              prev !== null
                ? parseFloat((entry.weight - prev).toFixed(1))
                : null;
            const b = calcBmi(entry.weight);
            const info = bmiInfo(b);
            const isLatest = i === 0;
            const d = new Date(entry.date + 'T00:00:00');

            const entryBmiStyles = getBmiStyles(b);
            const changeBadgeBg =
              diff === null
                ? null
                : diff < 0
                ? localStyles.changeBadgeLoss
                : diff > 0
                ? localStyles.changeBadgeGain
                : localStyles.changeBadgeNeutral;
            const changeBadgeTextStyle =
              diff === null
                ? null
                : diff < 0
                ? localStyles.changeBadgeTextLoss
                : diff > 0
                ? localStyles.changeBadgeTextGain
                : localStyles.changeBadgeTextNeutral;

            return (
              <View
                key={entry.date}
                style={[
                  localStyles.logEntry,
                  i < visibleEntries.length - 1 && localStyles.logEntryBorder,
                ]}
              >
                {/* Date tile */}
                <View
                  style={[
                    localStyles.dateTile,
                    isLatest && localStyles.dateTileLatest,
                  ]}
                >
                  <Text
                    style={[
                      localStyles.dateTileDay,
                      isLatest && localStyles.dateTileDayLatest,
                    ]}
                  >
                    {d.getDate()}
                  </Text>
                  <Text
                    style={[
                      localStyles.dateTileMonth,
                      isLatest && localStyles.dateTileMonthLatest,
                    ]}
                  >
                    {d.toLocaleDateString('en-US', { month: 'short' })}
                  </Text>
                </View>

                <View style={localStyles.logEntryInfo}>
                  <View style={localStyles.logWeightRow}>
                    <Text style={localStyles.logWeight}>{entry.weight}</Text>
                    <Text style={localStyles.logWeightUnit}>kg</Text>
                    {isLatest && (
                      <View style={localStyles.latestBadge}>
                        <Text style={localStyles.latestBadgeText}>Latest</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[localStyles.logBmi, entryBmiStyles.text]}>
                    BMI {b} · {info.label}
                  </Text>
                </View>

                {diff !== null && (
                  <View style={[localStyles.changeBadge, changeBadgeBg]}>
                    <Text
                      style={[
                        localStyles.changeBadgeText,
                        changeBadgeTextStyle,
                      ]}
                    >
                      {diff === 0 ? '—' : diff > 0 ? `+${diff}` : `${diff}`} kg
                    </Text>
                  </View>
                )}
              </View>
            );
          })}

          {/* Show all toggle */}
          {allEntries.length > 7 && (
            <TouchableOpacity
              onPress={() => setShowAllLog(!showAllLog)}
              style={localStyles.showAllButton}
            >
              <Text style={localStyles.showAllButtonText}>
                {showAllLog
                  ? 'Show less ↑'
                  : `Show all ${allEntries.length} entries ↓`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
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
  beforeAfterContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  beforeAfterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  startingCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  startingWeight: {
    fontSize: 26,
    fontWeight: '900',
    color: '#9CA3AF',
    letterSpacing: -1,
  },
  weightUnit: {
    fontSize: 12,
    fontWeight: '600',
  },
  bmiTag: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  bmiTagText: {
    fontSize: 10,
    fontWeight: '700',
  },
  arrow: {
    fontSize: 18,
  },
  currentCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 14,
    shadowColor: '#1A1A1A',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  currentCardLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  currentWeight: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
  },
  currentWeightUnit: {
    fontSize: 12,
    fontWeight: '600',
  },
  currentBmiTag: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  currentBmiTagText: {
    fontSize: 10,
    fontWeight: '700',
  },
  // Chart card
  chartCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartWrapper: {
    position: 'relative',
    width: '100%',
    paddingTop: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#272727',
  },
  chartSubtitle: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  filterTab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  filterTabActive: {
    backgroundColor: '#1A1A1A',
  },
  filterTabText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  filterTabTextActive: {
    color: '#fff',
  },
  yAxisText: {
    color: '#9CA3AF',
    fontSize: 9,
    fontWeight: '600',
  },
  xAxisText: {
    color: '#9CA3AF',
    fontSize: 8,
    fontWeight: '600',
  },

  logCard: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  logTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1A1A1A',
  },
  logCount: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  logEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  logEntryBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F7F8FA',
  },
  dateTile: {
    width: 44,
    height: 44,
    borderRadius: 12,
    flexShrink: 0,
    backgroundColor: '#F7F8FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTileLatest: {
    backgroundColor: '#1A1A1A',
  },
  dateTileDay: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1A1A1A',
    lineHeight: 16,
  },
  dateTileDayLatest: {
    color: '#fff',
  },
  dateTileMonth: {
    fontSize: 9,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  dateTileMonthLatest: {
    color: 'rgba(255,255,255,0.5)',
  },
  logEntryInfo: {
    flex: 1,
  },
  logWeightRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  logWeight: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1A1A1A',
  },
  logWeightUnit: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  latestBadge: {
    backgroundColor: '#FFF8F0',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  latestBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FF8C42',
  },
  logBmi: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  changeBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 52,
    alignItems: 'center',
  },
  changeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  showAllButton: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    alignItems: 'center',
  },
  showAllButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
  },
  // Bar label styles
  barLabelActive: {
    fontSize: 9,
    fontWeight: '600',
    color: '#272727',
  },
  barLabelInactive: {
    fontSize: 9,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  // BMI category background styles
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
  // Change badge background styles
  changeBadgeLoss: {
    backgroundColor: '#F0FFF4',
  },
  changeBadgeGain: {
    backgroundColor: '#FFF0F0',
  },
  changeBadgeNeutral: {
    backgroundColor: '#F7F8FA',
  },
  // Change badge text styles
  changeBadgeTextLoss: {
    color: '#22C55E',
  },
  changeBadgeTextGain: {
    color: '#EF4444',
  },
  changeBadgeTextNeutral: {
    color: '#9CA3AF',
  },
});

export default WeightProgressScreen;
