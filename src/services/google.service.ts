import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { config } from '../../config';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: config.google.client_id,
    offlineAccess: true,
  });
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo.data?.idToken;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error('User cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error('Sign in is in progress already');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Play services not available or outdated');
    } else {
      throw new Error('Something went wrong with Google Sign In');
    }
  }
};
