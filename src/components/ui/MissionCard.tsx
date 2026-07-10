import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { ProgressBar } from './ProgressBar';

export interface MissionCardProps {
  id: string;
  title: string;
  subtitle: string;
  iconUrl?: string;
  iconComponent?: React.ReactNode;
  progress?: number;
  showProgress?: boolean;
  onPress?: () => void;
}

export function MissionCard({
  title,
  subtitle,
  iconUrl,
  iconComponent,
  progress = 0,
  showProgress = true,
  onPress,
}: MissionCardProps) {
  const Content = (
    <>
      <View style={styles.iconBadge}>
        {iconComponent ? (
          iconComponent
        ) : iconUrl ? (
          <Image source={{ uri: iconUrl }} style={styles.icon} contentFit="contain" />
        ) : null}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {showProgress && <ProgressBar progress={progress} />}
      </View>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {Content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.container}>{Content}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#e0f8f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 22,
    height: 22,
  },
  textContainer: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#94929c',
  },
});
