import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="onboarding/name" />
      <Stack.Screen name="onboarding/dopamine-selection" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
