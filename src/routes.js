import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import StarredWeb from './pages/StarredWeb';

const Stack = createStackNavigator();

export default function Routes() {
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1500,
      damping: 500,
      mass: 10,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  const config2 = {
    animation: 'timing',
    config: {
      duration: 1200,
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3949ab',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="User"
          component={User}
          options={({ route }) => ({
            title: route.params.user.name,
            transitionSpec: {
              open: config,
              close: config,
            },
          })}
        />
        <Stack.Screen
          name="Web"
          component={StarredWeb}
          options={({ route }) => ({
            title: route.params.star.name,
            transitionSpec: {
              open: config2,
              close: config,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
