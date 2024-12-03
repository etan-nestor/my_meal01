import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen'


const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={HomeScreen} options={{title:'Accueil'}} />
          <Stack.Screen name='Welcome' component={WelcomeScreen} options={{title:'Bienvenue'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}