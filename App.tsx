import React from 'react';
import { SafeAreaView } from 'react-native';
import Icon, { Icons } from '@/components/Icon/icon.component';
import { Typography } from '@/components/Typography/typography.component';
import { colors } from '@/constants/colors.constant';

function App() {
  return (
    <SafeAreaView>
      <Typography color={colors.teal} variant="h1">
        Hello World
      </Typography>
      <Icon type={Icons.Feather} name="home" />
    </SafeAreaView>
  );
}

export default App;
