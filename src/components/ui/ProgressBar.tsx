import { StyleSheet, View } from 'react-native';

export interface ProgressBarProps {
  progress: number;
  width?: number;
}

export function ProgressBar({ progress, width = 140 }: ProgressBarProps) {
  const progressWidth = Math.min(Math.max(progress, 0), 1) * width;

  return (
    <View style={[styles.container, { width }]}>
      <View style={[styles.fill, { width: progressWidth }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 5,
    backgroundColor: '#f2f1f3',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#00beab',
    borderRadius: 9999,
  },
});
