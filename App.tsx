import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from '@/navigation/index';
import { AuthProvider } from '@/contexts/AuthContext/auth.context';

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
