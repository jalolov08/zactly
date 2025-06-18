import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBar from './TabBar/tabBar';
import EditProfile from '@/screens/EditProfile/editProfile.screen';
import { MainStackParams } from '@/types/main.type';
import Interests from '@/screens/Interests/interests.screen';
import Notifications from '@/screens/Notifications/notifications.screen';
import PersonalizedAds from '@/screens/PersonalizedAds/personalizedAds.screen';

const Stack = createNativeStackNavigator<MainStackParams>();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabBar" component={TabBar} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Interests" component={Interests} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="PersonalizedAds" component={PersonalizedAds} />
    </Stack.Navigator>
  );
}

export default MainStack;
