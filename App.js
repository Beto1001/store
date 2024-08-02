import { StyleSheet } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from './inicializeTestDataBase';
import HomeScreen from './src/navigation/HomeScreen';

export default function App() {
  return (
    <SQLiteProvider
      databaseName='store.db'
      onInit={initializeDatabase}
    >
      <HomeScreen />

    </SQLiteProvider >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});


