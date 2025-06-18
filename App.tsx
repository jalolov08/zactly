import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from '@/navigation/index';
import { AuthProvider } from '@/contexts/AuthContext/auth.context';
import { configureGoogleSignIn } from '@/services/google.service';

function App() {
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
