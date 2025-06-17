import Login from '@/screens/Login/login.screen';
import Profile from '@/screens/Profile/profile.screen';
import SignUp from '@/screens/SignUp/signUp.screen';
import Verify from '@/screens/Verify/verify.screen';
import { AuthStackParams } from '@/types/auth.type';
import { useAuthStore } from '@/zustand/useAuthStore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator<AuthStackParams>();

function AuthStack() {
  const { authenticated } = useAuthStore();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authenticated ? (
        <Stack.Screen name="Profile" component={Profile} />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Verify" component={Verify} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default AuthStack;
