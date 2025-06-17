import React, { createContext, useContext, useEffect } from 'react';
import { api } from '@/api/api';
import { useAuthStore } from '@/zustand/useAuthStore';
import { User } from '@/types/user.type';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
  onLogin: (email: string, password: string) => Promise<any>;
  onGoogleSign: (idToken: string) => Promise<any>;
  onAppleSign: (idToken: string) => Promise<any>;
  onSignUp: (name: string, surname: string, email: string, password: string) => Promise<any>;
  onVerify: (email: string, code: string) => Promise<any>;
  onRequestResetPassword: (email: string) => Promise<any>;
  onResetPassword: (email: string, code: string, newPassword: string) => Promise<any>;
  onResendOtp: (email: string) => Promise<any>;
  onLogout: () => Promise<any>;
}

const defaultAuthContext: AuthContextProps = {
  onLogin: async () => Promise.resolve(),
  onGoogleSign: async () => Promise.resolve(),
  onAppleSign: async () => Promise.resolve(),
  onSignUp: async () => Promise.resolve(),
  onVerify: async () => Promise.resolve(),
  onRequestResetPassword: async () => Promise.resolve(),
  onResetPassword: async () => Promise.resolve(),
  onResendOtp: async () => Promise.resolve(),
  onLogout: async () => Promise.resolve(),
};

const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    user: userStore,
    setUser,
    setToken,
    setRefreshToken,
    setAuthenticated,
    clear,
  } = useAuthStore();

  useEffect(() => {
    const getUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        try {
          const response = await api.get<{ user: User }>('/users/me');
          setUser(response.data.user);
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
    };
    getUser();
  }, [setUser]);

  const onLogin = async (email: string, password: string) => {
    try {
      const response = await api.post<{ user: User; accessToken: string; refreshToken: string }>(
        '/auth/login',
        {
          email,
          password,
        }
      );

      const { user, accessToken, refreshToken } = response.data;

      setUser(user);
      setToken(accessToken);
      setRefreshToken(refreshToken);
      setAuthenticated(true);
      await AsyncStorage.setItem('token', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      return response.data;
    } catch (error) {
      return { error: true, message: (error as any).response.data.error };
    }
  };

  const onGoogleSign = async (idToken: string) => {
    try {
      const response = await api.post<{ user: User; accessToken: string; refreshToken: string }>(
        '/auth/google',
        {
          idToken,
        }
      );

      const { user, accessToken, refreshToken } = response.data;

      setUser(user);
      setToken(accessToken);
      setRefreshToken(refreshToken);
      setAuthenticated(true);
      await AsyncStorage.setItem('token', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      return response.data;
    } catch (error) {
      return { error: true, message: (error as any).response.data.error };
    }
  };

  const onAppleSign = async (idToken: string) => {
    try {
      const response = await api.post<{ user: User; accessToken: string; refreshToken: string }>(
        '/auth/apple',
        {
          idToken,
        }
      );

      const { user, accessToken, refreshToken } = response.data;

      setUser(user);
      setToken(accessToken);
      setRefreshToken(refreshToken);
      setAuthenticated(true);
      await AsyncStorage.setItem('token', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      return response.data;
    } catch (error) {
      return { error: true, message: (error as any).response.data.error };
    }
  };

  const onSignUp = async (name: string, surname: string, email: string, password: string) => {
    try {
      const response = await api.post<{ message: string }>('/auth/signup', {
        name,
        surname,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      return { error: true, message: (error as any).response.data.error };
    }
  };

  const onVerify = async (email: string, code: string) => {
    try {
      const response = await api.post<{
        message: string;
        user: User;
        accessToken: string;
        refreshToken: string;
      }>('/auth/verify-otp', {
        email,
        code,
      });

      const { user, accessToken, refreshToken } = response.data;

      setUser(user);
      setToken(accessToken);
      setRefreshToken(refreshToken);
      setAuthenticated(true);
      await AsyncStorage.setItem('token', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      return response.data;
    } catch (error) {
      return { error: true, message: (error as any).response.data.error };
    }
  };

  const onRequestResetPassword = async (email: string) => {
    try {
      const response = await api.post<{ message: string }>('/auth/request-password-reset', {
        email,
      });

      return response.data;
    } catch (error) {
      return { error: true, message: (error as any).response.data.error };
    }
  };

  const onResetPassword = async (email: string, code: string, newPassword: string) => {
    try {
      const response = await api.post<{
        message: string;
        user: User;
        accessToken: string;
        refreshToken: string;
      }>('/auth/reset-password', {
        email,
        code,
        newPassword,
      });

      const { user, accessToken, refreshToken } = response.data;

      setUser(user);
      setToken(accessToken);
      setRefreshToken(refreshToken);
      setAuthenticated(true);
      await AsyncStorage.setItem('token', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      return response.data;
    } catch (error) {
      return { error: true, message: (error as any).response.data.error };
    }
  };

  const onResendOtp = async (email: string) => {
    try {
      const response = await api.post<{ message: string }>('/auth/resend-otp', {
        email,
      });

      return response.data;
    } catch (error) {
      return { error: true, message: (error as any).response.data.error };
    }
  };

  const onLogout = async () => {
    try {
      const response = await api.post<{ message: string }>('/auth/logout', {
        userId: userStore?._id,
      });

      clear();
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('refreshToken');

      return response.data;
    } catch (error) {
      return { error: true, message: (error as any).response.data.error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        onLogin,
        onGoogleSign,
        onAppleSign,
        onSignUp,
        onVerify,
        onRequestResetPassword,
        onResetPassword,
        onLogout,
        onResendOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
