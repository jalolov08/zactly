import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MainStackParams = {
  FillProfile: undefined;
  TabBar: undefined;
  AuthStack: undefined;
  EditProfile: undefined;
  Interests: undefined;
  Notifications: undefined;
  PersonalizedAds: undefined;
  CategoryFacts: {
    categoryId: string;
    categoryName: string;
  };
};

export type MainStackNavigationProps<NavigationName extends keyof MainStackParams> =
  NativeStackScreenProps<MainStackParams, NavigationName>;

export type EditProfileScreenProps = NativeStackScreenProps<MainStackParams, 'EditProfile'>;

export type InterestsScreenProps = NativeStackScreenProps<MainStackParams, 'Interests'>;

export type NotificationsScreenProps = NativeStackScreenProps<MainStackParams, 'Notifications'>;

export type PersonalizedAdsScreenProps = NativeStackScreenProps<MainStackParams, 'PersonalizedAds'>;

export type CategoryFactsScreenProps = NativeStackScreenProps<MainStackParams, 'CategoryFacts'>;
