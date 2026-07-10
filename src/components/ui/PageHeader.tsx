import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export interface PageHeaderProps {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
}

const BACK_ICON_URL = 'https://www.figma.com/api/mcp/asset/06d488a7-a65c-4aa3-aca0-e12197e63362';

export function PageHeader({ title, onBackPress, showBackButton = true }: PageHeaderProps) {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Image source={{ uri: BACK_ICON_URL }} style={styles.backIcon} contentFit="contain" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 25,
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
});
