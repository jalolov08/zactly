import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Switch, Alert } from 'react-native';
import { Typography } from '@/components/Typography/typography.component';
import { BackButton } from '@/components/BackButton/back-button.component';
import { useAuthStore } from '@/zustand/useAuthStore';
import { colors } from '@/constants/colors.constant';
import styles from './notifications.style';
import { NotificationsScreenProps } from '@/types/main.type';
import { api } from '@/api/api';
import { User } from '@/types/user.type';

function Notifications({ navigation }: NotificationsScreenProps) {
  const { user, setUser } = useAuthStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.notificationsEnabled !== undefined) {
      setNotificationsEnabled(user.notificationsEnabled);
    }
  }, [user?.notificationsEnabled]);

  const handleToggleNotifications = async (value: boolean) => {
    setLoading(true);
    setError('');

    try {
      const response = await api.patch<{ user: User }>('/users/notifications', {
        notifications: value,
      });

      setUser(response.data.user);
      setNotificationsEnabled(value);

      Alert.alert(
        value ? 'Уведомления включены' : 'Уведомления отключены',
        value
          ? 'Теперь вы будете получать уведомления о новых фактах и обновлениях.'
          : 'Уведомления отключены. Вы можете включить их в любое время.',
        [{ text: 'OK' }]
      );
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при изменении настроек уведомлений');
      // Revert the toggle if there was an error
      setNotificationsEnabled(!value);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BackButton onPress={() => navigation.goBack()} style={styles.backButton} />

        <View style={styles.header}>
          <Typography variant="h1" style={styles.title}>
            Уведомления
          </Typography>
          <Typography variant="regularText" style={styles.subtitle}>
            Управляйте настройками уведомлений
          </Typography>
        </View>

        {error ? (
          <Typography variant="regularText" style={styles.error}>
            {error}
          </Typography>
        ) : null}

        <View style={styles.settingsContainer}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Typography variant="regularText" style={styles.settingIconText}>
                  🔔
                </Typography>
              </View>
              <View style={styles.settingContent}>
                <Typography variant="regularText" style={styles.settingTitle}>
                  Push-уведомления
                </Typography>
                <Typography variant="regularText" style={styles.settingSubtitle}>
                  Получать уведомления о новых фактах и обновлениях
                </Typography>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
              disabled={loading}
              trackColor={{ false: colors.lightGrey, true: colors.teal }}
              thumbColor={notificationsEnabled ? colors.white : colors.lightBlueGrey}
              ios_backgroundColor={colors.lightGrey}
            />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Typography variant="regularText" style={styles.infoTitle}>
            Что включают уведомления:
          </Typography>
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Typography variant="regularText" style={styles.infoBullet}>
                •
              </Typography>
              <Typography variant="regularText" style={styles.infoText}>
                Новые интересные факты в ваших категориях
              </Typography>
            </View>
            <View style={styles.infoItem}>
              <Typography variant="regularText" style={styles.infoBullet}>
                •
              </Typography>
              <Typography variant="regularText" style={styles.infoText}>
                Ежедневные напоминания о чтении фактов
              </Typography>
            </View>
            <View style={styles.infoItem}>
              <Typography variant="regularText" style={styles.infoBullet}>
                •
              </Typography>
              <Typography variant="regularText" style={styles.infoText}>
                Обновления и новости приложения
              </Typography>
            </View>
          </View>
        </View>

        <View style={styles.noteContainer}>
          <Typography variant="regularText" style={styles.noteText}>
            💡 Совет: Включите уведомления, чтобы не пропустить интересные факты и оставаться в
            курсе обновлений приложения.
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Notifications;
