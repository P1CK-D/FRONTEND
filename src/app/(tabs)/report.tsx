import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PageHeader, SegmentedControl } from '@/components/ui';

type ReportPeriod = 'daily' | 'weekly' | 'monthly';

const REPORT_PERIODS: readonly ReportPeriod[] = ['daily', 'weekly', 'monthly'] as const;
const PERIOD_LABELS: Record<ReportPeriod, string> = {
  daily: '일별',
  weekly: '주별',
  monthly: '월별',
};

// 임시 데이터
const GAUGE_TITLE: Record<ReportPeriod, string> = {
  daily: '오늘의 도파민 변환 게이지',
  weekly: '이번 주 도파민 변환 게이지',
  monthly: '이번 달 도파민 변환 게이지',
};

const CHART_TITLE: Record<ReportPeriod, string> = {
  daily: '시간대별 도파민 게이지',
  weekly: '요일별 도파민 게이지',
  monthly: '주별 도파민 게이지',
};

type ReportData = {
  gaugePercentage: number;
  missionCount: string;
  totalUsageTime: string;
  chartData: { label: string; height: number }[];
  completedMissions: { id: string; title: string; time: string }[];
  appUsage: { id: string; name: string; time: string; progress: number }[];
};

const REPORT_DATA: Record<ReportPeriod, ReportData> = {
  daily: {
    gaugePercentage: 67,
    missionCount: '3건',
    totalUsageTime: '2시간 10분',
    chartData: [
      { label: '06', height: 10 },
      { label: '09', height: 23 },
      { label: '12', height: 30 },
      { label: '15', height: 25 },
      { label: '18', height: 40 },
      { label: '21', height: 34 },
    ],
    completedMissions: [
      { id: '1', title: '영단어 외우기', time: '오전 8:20' },
      { id: '2', title: '산책하기', time: '오후 1:10' },
      { id: '3', title: '집중 모드 30분', time: '오후 4:40' },
    ],
    appUsage: [
      { id: '1', name: '인스타그램', time: '48분', progress: 0.7 },
      { id: '2', name: '유튜브', time: '35분', progress: 0.52 },
      { id: '3', name: '틱톡', time: '22분', progress: 0.32 },
      { id: '4', name: '카카오톡', time: '15분', progress: 0.22 },
    ],
  },
  weekly: {
    gaugePercentage: 54,
    missionCount: '12건',
    totalUsageTime: '11시간 40분',
    chartData: [
      { label: '월', height: 20 },
      { label: '화', height: 32 },
      { label: '수', height: 18 },
      { label: '목', height: 40 },
      { label: '금', height: 36 },
      { label: '토', height: 44 },
      { label: '일', height: 26 },
    ],
    completedMissions: [
      { id: '1', title: '영단어 외우기', time: '월요일' },
      { id: '2', title: '산책하기', time: '수요일' },
      { id: '3', title: '집중 모드 30분', time: '금요일' },
      { id: '4', title: '독서 20분', time: '토요일' },
    ],
    appUsage: [
      { id: '1', name: '인스타그램', time: '4시간 20분', progress: 0.65 },
      { id: '2', name: '유튜브', time: '3시간 5분', progress: 0.48 },
      { id: '3', name: '틱톡', time: '2시간 40분', progress: 0.4 },
      { id: '4', name: '카카오톡', time: '1시간 35분', progress: 0.25 },
    ],
  },
  monthly: {
    gaugePercentage: 61,
    missionCount: '48건',
    totalUsageTime: '46시간 20분',
    chartData: [
      { label: '1주', height: 28 },
      { label: '2주', height: 38 },
      { label: '3주', height: 22 },
      { label: '4주', height: 44 },
    ],
    completedMissions: [
      { id: '1', title: '영단어 외우기', time: '1주차' },
      { id: '2', title: '산책하기', time: '2주차' },
      { id: '3', title: '집중 모드 30분', time: '3주차' },
      { id: '4', title: '독서 20분', time: '4주차' },
    ],
    appUsage: [
      { id: '1', name: '인스타그램', time: '17시간 10분', progress: 0.72 },
      { id: '2', name: '유튜브', time: '13시간 20분', progress: 0.55 },
      { id: '3', name: '틱톡', time: '9시간 30분', progress: 0.38 },
      { id: '4', name: '카카오톡', time: '6시간 20분', progress: 0.24 },
    ],
  },
};

export default function ReportTab() {
  const [selectedPeriod, setSelectedPeriod] = useState<ReportPeriod>('daily');
  const data = REPORT_DATA[selectedPeriod];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <PageHeader title="리포트" showBackButton={false} />

          <SegmentedControl
            segments={REPORT_PERIODS}
            selectedSegment={selectedPeriod}
            onSegmentChange={setSelectedPeriod}
            labels={PERIOD_LABELS}
          />

          <View style={styles.section}>
            {/* 도파민 변환 게이지 카드 */}
            <View style={styles.card}>
              <View style={styles.gaugeHeader}>
                <Text style={styles.gaugeTitle}>{GAUGE_TITLE[selectedPeriod]}</Text>
                <Text style={styles.gaugePercentage}>{data.gaugePercentage}%</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${data.gaugePercentage}%` }]} />
              </View>
              <Text style={styles.helperText}>미션을 해결할수록 게이지가 올라가요!</Text>
            </View>

            {/* 통계 카드 행 */}
            <View style={styles.statsRow}>
              <View style={[styles.card, styles.statCard]}>
                <Text style={styles.statLabel}>해결한 미션</Text>
                <Text style={styles.statValue}>{data.missionCount}</Text>
              </View>
              <View style={[styles.card, styles.statCard]}>
                <Text style={styles.statLabel}>총 앱 사용시간</Text>
                <Text style={styles.statValue}>{data.totalUsageTime}</Text>
              </View>
            </View>

            {/* 기간별 도파민 게이지 차트 */}
            <View style={styles.card}>
              <Text style={styles.chartTitle}>{CHART_TITLE[selectedPeriod]}</Text>
              <View style={styles.chartContainer}>
                {data.chartData.map((item) => (
                  <View key={item.label} style={styles.barContainer}>
                    <View style={[styles.bar, { height: item.height }]} />
                    <Text style={styles.barLabel}>{item.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* 완료한 미션 카드 */}
          <View style={styles.card}>
            <Text style={styles.missionListTitle}>완료한 미션</Text>
            {data.completedMissions.map((mission) => (
              <View key={mission.id} style={styles.missionItem}>
                <View style={styles.missionLeft}>
                  <View style={styles.missionIcon} />
                  <View style={styles.missionText}>
                    <Text style={styles.missionTitle}>{mission.title}</Text>
                    <Text style={styles.missionTime}>{mission.time}</Text>
                  </View>
                </View>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            ))}
          </View>

          {/* 앱별 사용시간 카드 */}
          <View style={styles.card}>
            <Text style={styles.usageTitle}>앱별 사용시간</Text>
            {data.appUsage.map((app) => (
              <View key={app.id} style={styles.usageItem}>
                <View style={styles.usageHeader}>
                  <Text style={styles.appName}>{app.name}</Text>
                  <Text style={styles.appTime}>{app.time}</Text>
                </View>
                <View style={styles.usageTrack}>
                  <View style={[styles.usageFill, { width: `${app.progress * 100}%` }]} />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: '15%',
    paddingBottom: 100,
    gap: 19,
  },
  section: {
    gap: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 12,
    padding: 20,
    gap: 8,
  },
  gaugeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gaugeTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#00493e',
  },
  gaugePercentage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#00bca0',
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#5a5a5a',
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00d1b2',
    borderRadius: 20,
  },
  helperText: {
    fontSize: 10,
    fontWeight: '400',
    color: '#a5a4ac',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    padding: 14,
    gap: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '400',
    color: '#969696',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1c1c1c',
  },
  chartTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1c1c1c',
    marginBottom: 2,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 60,
  },
  barContainer: {
    alignItems: 'center',
    gap: 4,
  },
  bar: {
    width: 20,
    backgroundColor: '#00d1b2',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  barLabel: {
    fontSize: 9,
    fontWeight: '400',
    color: '#969696',
  },
  missionListTitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#1c1c1c',
  },
  missionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  missionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  missionIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#e1f5ee',
    borderRadius: 9,
  },
  missionText: {
    gap: 1,
  },
  missionTitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#1c1c1c',
  },
  missionTime: {
    fontSize: 10,
    fontWeight: '400',
    color: '#969696',
  },
  checkmark: {
    fontSize: 14,
    color: '#00d1b2',
  },
  usageTitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#1c1c1c',
  },
  usageItem: {
    gap: 5,
  },
  usageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: {
    fontSize: 12,
    fontWeight: '400',
    color: '#1c1c1c',
  },
  appTime: {
    fontSize: 11,
    fontWeight: '400',
    color: '#969696',
  },
  usageTrack: {
    height: 5,
    backgroundColor: '#eee',
    borderRadius: 20,
    overflow: 'hidden',
  },
  usageFill: {
    height: '100%',
    backgroundColor: '#00d1b2',
    borderRadius: 20,
  },
});
