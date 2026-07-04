import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { authStorage } from '@/shared/lib';

const DOPAMINE_OPTIONS = [
  { id: 1, label: '릴스/숏폼', icon: '🔥' },
  { id: 2, label: '게임', icon: '🎮' },
  { id: 3, label: 'SNS', icon: '📱' },
  { id: 4, label: '유튜브', icon: '📺' },
  { id: 5, label: '쇼핑', icon: '🛒' },
  { id: 6, label: '음주', icon: '🍺' },
  { id: 7, label: '흡연', icon: '🚬' },
  { id: 8, label: '도박', icon: '🎰' },
  { id: 9, label: '웹툰', icon: '📖' },
];

export function DopamineSelectionScreen() {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const loadUserName = async () => {
      const name = await authStorage.getUserName();
      if (name) {
        setUserName(name);
      }
    };

    loadUserName();
  }, []);

  const toggleItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (selectedItems.length >= 2) {
      router.push('/(tabs)');
    }
  };

  const isButtonEnabled = selectedItems.length >= 2;

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>

      <Text style={styles.title}>
        {userName}님이 뿌리치고 싶은{'\n'}도파민을 두 가지 이상 선택하세요!
      </Text>
      <Text style={styles.subtitle}>도파민 미션에 반영돼요</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.optionsContainer}
        showsVerticalScrollIndicator={false}
      >
        {DOPAMINE_OPTIONS.map((option, index) => {
          const isSelected = selectedItems.includes(option.id);
          return (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionItem,
                isSelected && styles.optionItemSelected,
              ]}
              onPress={() => toggleItem(option.id)}
            >
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <Text style={styles.optionLabel}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.nextButton,
          !isButtonEnabled && styles.nextButtonDisabled,
        ]}
        onPress={handleNext}
        disabled={!isButtonEnabled}
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
    width: '50%',
    backgroundColor: '#33dac1',
    borderRadius: 9999,
  },
  title: {
    top:'5%',
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 8,
  },
  subtitle: {
    top:'5%',
    fontSize: 16,
    fontWeight: '400',
    color: '#94929c',
    textAlign: 'center',
    marginBottom: 54,
  },
  scrollView: {
    flex: 1,
    marginBottom: 16,
  },
  optionsContainer: {
    marginTop:'10%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: 8,
  },
  optionItem: {
    width: '30%',
    height:'50%',
    aspectRatio: 1,
    backgroundColor: '#f2f1f3',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },
  optionItemSelected: {
    backgroundColor: '#33dac1',
  },
  optionIcon: {
    fontSize: 20,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
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
