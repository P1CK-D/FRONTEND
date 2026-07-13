import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { MissionCard, PageHeader, ProgressBar, SegmentedControl } from '@/components/ui';
import { Mission, MissionStatus, MISSION_STATUS_LABELS } from '@/types/mission';
import { useMissionStore } from '@/store/useMissionStore';
import { MISSION_DETAIL_DATA } from '@/data/mockMissions';

const MISSION_SEGMENTS = ['recommended', 'in_progress', 'completed'] as const;

const ICON_RUN = require('@/assets/mdi_run.png');
const ICON_CLOCK = require('@/assets/icon.png');
const SHARE_ICON = require('@/assets/Vector.png');
const ICON_BOOK = require('@/assets/book-icon.png');

const PARTICIPANT_AVATARS = [
  require('@/assets/images/missions/avatar-1.png'),
  require('@/assets/images/missions/avatar-2.png'),
  require('@/assets/images/missions/avatar-3.png'),
  require('@/assets/images/missions/avatar-4.png'),
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

export default function MissionTab() {
  const [selectedSegment, setSelectedSegment] = useState<MissionStatus>('in_progress');
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);

  const { getMissionsByStatus, getMissionById, startMission, completeMission } = useMissionStore();

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

  const handleStartMission = useCallback(() => {
    if (selectedMissionId) {
      startMission(selectedMissionId);
      handleCloseBottomSheet();
    }
  }, [selectedMissionId, startMission]);

  const handleVerifyMission = useCallback(() => {
    if (selectedMissionId) {
      completeMission(selectedMissionId);
    }
  }, [selectedMissionId, completeMission]);

  const getMissionIcon = (mission: Mission) => {
    if (mission.iconUrl) {
      return <Image source={mission.iconUrl} style={styles.missionIcon} contentFit="contain" />;
    }

    switch (mission.id) {
      case '1':
      case 'c1':
        return <Image source={ICON_RUN} style={styles.missionIcon} contentFit="contain" />;
      case '2':
      case 'c2':
      case 'r1':
        return <Image source={ICON_BOOK} style={styles.missionIcon} contentFit="contain" />;
      case '3':
        return <Image source={ICON_CLOCK} style={styles.missionIcon} contentFit="contain" />;
      case 'r2':
      case 'r3':
      case 'c3':
        return <Image source={ICON_RUN} style={styles.missionIcon} contentFit="contain" />;
      case '4':
      case 'r4':
        return <PhoneOffIcon />;
      default:
        return null;
    }
  };

  const missions = getMissionsByStatus(selectedSegment);
  const showProgress = selectedSegment === 'in_progress';
  const selectedMission = selectedMissionId ? getMissionById(selectedMissionId) : null;
  const missionDetail = selectedMissionId ? MISSION_DETAIL_DATA[selectedMissionId] : null;

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
                iconComponent={selectedSegment !== 'completed' ? getMissionIcon(item) : null}
                progress={item.progress}
                showProgress={showProgress}
                onPress={
                  selectedSegment !== 'completed'
                    ? () => handleOpenBottomSheet(item.id)
                    : undefined
                }
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
          {selectedMission && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.detailContent}>
                <View style={styles.detailCard}>
                  <View style={styles.titleRow}>
                    {getMissionIcon(selectedMission) ? (
                      <View style={styles.detailIconBadge}>{getMissionIcon(selectedMission)}</View>
                    ) : null}
                    <View style={styles.titleTextGroup}>
                      <Text style={styles.missionTitle}>{selectedMission.title}</Text>
                      {selectedMission.deadline && (
                        <Text style={styles.deadline}>
                          {new Date(selectedMission.deadline).toLocaleDateString('ko-KR', {
                            month: 'long',
                            day: 'numeric',
                          })}
                          까지
                        </Text>
                      )}
                    </View>
                  </View>

                  {selectedMission.progress !== undefined && (
                    <ProgressBar progress={selectedMission.progress} width={294} />
                  )}

                  <Text style={styles.description}>
                    {missionDetail?.fullDescription || selectedMission.description}
                  </Text>
                </View>

                {selectedMission.status === 'recommended' && (
                  <View style={styles.footerRow}>
                    <View style={styles.avatarGroup}>
                      {PARTICIPANT_AVATARS.map((avatar, index) => (
                        <Image
                          key={index}
                          source={avatar}
                          style={[styles.avatar, { marginLeft: index === 0 ? 0 : -13 }]}
                          contentFit="cover"
                        />
                      ))}
                    </View>
                    <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
                      <Image source={SHARE_ICON} style={styles.shareIcon} contentFit="contain" />
                    </TouchableOpacity>
                  </View>
                )}

                {selectedMission.status === 'recommended' && (
                  <TouchableOpacity
                    style={styles.startButton}
                    activeOpacity={0.8}
                    onPress={handleStartMission}
                  >
                    <Text style={styles.startButtonText}>미션 진행하기</Text>
                  </TouchableOpacity>
                )}

                {selectedMission.status === 'in_progress' && (
                  <TouchableOpacity
                    style={styles.startButton}
                    activeOpacity={0.8}
                    onPress={handleVerifyMission}
                  >
                    <Text style={styles.startButtonText}>인증하기</Text>
                  </TouchableOpacity>
                )}

                {selectedMission.status === 'completed' && (
                  <>
                    <Text style={styles.verifiedText}>미션 인증이 완료되었어요!</Text>
                    <TouchableOpacity
                      style={styles.startButton}
                      activeOpacity={0.8}
                      onPress={handleCloseBottomSheet}
                    >
                      <Text style={styles.startButtonText}>확인</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </ScrollView>
          )}
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
    gap: 20,
  },
  detailCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 16,
    padding: 20,
    gap: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#e0f8f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextGroup: {
    flex: 1,
    gap: 2,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#797783',
    lineHeight: 21,
  },
  deadline: {
    fontSize: 12,
    fontWeight: '400',
    color: '#94929c',
  },
  verifiedText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#00beab',
    textAlign: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
