import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MainStackParams = {
  FillProfile: undefined;
  TabBar: undefined;
  AuthStack: undefined;
};

export type MainStackNavigationProps<NavigationName extends keyof MainStackParams> =
  NativeStackScreenProps<MainStackParams, NavigationName>;
