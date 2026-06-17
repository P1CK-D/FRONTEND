import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/onboarding/name');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>시작하기</Text>
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
});
