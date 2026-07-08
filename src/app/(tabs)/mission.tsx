import { useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MissionCard, PageHeader, SegmentedControl } from '@/components/ui';
import { Mission, MissionStatus, MISSION_STATUS_LABELS } from '@/types/mission';

const MISSION_SEGMENTS = ['recommended', 'in_progress', 'completed'] as const;

const ICON_RUN = 'https://www.figma.com/api/mcp/asset/738a55d6-e9a7-4989-96cb-1ce73a717091';
const ICON_CLOCK = 'https://www.figma.com/api/mcp/asset/9d8f4e38-167a-42d7-8297-f3a2fd232518';

function BookIcon() {
  return (
    <View style={styles.bookIconContainer}>
      <View style={[styles.bookIconBar, { left: 0 }]} />
      <View style={[styles.bookIconBar, { right: 0 }]} />
    </View>
  );
}

function PhoneOffIcon() {
  return (
    <View style={styles.phoneIconContainer}>
      <View style={styles.phoneRect} />
      <View style={styles.phoneSlash} />
    </View>
  );
}

const MOCK_MISSIONS: Mission[] = [
  {
    id: '1',
    title: '러닝 2km',
    description: '오늘 자정까지',
    status: 'in_progress',
    progress: 0.6,
  },
  {
    id: '2',
    title: '플래너 빈칸 채우기',
    description: 'D-1',
    status: 'in_progress',
    progress: 0.3,
  },
  {
    id: '3',
    title: '공부 타이머 1시간',
    description: '오늘 자정까지',
    status: 'in_progress',
    iconUrl: ICON_CLOCK,
    progress: 0.15,
  },
  {
    id: '4',
    title: 'SNS 사용 1시간 이내',
    description: '진행중',
    status: 'in_progress',
    progress: 0.8,
  },
];

const MOCK_RECOMMENDED_MISSIONS: Mission[] = [
  {
    id: 'r1',
    title: '독서 20분',
    description: '집중력 회복에 도움되는 활동',
    status: 'recommended',
  },
  {
    id: 'r2',
    title: '명상 10분',
    description: '도파민 리셋 추천 미션',
    status: 'recommended',
  },
  {
    id: 'r3',
    title: '스트레칭 5분',
    description: '앉아있는 시간이 길 때 추천',
    status: 'recommended',
  },
  {
    id: 'r4',
    title: '알림 끄고 1시간',
    description: 'SNS 절제 카테고리',
    status: 'recommended',
  },
];

const MOCK_COMPLETED_MISSIONS: Mission[] = [
  {
    id: 'c1',
    title: '러닝 2km',
    description: '7월 5일 완료',
    status: 'completed',
    completedAt: '2026-07-05',
  },
  {
    id: 'c2',
    title: '플래너 빈칸 채우기',
    description: '7월 4일 완료',
    status: 'completed',
    completedAt: '2026-07-04',
  },
  {
    id: 'c3',
    title: '명상 10분',
    description: '7월 3일 완료',
    status: 'completed',
    completedAt: '2026-07-03',
  },
];

export default function MissionTab() {
  const router = useRouter();
  const [selectedSegment, setSelectedSegment] = useState<MissionStatus>('in_progress');

  const getMissionsForSegment = (segment: MissionStatus): Mission[] => {
    switch (segment) {
      case 'recommended':
        return MOCK_RECOMMENDED_MISSIONS;
      case 'in_progress':
        return MOCK_MISSIONS;
      case 'completed':
        return MOCK_COMPLETED_MISSIONS;
      default:
        return [];
    }
  };

  const getMissionIcon = (mission: Mission) => {
    if (mission.iconUrl) {
      return <Image source={{ uri: mission.iconUrl }} style={styles.missionIcon} resizeMode="contain" />;
    }

    switch (mission.id) {
      case '1':
        return <Image source={{ uri: ICON_RUN }} style={styles.missionIcon} resizeMode="contain" />;
      case '2':
        return <BookIcon />;
      case '4':
        return <PhoneOffIcon />;
      default:
        return null;
    }
  };

  const missions = getMissionsForSegment(selectedSegment);
  const showProgress = selectedSegment === 'in_progress';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <PageHeader title="미션" showBackButton={false} />

        <View style={styles.controlsSection}>
          <SegmentedControl
            segments={MISSION_SEGMENTS}
            selectedSegment={selectedSegment}
            onSegmentChange={setSelectedSegment}
            labels={MISSION_STATUS_LABELS}
          />

          <FlatList
            data={missions}
            renderItem={({ item }) => (
              <MissionCard
                id={item.id}
                title={item.title}
                subtitle={item.description}
                iconComponent={getMissionIcon(item)}
                progress={item.progress}
                showProgress={showProgress}
                onPress={() => {
                  router.push(`/mission/${item.id}`);
                }}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
    gap: 28,
  },
  controlsSection: {
    flex: 1,
    gap: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 10,
  },
  missionIcon: {
    width: 22,
    height: 22,
  },
  bookIconContainer: {
    width: 20,
    height: 16,
    position: 'relative',
  },
  bookIconBar: {
    position: 'absolute',
    width: 9,
    height: 16,
    backgroundColor: '#00beab',
    borderRadius: 2,
  },
  phoneIconContainer: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  phoneRect: {
    position: 'absolute',
    left: 4,
    top: 0,
    width: 12,
    height: 20,
    borderWidth: 2,
    borderColor: '#00beab',
    borderRadius: 3,
  },
  phoneSlash: {
    position: 'absolute',
    left: -3.29,
    top: 9,
    width: 24,
    height: 2,
    backgroundColor: '#00beab',
    transform: [{ rotate: '40deg' }],
  },
});
