import { authStorage } from '@/shared/lib';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MISSIONS = [
  {
    id: 1,
    title: 'AJ 미션',
    subtitle: 'AJ와 사진찍기',
    image: 'https://www.figma.com/api/mcp/asset/f12e7243-94e5-41b1-9f50-bc633ef8b41b',
  },
  {
    id: 2,
    title: '2km 러닝하기',
    subtitle: '미션 설명',
    image: 'https://www.figma.com/api/mcp/asset/20b95d53-29f0-43e4-b23f-16e65b6136b4',
  },
  {
    id: 3,
    title: '2km 러닝하기',
    subtitle: '러닝',
    image: 'https://www.figma.com/api/mcp/asset/b9e77069-c144-42dc-a944-70575775d20e',
  },
];

export function HomeScreen() {
  const [userName, setUserName] = useState<string>('사용자');

  useEffect(() => {
    const loadUserName = async () => {
      const name = await authStorage.getUserName();
      if (name) {
        setUserName(name);
      }
    };

    loadUserName();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.username}>{userName}님</Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Level 999</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconPlaceholder}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconPlaceholder}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>오늘의 성장 지수</Text>
          <View style={styles.growthCard}>
            <View style={styles.growthHeader}>
              <Text style={styles.growthLabel}>도파민 변환 게이지</Text>
              <Text style={styles.growthPercentage}>67%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar} />
            </View>
            <Text style={styles.growthHelper}>
              미션을 해결할수록 게이지가 올라가요!
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.missionHeader}>
            <Text style={styles.sectionTitle}>오늘의 미션</Text>
            <TouchableOpacity>
              <Text style={styles.arrowIcon}>→</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.missionsContainer}
          >
            {MISSIONS.map((mission) => (
              <View key={mission.id} style={styles.missionCard}>
                <Image source={{ uri: mission.image }} style={styles.missionImage} />
                <View style={styles.missionOverlay} />
                <View style={styles.missionContent}>
                  <Text style={styles.missionTitle}>{mission.title}</Text>
                  <Text style={styles.missionSubtitle} numberOfLines={1}>
                    {mission.subtitle}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.currentMissionCard}>
        <View style={styles.missionIconContainer}>
          <Image
            source={{ uri: 'https://www.figma.com/api/mcp/asset/b9e77069-c144-42dc-a944-70575775d20e' }}
            style={styles.missionIcon}
          />
        </View>
        <View style={styles.currentMissionText}>
          <Text style={styles.currentMissionLabel}>현재 진행 중인 미션</Text>
          <Text style={styles.currentMissionTitle}>러닝 2km</Text>
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
  scrollView: {
    flex: 1,
  },
  header: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 26,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  levelBadge: {
    backgroundColor: '#e6faf8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00beab',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    width: 24,
    height: 24,
  },
  iconPlaceholder: {
    fontSize: 20,
  },
  section: {
    paddingHorizontal: 26,
    marginBottom: 30,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    marginBottom: 12,
  },
  growthCard: {
    borderWidth: 1,
    borderColor: '#d5d5d9',
    borderRadius: 4,
    padding: 20,
    gap: 8,
  },
  growthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  growthLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  growthPercentage: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#f2f1f3',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    width: '34%',
    backgroundColor: '#33dac1',
    borderRadius: 9999,
  },
  growthHelper: {
    fontSize: 14,
    fontWeight: '400',
    color: '#797783',
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 24,
    color: '#000',
  },
  missionsContainer: {
    gap: 12,
    paddingRight: 26,
  },
  missionCard: {
    width: 150,
    height: 220,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d5d5d9',
    overflow: 'hidden',
    position: 'relative',
  },
  missionImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  missionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 74,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  missionContent: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    gap: 2,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  missionSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
  },
  currentMissionCard: {
    position: 'absolute',
    bottom: 20,
    left: 26,
    right: 26,
    backgroundColor: '#33dac1',
    borderRadius: 4,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#395d59',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  missionIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 9999,
    backgroundColor: '#8aeae0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  missionIcon: {
    width: 42,
    height: 74,
  },
  currentMissionText: {
    flex: 1,
    gap: 2,
  },
  currentMissionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007367',
  },
  currentMissionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});
