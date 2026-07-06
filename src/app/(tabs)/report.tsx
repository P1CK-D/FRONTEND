import { StyleSheet, Text, View } from 'react-native';

export default function ReportTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>리포트</Text>
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
