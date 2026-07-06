import { Image, StyleSheet, Text, View } from 'react-native';

export interface CurrentMissionBarProps {
  iconUrl: string;
  label?: string;
  title: string;
}

export function CurrentMissionBar({ iconUrl, label = '현재 진행 중인 미션', title }: CurrentMissionBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={{ uri: iconUrl }} style={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 26,
    right: 26,
    backgroundColor: '#33dac1',
    borderRadius: 4,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#395d59',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 9999,
    backgroundColor: '#8aeae0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  icon: {
    width: 42,
    height: 74,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007367',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});
