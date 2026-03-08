import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-gifted-charts';

// Mock data for demonstration
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

// Constants & helpers
const calcBmi = w => parseFloat((w / (HEIGHT_CM / 100) ** 2).toFixed(1));

const bmiInfo = b => {
  if (b < 18.5) return { label: 'Underweight', color: '#3B82F6' };
  if (b < 25) return { label: 'Normal ✓', color: '#22C55E' };
  if (b < 30) return { label: 'Overweight', color: '#F59E0B' };
  return { label: 'Obese', color: '#EF4444' };
};

const barColor = weight => {
  const b = calcBmi(weight);
  if (b < 18.5) return '#93C5FD'; // blue — underweight
  if (b < 25) return '#86EFAC'; // green — normal
  if (b < 30) return '#FCD34D'; // yellow — overweight
  return '#FCA5A5'; // red — obese
};

const movingAvg = (entries, window = 7) =>
  entries.map((e, i) => {
    const slice = entries.slice(Math.max(0, i - window + 1), i + 1);
    const avg = slice.reduce((s, x) => s + x.weight, 0) / slice.length;
    return parseFloat(avg.toFixed(2));
  });

const filterEntries = (entries, f) => {
  const days = f === '1W' ? 7 : f === '1M' ? 30 : f === '3M' ? 90 : 9999;
  return entries.slice(-days);
};

// StatPill component
function StatPill({ icon, label, value, color, bg }) {
  return (
    <View
      style={[
        localStyles.statPill,
        { backgroundColor: bg, borderColor: color + '22' },
      ]}
    >
      <Text style={localStyles.statPillIcon}>{icon}</Text>
      <Text style={[localStyles.statPillValue, { color }]}>{value}</Text>
      <Text style={localStyles.statPillLabel}>{label}</Text>
    </View>
  );
}

const WeightProgressScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;

  const [allEntries] = useState(MOCK_WEIGHT_HISTORY);
  const [filter, setFilter] = useState('1M');
  const [showAllLog, setShowAllLog] = useState(false);

  const filtered = useMemo(
    () => filterEntries(allEntries, filter),
    [allEntries, filter],
  );
  const current = allEntries[allEntries.length - 1]?.weight ?? 0;
  const startWeight = allEntries[0]?.weight ?? 0;
  const lost = parseFloat((startWeight - current).toFixed(1));
  const toGo = parseFloat((current - GOAL_WEIGHT).toFixed(1));

  // Build bar data
  const barData = filtered.map(e => ({
    value: e.weight,
    frontColor: barColor(e.weight),
    label: '',
  }));

  // Build trend line data
  const trendValues = movingAvg(filtered);
  const lineData = trendValues.map(t => ({ value: t }));

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

  return (
    <View style={localStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={localStyles.scrollContent}
      >
        {/* Header */}
        <View style={[localStyles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={localStyles.backButton}
          >
            <Text style={localStyles.backButtonText}>‹</Text>
          </TouchableOpacity>

          <View style={localStyles.headerTextContainer}>
            <Text style={localStyles.headerTitle}>⚖️ Weight Progress</Text>
            <Text style={localStyles.headerSubtitle}>
              Tracking since {allEntries[0]?.date}
            </Text>
          </View>

          {/* BMI badge */}
          <View
            style={[
              localStyles.bmiBadge,
              { backgroundColor: bmiInfo(bmiCurrent).color + '18' },
            ]}
          >
            <Text
              style={[
                localStyles.bmiBadgeText,
                { color: bmiInfo(bmiCurrent).color },
              ]}
            >
              BMI {bmiCurrent}
            </Text>
          </View>
        </View>

        {/* Stat pills row */}
        <View style={localStyles.statPillsRow}>
          <StatPill
            icon="⚖️"
            label="Current"
            value={`${current} kg`}
            color="#1A1A1A"
            bg="#F7F8FA"
          />
          <StatPill
            icon="📉"
            label="Total Lost"
            value={`${lost} kg`}
            color="#22C55E"
            bg="#F0FFF4"
          />
          <StatPill
            icon="🎯"
            label="To Goal"
            value={`${toGo} kg`}
            color="#FF8C42"
            bg="#FFF8F0"
          />
        </View>

        {/* Before / After cards */}
        <View style={localStyles.beforeAfterContainer}>
          <View style={localStyles.beforeAfterRow}>
            {/* Starting */}
            <View style={localStyles.startingCard}>
              <Text style={localStyles.cardLabel}>STARTING</Text>
              <Text style={localStyles.startingWeight}>
                {startWeight}
                <Text style={localStyles.weightUnit}> kg</Text>
              </Text>
              <View
                style={[
                  localStyles.bmiTag,
                  { backgroundColor: bmiInfo(bmiStart).color + '18' },
                ]}
              >
                <Text
                  style={[
                    localStyles.bmiTagText,
                    { color: bmiInfo(bmiStart).color },
                  ]}
                >
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
                  style={[
                    localStyles.currentBmiTagText,
                    { color: bmiInfo(bmiCurrent).color },
                  ]}
                >
                  BMI {bmiCurrent} · {bmiInfo(bmiCurrent).label}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={localStyles.chartCard}>
          {/* Chart header */}
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

          {/* Chart wrapper */}
          <View style={localStyles.chartWrapper}>
            <BarChart
              data={barData}
              width={screenWidth - 72}
              height={240}
              barWidth={
                filtered.length > 30 ? 4 : filtered.length > 14 ? 7 : 12
              }
              spacing={filtered.length > 30 ? 2 : 4}
              roundedTop
              roundedBottom={false}
              noOfSections={4}
              maxValue={maxW}
              minValue={minW}
              yAxisTextStyle={localStyles.yAxisText}
              yAxisLabelWidth={28}
              xAxisLabelTextStyle={localStyles.xAxisText}
              hideAxesAndRules={false}
              yAxisThickness={0}
              xAxisThickness={0}
              rulesType="solid"
              rulesColor="rgba(0,0,0,0.05)"
              showLine
              lineData={lineData}
              lineConfig={{
                color: '#6366F1',
                thickness: 1.5,
                curved: true,
                hideDataPoints: true,
              }}
              referenceLine1Config={{
                value: GOAL_WEIGHT,
                color: '#FF8C42',
                thickness: 1.5,
                dashWidth: 5,
                dashGap: 4,
                labelText: `Goal ${GOAL_WEIGHT}kg`,
                labelTextStyle: localStyles.goalLabelText,
              }}
              focusBarOnPress
              focusedBarConfig={{
                color: '#1A1A1A',
              }}
              showValuesAsDataPointsText
              dataPointsColor="#1A1A1A"
              dataPointsRadius={4}
              textColor="#1A1A1A"
              textFontSize={11}
              textShiftY={-10}
              textShiftX={0}
            />
          </View>

          {/* Legend */}
          <View style={localStyles.legend}>
            {[
              { color: '#86EFAC', label: 'Normal', box: true },
              { color: '#FCD34D', label: 'Overweight', box: true },
              { color: '#FCA5A5', label: 'Obese', box: true },
              { color: '#93C5FD', label: 'Underweight', box: true },
              { color: '#6366F1', label: 'Trend', box: false },
              { color: '#FF8C42', label: 'Goal', box: false, dash: true },
            ].map((l, i) => (
              <View key={i} style={localStyles.legendItem}>
                {l.box ? (
                  <View
                    style={[
                      localStyles.legendBox,
                      { backgroundColor: l.color },
                    ]}
                  />
                ) : (
                  <View
                    style={[
                      localStyles.legendLine,
                      { backgroundColor: l.color },
                    ]}
                  />
                )}
                <Text style={localStyles.legendLabel}>{l.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Weight log list */}
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

                {/* Weight + BMI */}
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
                  <Text style={[localStyles.logBmi, { color: info.color }]}>
                    BMI {b} · {info.label}
                  </Text>
                </View>

                {/* Change badge */}
                {diff !== null && (
                  <View
                    style={[
                      localStyles.changeBadge,
                      {
                        backgroundColor:
                          diff < 0
                            ? '#F0FFF4'
                            : diff > 0
                            ? '#FFF0F0'
                            : '#F7F8FA',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        localStyles.changeBadgeText,
                        {
                          color:
                            diff < 0
                              ? '#22C55E'
                              : diff > 0
                              ? '#EF4444'
                              : '#9CA3AF',
                        },
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
    paddingBottom: 100,
  },
  // Header
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
  // Before/After cards
  beforeAfterContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
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
    borderRadius: 24,
    padding: 16,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: '#F0F4FF',
    borderWidth: 1,
    borderColor: '#E8E4F3',
    shadowColor: '#6366F1',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  chartWrapper: {
    overflow: 'visible',
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1A1A1A',
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
  goalLabelText: {
    color: '#FF8C42',
    fontSize: 9,
    fontWeight: '700',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
    paddingLeft: 28,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendBox: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  legendLine: {
    width: 16,
    height: 2,
    borderRadius: 1,
  },
  legendLabel: {
    fontSize: 9,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  // Weight log
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
});

export default WeightProgressScreen;
