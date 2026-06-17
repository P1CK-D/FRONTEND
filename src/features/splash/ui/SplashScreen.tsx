import { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/expo.icon/Assets/logo.svg')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>
          고통이 남기고 간 뒤를 보라!{'\n'}고난이 지나면 반드시 기쁨이 스며든다.
        </Text>
        <Text style={styles.quoteAuthor}>- 괴테</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33dac1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 80,
  },
  logo: {
    width: 250,
    height: 40,
    marginBottom: 100,
  },
  quoteContainer: {
    position: 'absolute',
    bottom: 158,
    alignItems: 'center',
    gap: 4,
  },
  quoteText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    lineHeight: 20,
  },
  quoteAuthor: {
    fontSize: 16,
    fontWeight: '400',
    color: '#007367',
    textAlign: 'center',
    lineHeight: 20,
  },
});
