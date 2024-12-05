import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen'
import RecipeDetailScreen from '../screens/RecipeDetailScreen';


const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Welcome' component={WelcomeScreen} options={{title:'Bienvenue'}} />
          <Stack.Screen name='Home' component={HomeScreen} options={{title:'Accueil'}} />
          <Stack.Screen name='RecipeDetail' component={RecipeDetailScreen} options={{title:'Recipe_Detail_Screen'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}