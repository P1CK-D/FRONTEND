import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { authStorage } from '@/shared/lib';

export default function AuthCallback() {
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const token = params.token as string;
      const error = params.error as string;

      if (token) {
        console.log('Received token in callback:', token);
        await authStorage.saveToken(token);
        console.log('Token saved in callback, navigating to onboarding');
        router.replace('/onboarding/name');
      } else {
        console.error('OAuth error:', error);
        router.replace('/login');
      }
    };

    handleCallback();
  }, [params, router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#33dac1" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
