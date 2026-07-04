import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { authStorage } from '@/shared/lib';

export function NameInputScreen() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleNext = async () => {
    if (name.trim()) {
      await authStorage.saveUserName(name.trim());
      router.push('/onboarding/dopamine-selection');
    }
  };

  const handleClear = () => {
    setName('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>

      <Text style={styles.title}>
        어서오세요,{'\n'}어떤 이름으로 불러드릴까요?
      </Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="이름을 입력하세요"
            placeholderTextColor="#000"
            autoFocus
          />
          {name.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>×</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.underline} />
        <Text style={styles.helperText}>
          지금 정한 이름은 나중에 수정할 수 있어요
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.nextButton, !name.trim() && styles.nextButtonDisabled]}
        onPress={handleNext}
        disabled={!name.trim()}
      >
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 26,
    paddingTop: 50,
  },
  progressBarContainer: {
    top:20,
    height: 6,
    backgroundColor: '#f2f1f3',
    borderRadius: 9999,
    marginBottom: 40,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    width: '14%',
    backgroundColor: '#33dac1',
    borderRadius: 9999,
  },
  title: {
    top:'20%',
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 163,
  },
  inputContainer: {
    marginTop: '10%',
    marginBottom: 'auto',
    paddingHorizontal: 34,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  input: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
    flex: 1,
    paddingVertical: 5,
    borderWidth: 0,
  },
  clearButton: {
    width: 24,
    height: 24,
    backgroundColor: '#c1c0c6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 20,
  },
  underline: {
    height: 2,
    backgroundColor: '#00beab',
    borderRadius: 4,
    marginBottom: 12,
  },
  helperText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#94929c',
    lineHeight: 18,
  },
  nextButton: {
    width: '100%',
    backgroundColor: '#33dac1',
    paddingVertical: 20,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 75,
  },
  nextButtonDisabled: {
    backgroundColor: '#d5d5d9',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});
