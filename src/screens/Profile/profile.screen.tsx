import React from 'react';
import { Typography } from '@/components/Typography/typography.component';
import { SafeAreaView } from 'react-native';
import { useAuthStore } from '@/zustand/useAuthStore';

function Profile() {
  const { user } = useAuthStore();

  return (
    <SafeAreaView>
      <Typography>{user?.email}</Typography>
      <Typography>{user?.name}</Typography>
      <Typography>{user?.surname}</Typography>
    </SafeAreaView>
  );
}

export default Profile;
