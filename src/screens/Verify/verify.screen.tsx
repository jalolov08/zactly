import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Typography } from '@/components/Typography/typography.component';
import { Button } from '@/components/Button/button.component';
import { BackButton } from '@/components/BackButton/back-button.component';
import { Input } from '@/components/Input/input.component';
import { useAuth } from '@/contexts/AuthContext/auth.context';
import styles from './verify.style';
import { VerifyScreenProps } from '@/types/auth.type';

function Verify({ navigation, route }: VerifyScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const { onVerify, onResendOtp, onResetPassword } = useAuth();
  const { email, isPasswordReset } = route.params;

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    if (otp.some(digit => !digit)) {
      setError('Пожалуйста, введите код подтверждения');
      return;
    }

    if (isPasswordReset) {
      if (!password || !confirmPassword) {
        setError('Пожалуйста, заполните все поля');
        return;
      }

      if (password !== confirmPassword) {
        setError('Пароли не совпадают');
        return;
      }

      if (password.length < 6) {
        setError('Пароль должен содержать минимум 6 символов');
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      if (isPasswordReset) {
        const result = await onResetPassword(email, otp.join(''), password);
        if (result.error) {
          setError(result.message);
          setOtp(['', '', '', '']);
          inputRefs.current[0]?.focus();
        } else {
          navigation.navigate('Login');
        }
      } else {
        const result = await onVerify(email, otp.join(''));
        if (result.error) {
          setError(result.message);
          setOtp(['', '', '', '']);
          inputRefs.current[0]?.focus();
        }
      }
    } catch (err) {
      setError('Произошла ошибка. Пожалуйста, попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');

    try {
      const result = await onResendOtp(email);
      if (result.error) {
        setError(result.message);
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
              {isPasswordReset ? 'Сброс пароля' : 'Подтверждение'}
            </Typography>
            <Typography variant="regularText" style={styles.subtitle}>
              {isPasswordReset
                ? 'Введите код подтверждения и новый пароль'
                : `Введите код подтверждения, отправленный на ${email}`}
            </Typography>
          </View>

          <View style={styles.form}>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    inputRefs.current[index]?.isFocused() && styles.otpInputFocused,
                  ]}
                  value={digit}
                  onChangeText={text => handleOtpChange(text, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                />
              ))}
            </View>

            {isPasswordReset && (
              <>
                <Input
                  iconName="lock"
                  placeholder="Новый пароль"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <Input
                  iconName="lock"
                  placeholder="Подтвердите пароль"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </>
            )}

            {error ? (
              <Typography variant="regularText" style={styles.error}>
                {error}
              </Typography>
            ) : null}

            <Button
              label={isPasswordReset ? 'Сменить пароль' : 'Подтвердить'}
              onPress={handleVerify}
              loading={loading}
              style={styles.verifyButton}
            />

            <View style={styles.resendContainer}>
              <Typography variant="regularText" style={styles.resendText}>
                Не получили код?
              </Typography>
              <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
                <Typography variant="regularText" style={styles.resendButtonText}>
                  Отправить повторно
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Verify;
