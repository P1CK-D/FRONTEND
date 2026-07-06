import { StyleSheet, Text, View } from 'react-native';

export default function MissionTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>미션</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
});
