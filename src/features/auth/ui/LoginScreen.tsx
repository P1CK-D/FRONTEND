import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { initiateGoogleLogin } from '../api/login';
import { authStorage } from '@/shared/lib';

export function LoginScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const result = await initiateGoogleLogin();

      if (result.success && result.token) {
        await authStorage.saveToken(result.token);
        console.log('Token saved, navigating to onboarding');
        router.push('/onboarding/name');
      } else {
        const errorMessage = getErrorMessage(result.error);
        Alert.alert('로그인 실패', errorMessage);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('로그인 실패', '예상치 못한 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (error?: string): string => {
    switch (error) {
      case 'user_cancelled':
        return '로그인이 취소되었습니다.';
      case 'oauth_failed':
        return 'Google 인증에 실패했습니다. 다시 시도해주세요.';
      default:
        return '로그인 중 오류가 발생했습니다.';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      <TouchableOpacity
        style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.loginButtonText}>
          {isLoading ? '로그인 중...' : '시작하기'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 26,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 40,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#33dac1',
    paddingVertical: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  loginButtonDisabled: {
    backgroundColor: '#b3e8df',
    opacity: 0.7,
  },
});
