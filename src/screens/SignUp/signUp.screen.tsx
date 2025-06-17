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
import { Icons } from '@/components/Icon/icon.component';
import { SignUpScreenProps } from '@/types/auth.type';
import styles from './signUp.style';

function SignUp({ navigation }: SignUpScreenProps) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { onSignUp, onGoogleSign, onAppleSign } = useAuth();

  const handleSignUp = async () => {
    if (!name || !surname || !email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await onSignUp(name, surname, email, password);
      if (result.error) {
        setError(result.message);
      } else {
        navigation.navigate('Verify', { email });
      }
    } catch (err) {
      setError('Произошла ошибка. Пожалуйста, попробуйте снова.');
    } finally {
      setLoading(false);
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
              Регистрация
            </Typography>
            <Typography variant="regularText" style={styles.subtitle}>
              Создайте новый аккаунт
            </Typography>
          </View>

          <View style={styles.form}>
            <Input
              iconName="user"
              iconType={Icons.Feather}
              placeholder="Имя"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            <Input
              iconName="user"
              iconType={Icons.Feather}
              placeholder="Фамилия"
              value={surname}
              onChangeText={setSurname}
              autoCapitalize="words"
            />

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

            {error ? (
              <Typography variant="regularText" style={styles.error}>
                {error}
              </Typography>
            ) : null}

            <Button
              label="Зарегистрироваться"
              onPress={handleSignUp}
              loading={loading}
              style={styles.signUpButton}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Typography variant="regularText" style={styles.dividerText}>
                или зарегистрируйтесь через
              </Typography>
              <View style={styles.dividerLine} />
            </View>

            <SocialButtons
              onGooglePress={() => onGoogleSign('')}
              onApplePress={() => onAppleSign('')}
            />
          </View>

          <View style={styles.footer}>
            <Typography variant="regularText">Уже есть аккаунт? </Typography>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Typography variant="regularText" style={styles.loginText}>
                Войти
              </Typography>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default SignUp;
