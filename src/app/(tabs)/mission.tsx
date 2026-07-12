import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { MissionCard, PageHeader, ProgressBar, SegmentedControl } from '@/components/ui';
import { Mission, MissionStatus, MISSION_STATUS_LABELS } from '@/types/mission';

const MISSION_SEGMENTS = ['recommended', 'in_progress', 'completed'] as const;

const ICON_RUN = 'https://www.figma.com/api/mcp/asset/738a55d6-e9a7-4989-96cb-1ce73a717091';
const ICON_CLOCK = 'https://www.figma.com/api/mcp/asset/9d8f4e38-167a-42d7-8297-f3a2fd232518';
const SHARE_ICON = 'https://www.figma.com/api/mcp/asset/677a10da-9e7a-49d4-b013-3ae22a0dfa86';

const PARTICIPANT_AVATARS = [
  'https://www.figma.com/api/mcp/asset/74a284ba-a053-4fbb-bbca-976a78ab9c77',
  'https://www.figma.com/api/mcp/asset/50594f66-def2-492b-8d43-9bade980bae1',
  'https://www.figma.com/api/mcp/asset/4a811686-2081-4c3a-97df-d504bf08572e',
  'https://www.figma.com/api/mcp/asset/c83ecfb7-fbe5-4317-b47c-39a6a75ecdb9',
];

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
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['58%'], []);

  const handleOpenBottomSheet = useCallback((missionId: string) => {
    setSelectedMissionId(missionId);
    bottomSheetRef.current?.expand();
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

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
      return <Image source={{ uri: mission.iconUrl }} style={styles.missionIcon} contentFit="contain" />;
    }

    switch (mission.id) {
      case '1':
        return <Image source={{ uri: ICON_RUN }} style={styles.missionIcon} contentFit="contain" />;
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
    <GestureHandlerRootView style={styles.container}>
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
                  if (selectedSegment === 'recommended') {
                    handleOpenBottomSheet(item.id);
                  }
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

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetIndicator}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.detailContent}>
              <View style={styles.detailCard}>
                <View style={styles.missionHeader}>
                  <View style={styles.titleRow}>
                    <Image source={{ uri: ICON_RUN }} style={styles.detailMissionIcon} contentFit="contain" />
                    <Text style={styles.missionTitle}>러닝 2km</Text>
                  </View>
                  <ProgressBar progress={0.635} width={334} />
                </View>

                <View style={styles.descriptionContainer}>
                  <Text style={styles.description}>
                    건강을 챙기는 습관을 만들고 싶은 당신,{'\n'}
                    러닝 2km를 인증하면 습관 형성에 한발 더 가까워질 수 있어요.
                  </Text>
                </View>
              </View>

              <Text style={styles.deadline}>2026년 8월 20일까지</Text>

              <View style={styles.actionSection}>
                <View style={styles.participantsRow}>
                  <View style={styles.avatarGroup}>
                    {PARTICIPANT_AVATARS.map((avatar, index) => (
                      <Image
                        key={index}
                        source={{ uri: avatar }}
                        style={[styles.avatar, { marginLeft: index === 0 ? 0 : -13 }]}
                        contentFit="cover"
                      />
                    ))}
                  </View>
                  <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
                    <Image source={{ uri: SHARE_ICON }} style={styles.shareIcon} contentFit="contain" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.startButton} activeOpacity={0.8}>
                  <Text style={styles.startButtonText}>미션 진행하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    top:'7%',
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
  bottomSheetBackground: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetIndicator: {
    backgroundColor: '#ccc',
    width: 40,
    height: 4,
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  detailContent: {
    paddingBottom: 40,
    gap: 38,
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 34,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  missionHeader: {
    gap: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailMissionIcon: {
    width: 30,
    height: 30,
  },
  missionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  descriptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 18,
    fontWeight: '400',
    color: '#797783',
    lineHeight: 28.8,
  },
  deadline: {
    fontSize: 14,
    fontWeight: '400',
    color: '#94929c',
    lineHeight: 22.4,
  },
  actionSection: {
    gap: 16,
    alignItems: 'flex-end',
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarGroup: {
    flexDirection: 'row',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  shareButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    width: 24,
    height: 24,
  },
  startButton: {
    width: '100%',
    height: 57,
    backgroundColor: '#33dac1',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
