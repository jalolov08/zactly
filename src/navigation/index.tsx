import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBar from './TabBar/tabBar';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabBar" component={TabBar} />
    </Stack.Navigator>
  );
}

export default MainStack;
