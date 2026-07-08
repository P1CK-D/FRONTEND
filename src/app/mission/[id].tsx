import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PageHeader, ProgressBar } from '@/components/ui';

const ICON_RUN = 'https://www.figma.com/api/mcp/asset/b209c59f-c297-411b-b75b-f50c6bf75bd2';
const SHARE_ICON = 'https://www.figma.com/api/mcp/asset/677a10da-9e7a-49d4-b013-3ae22a0dfa86';

const PARTICIPANT_AVATARS = [
  'https://www.figma.com/api/mcp/asset/74a284ba-a053-4fbb-bbca-976a78ab9c77',
  'https://www.figma.com/api/mcp/asset/50594f66-def2-492b-8d43-9bade980bae1',
  'https://www.figma.com/api/mcp/asset/4a811686-2081-4c3a-97df-d504bf08572e',
  'https://www.figma.com/api/mcp/asset/c83ecfb7-fbe5-4317-b47c-39a6a75ecdb9',
];

export default function MissionDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PageHeader title="미션" onBackPress={() => router.back()} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.detailCard}>
            <View style={styles.missionHeader}>
              <View style={styles.titleRow}>
                <Image source={{ uri: ICON_RUN }} style={styles.missionIcon} resizeMode="contain" />
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
                  />
                ))}
              </View>
              <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
                <Image source={{ uri: SHARE_ICON }} style={styles.shareIcon} resizeMode="contain" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.startButton} activeOpacity={0.8}>
              <Text style={styles.startButtonText}>미션 진행하기</Text>
            </TouchableOpacity>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
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
  missionIcon: {
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
