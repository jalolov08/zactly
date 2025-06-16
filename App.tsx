import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from '@/navigation/index';

function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

export default App;
