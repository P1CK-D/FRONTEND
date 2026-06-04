import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button
} from 'react-native';
import {
  IconBolt,
  IconChartBar,
  IconHome,
  IconUser,
  IconSettings,
  IconSearch,
} from '@tabler/icons-react-native';

export default function MainScreen() {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoIconWrap}>
            <IconBolt size={18} color="#fff" strokeWidth={2.2} />
          </View>
          <Text style={styles.logoText}>pickdo</Text>
        </View>
        <View style={styles.headerIcons}>
          <Button title="로그인" onPress={()=>{}}></Button>
          <View style={styles.iconBtn}>
            <IconSearch size={22} color={COLORS.txt2} strokeWidth={1.8} />
          </View>
          <View style={styles.iconBtn}>
            <IconUser size={22} color={COLORS.txt2} strokeWidth={1.8} />
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.heroSection}>
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroName}>효상님,</Text>
            <Text style={styles.heroBody}>
              오늘 인스타를{'\n'}
              <Text style={styles.heroAccent}>14시간 </Text>
              <Text style={styles.heroBody}>사용했어요!</Text>
            </Text>
          </View>
          <Text style={styles.mascot}>🐥</Text>
        </View>

        <View style={styles.missionRow}>
          {MISSIONS.map((m) => (
            <View key={m.label} style={styles.missionCard}>
              <Text style={styles.missionEmoji}>{m.emoji}</Text>
              <Text style={styles.missionLabel}>{m.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.bottomCard}>
          <Text style={styles.bottomCardLabel}>아무거나</Text>
        </View>
      </ScrollView>

      <View style={styles.navBar}>
        {NAV_ITEMS.map((item, i) => (
          <View key={item.label} style={styles.navItem}>
            <item.icon
              size={22}
              color={i === 2 ? COLORS.p : COLORS.txt3}
              strokeWidth={1.8}
            />
            <Text style={[styles.navLabel, i === 2 && styles.navLabelActive]}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>

    </SafeAreaView>
  );
}

const MISSIONS = [
  { emoji: '🏃', label: '미션' },
  { emoji: '📚', label: '미션' },
  { emoji: '🧘', label: '미션' },
];

const NAV_ITEMS = [
  { icon: IconBolt,     label: '미션'    },
  { icon: IconChartBar, label: '리포트'  },
  { icon: IconHome,     label: '홈'      },
  { icon: IconUser,     label: '내페이지' },
  { icon: IconSettings, label: '설정'    },
];


const COLORS = {
  bg:     '#0e0f13',
  bg2:    '#16181f',
  card:   '#1a1c25',
  p:      '#00D1BC',
  txt:    '#f0f2f8',
  txt2:   '#9499b0',
  txt3:   '#5a5f78',
  border: 'rgba(255,255,255,0.07)',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 8,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIconWrap: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.p,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.p,
    letterSpacing: -0.3,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 4,
  },
  iconBtn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 16 },

  heroSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 20,
  },
  heroTextWrap: { flex: 1 },
  heroName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.txt,
    marginBottom: 4,
  },
  heroBody: {
    fontSize: 22,
    fontWeight: '400',
    color: COLORS.txt2,
    lineHeight: 32,
  },
  heroAccent: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.p,
  },
  mascot: {
    fontSize: 60,
  },

  missionRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 22,
    marginBottom: 20,
  },
  missionCard: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  missionEmoji: { fontSize: 28 },
  missionLabel: { fontSize: 13, color: COLORS.txt2 },

  bottomCard: {
    flex: 1,
    marginHorizontal: 22,
    minHeight: 260,
    backgroundColor: COLORS.p,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomCardLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },

  navBar: {
    height: 72,
    backgroundColor: '#13151c',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
  },
  btn:{
    backgroundColor: '#13151c',
  },
  navLabel:       { fontSize: 10, color: COLORS.txt3, letterSpacing: 0.3 },
  navLabelActive: { color: COLORS.p },
});