import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Pages from '../pages';
import { ParamList } from '../types/Route';

const Stack = createNativeStackNavigator<ParamList>();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Pokedex' component={Pages.Pokedex} />
        <Stack.Screen name='PokemonDetails' component={Pages.PokemonDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
