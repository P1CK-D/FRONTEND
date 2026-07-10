import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';

const ICONS = {
  home: {
    active: 'https://www.figma.com/api/mcp/asset/dfef02bd-7b3b-4141-abec-05eb8edbcde1',
    inactive: 'https://www.figma.com/api/mcp/asset/4be7a9d7-bab1-404b-a5c0-9efd80a573e8',
  },
  mission: {
    active: 'https://www.figma.com/api/mcp/asset/b01c6fca-11c4-48ef-b769-b30ce7e60889',
    inactive: 'https://www.figma.com/api/mcp/asset/0ce50d1b-1c42-429a-8b9c-3743fdf63c48',
  },
  report: {
    active: 'https://www.figma.com/api/mcp/asset/e6f3c6af-883c-4fc7-83c1-3165489bcc19',
    inactive: 'https://www.figma.com/api/mcp/asset/b335b314-de06-4ca1-ac0d-94e25a905f94',
  },
  profile: {
    active: 'https://www.figma.com/api/mcp/asset/4d61e854-e662-4643-b7db-905a17ed7d8a',
    inactive: 'https://www.figma.com/api/mcp/asset/b4ecce51-a5a0-453f-9610-7ab7f8022e05',
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
                source={{ uri: isActive ? tab.icon.active : tab.icon.inactive }}
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
