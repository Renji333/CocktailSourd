import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import Store from './_redux/configureStore';

import HomeScreen from "./layouts/Home";
import ListScreen from "./layouts/List";
import DetailsScreen from "./layouts/Detail";
import Favs from "./layouts/Favs";

export default function App() {
  const Stack = createStackNavigator();
  return (
      <SafeAreaProvider>
          <Provider store={Store}>
              <PersistGate persistor={persistStore(Store)} loading={null}>
                  <NavigationContainer>
                      <Stack.Navigator
                          screenOptions={{
                              headerShown: false
                          }}
                          initialRouteName="Home">
                          <Stack.Screen name="Home" component={HomeScreen} />
                          <Stack.Screen name="List" component={ListScreen} />
                          <Stack.Screen name="Details" component={DetailsScreen} />
                          <Stack.Screen name="Favs" component={Favs} />
                      </Stack.Navigator>
                  </NavigationContainer>
              </PersistGate>
          </Provider>
      </SafeAreaProvider>
  );
}
