import React, { useState } from 'react';
import { SafeAreaView, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Typography } from '@/components/Typography/typography.component';
import { Button } from '@/components/Button/button.component';
import { Input } from '@/components/Input/input.component';
import { BackButton } from '@/components/BackButton/back-button.component';
import { useAuthStore } from '@/zustand/useAuthStore';
import { Icons } from '@/components/Icon/icon.component';
import styles from './editProfile.style';
import { EditProfileScreenProps } from '@/types/main.type';
import { api } from '@/api/api';

function EditProfile({ navigation }: EditProfileScreenProps) {
  const { user, setUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [surname, setSurname] = useState(user?.surname || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSaveProfile = async () => {
    if (!name || !surname) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.patch('/users', {
        name,
        surname,
      });

      if (response.status !== 200) {
        throw new Error(response.data.message || 'Произошла ошибка. Пожалуйста, попробуйте снова.');
      }

      setUser({
        ...user!,
        name,
        surname,
      });
      navigation.goBack();
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка. Пожалуйста, попробуйте снова.');
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
              Редактировать профиль
            </Typography>
            <Typography variant="regularText" style={styles.subtitle}>
              Измените свои личные данные
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

            {error ? (
              <Typography variant="regularText" style={styles.error}>
                {error}
              </Typography>
            ) : null}

            <Button
              label="Сохранить"
              onPress={handleSaveProfile}
              loading={loading}
              style={styles.saveButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default EditProfile;
