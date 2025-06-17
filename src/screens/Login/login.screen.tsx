import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Typography } from '@/components/Typography/typography.component';
import { Button } from '@/components/Button/button.component';
import { Input } from '@/components/Input/input.component';
import { SocialButtons } from '@/components/SocialButtons/social-buttons.component';
import { BackButton } from '@/components/BackButton/back-button.component';
import { useAuth } from '@/contexts/AuthContext/auth.context';
import { LoginScreenProps } from '@/types/auth.type';
import styles from './login.style';

function Login({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { onLogin, onGoogleSign, onAppleSign, onRequestResetPassword } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await onLogin(email, password);
      if (result.error) {
        setError(result.message);
      }
    } catch (err) {
      setError('Произошла ошибка. Пожалуйста, попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Пожалуйста, введите email');
      return;
    }

    try {
      const result = await onRequestResetPassword(email);
      if (result.error) {
        setError(result.message);
      } else {
        navigation.navigate('Verify', { email, isPasswordReset: true });
      }
    } catch (err) {
      setError('Произошла ошибка. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <BackButton onPress={() => navigation.goBack()} style={styles.backButton} />

          <View style={styles.header}>
            <Typography variant="h1" style={styles.title}>
              Добро пожаловать
            </Typography>
            <Typography variant="regularText" style={styles.subtitle}>
              Войдите в свой аккаунт
            </Typography>
          </View>

          <View style={styles.form}>
            <Input
              iconName="mail"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              iconName="lock"
              placeholder="Пароль"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
              <Typography variant="regularText" style={styles.forgotPasswordText}>
                Забыли пароль?
              </Typography>
            </TouchableOpacity>

            {error ? (
              <Typography variant="regularText" style={styles.error}>
                {error}
              </Typography>
            ) : null}

            <Button
              label="Войти"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Typography variant="regularText" style={styles.dividerText}>
                или войдите через
              </Typography>
              <View style={styles.dividerLine} />
            </View>

            <SocialButtons
              onGooglePress={() => onGoogleSign('')}
              onApplePress={() => onAppleSign('')}
            />
          </View>

          <View style={styles.footer}>
            <Typography variant="regularText">Нет аккаунта? </Typography>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Typography variant="regularText" style={styles.signUpText}>
                Зарегистрироваться
              </Typography>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Login;
