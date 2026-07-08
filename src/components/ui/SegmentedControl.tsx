import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface SegmentedControlProps<T extends string> {
  segments: readonly T[];
  selectedSegment: T;
  onSegmentChange: (segment: T) => void;
  labels?: Record<T, string>;
}

export function SegmentedControl<T extends string>({
  segments,
  selectedSegment,
  onSegmentChange,
  labels,
}: SegmentedControlProps<T>) {
  return (
    <View style={styles.container}>
      {segments.map((segment) => {
        const isActive = selectedSegment === segment;
        const label = labels?.[segment] ?? segment;

        return (
          <TouchableOpacity
            key={segment}
            style={[styles.segment, isActive && styles.segmentActive]}
            onPress={() => onSegmentChange(segment)}
            activeOpacity={0.7}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f1f3',
    borderRadius: 10,
    padding: 3,
    flexDirection: 'row',
    gap: 2,
  },
  segment: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: '#00d1bc',
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94929c',
  },
  labelActive: {
    color: '#fff',
  },
});
