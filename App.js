import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import PokemonDetailScreen from './src/PokemonDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Pokedex"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#314c53',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Pokedex"
          component={HomeScreen}
          options={{ title: 'Pokedex' }}
        />
        <Stack.Screen
          name="PokemonDetail"
          component={PokemonDetailScreen}
          options={{ title: 'Detalhes do Pokemon' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
