import { Tabs } from 'expo-router';
import { NavigationBar } from '@/components/ui';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={() => <NavigationBar />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
        }}
      />
      <Tabs.Screen
        name="mission"
        options={{
          title: '미션',
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: '리포트',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '프로필',
        }}
      />
    </Tabs>
  );
}
