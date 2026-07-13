import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';

const ICONS = {
  home: {
    active: require('@/assets/splash/nav_hover_home.png'),
    inactive: require('@/assets/splash/nav_home.png'),
  },
  mission: {
    active: require('@/assets/splash/nav_hover_mission.png'),
    inactive: require('@/assets/splash/nav_mission.png'),
  },
  report: {
    active: require('@/assets/splash/nav_hover_report.png'),
    inactive: require('@/assets/splash/nav_report.png'),
  },
  profile: {
    active: require('@/assets/splash/nav_profile.png'),
    inactive: require('@/assets/splash/nav_profile.png'),
  },
};

export type NavigationTab = 'home' | 'mission' | 'report' | 'profile';

export interface NavigationBarProps {}

export function NavigationBar({}: NavigationBarProps = {}) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { id: 'home' as NavigationTab, label: '홈', icon: ICONS.home, route: '/(tabs)' },
    { id: 'mission' as NavigationTab, label: '미션', icon: ICONS.mission, route: '/(tabs)/mission' },
    { id: 'report' as NavigationTab, label: '리포트', icon: ICONS.report, route: '/(tabs)/report' },
    { id: 'profile' as NavigationTab, label: '프로필', icon: ICONS.profile, route: '/(tabs)/profile' },
  ];

  const getActiveTab = (): NavigationTab => {
    if (pathname === '/(tabs)' || pathname === '/') return 'home';
    if (pathname.includes('/mission')) return 'mission';
    if (pathname.includes('/report')) return 'report';
    if (pathname.includes('/profile')) return 'profile';
    return 'home';
  };

  const activeTab = getActiveTab();

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => router.push(tab.route as any)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Image
                source={isActive ? tab.icon.active : tab.icon.inactive}
                style={styles.icon}
                contentFit="contain"
              />
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 4,
    gap: 19,
    height:'10%',
  },
  tab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    marginBottom:20,
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#94929c',
    textAlign: 'center',
  },
  labelActive: {
    color: '#000',
  },
});
