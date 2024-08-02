import { StyleSheet } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from './inicializeTestDataBase';
import HomeScreen from './src/navigation/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import SplashScreen from './SplashScreen';
import AuthScreen from './src/features/auth/application/screens/AuthScreen';
import AdminScreen from './src/navigation/AdminScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function AppView({ navigation }) {
  const loadSesion = async () => {
    const userSesion = await AsyncStorage.getItem("userloaded");

    if (userSesion === null) {
      navigation.navigate('Auth');
      return;

    }
    if (userSesion != null) {
      const exampleTest = await JSON.parse(userSesion);

      switch (exampleTest.rol) {
        case "ADMIN":
          navigation.navigate('AdminScreen');
          return;
        case "USER":
          navigation.navigate('HomeScreen');
          return;
        default:
          break;
      }

    }

  }
  useEffect(() => {
    loadSesion();

  })
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminScreen"
        component={AdminScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>)
}

export default function App() {

  return (
    <SQLiteProvider
      databaseName='store.db'
      onInit={initializeDatabase}
    >
      <NavigationContainer>

        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="MainApp"
            component={AppView}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>

      </NavigationContainer>
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


