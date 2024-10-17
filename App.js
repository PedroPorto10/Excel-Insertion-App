import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NotificationList from './NotificationList';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Excel Insertion App</Text>
      <NotificationList />  {}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  titulo: {
    marginTop: 50,
    color: 'white',
    fontSize: 24,
  },
});
