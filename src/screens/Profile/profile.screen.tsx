import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Typography } from '@/components/Typography/typography.component';
import { Button } from '@/components/Button/button.component';
import { useAuthStore } from '@/zustand/useAuthStore';
import { colors } from '@/constants/colors.constant';
import { ProfileScreenProps } from '@/types/auth.type';
import styles from './profile.style';
import { useAuth } from '@/contexts/AuthContext/auth.context';

function Profile({ navigation }: ProfileScreenProps) {
  const { user } = useAuthStore();
  const { onLogout } = useAuth();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = () => {
    if (logoutLoading) return;

    Alert.alert('Выход из аккаунта', 'Вы уверены, что хотите выйти?', [
      {
        text: 'Отмена',
        style: 'cancel',
      },
      {
        text: 'Выйти',
        style: 'destructive',
        onPress: async () => {
          setLogoutLoading(true);
          try {
            await onLogout();
          } catch (error) {
            console.error('Logout error:', error);
          } finally {
            setLogoutLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Typography variant="h1" style={styles.title}>
            Профиль
          </Typography>
          <Typography variant="regularText" style={styles.subtitle}>
            Управляйте своим аккаунтом
          </Typography>
        </View>

        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Typography variant="h2" style={styles.avatarText}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Typography>
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Личная информация
          </Typography>

          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Typography variant="regularText" style={styles.infoIconText}>
                  👤
                </Typography>
              </View>
              <View style={styles.infoContent}>
                <Typography variant="regularText" style={styles.infoLabel}>
                  Имя
                </Typography>
                <Typography variant="regularText" style={styles.infoValue}>
                  {user?.name || 'Не указано'}
                </Typography>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Typography variant="regularText" style={styles.infoIconText}>
                  👤
                </Typography>
              </View>
              <View style={styles.infoContent}>
                <Typography variant="regularText" style={styles.infoLabel}>
                  Фамилия
                </Typography>
                <Typography variant="regularText" style={styles.infoValue}>
                  {user?.surname || 'Не указано'}
                </Typography>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Typography variant="regularText" style={styles.infoIconText}>
                  📧
                </Typography>
              </View>
              <View style={styles.infoContent}>
                <Typography variant="regularText" style={styles.infoLabel}>
                  Email
                </Typography>
                <Typography variant="regularText" style={styles.infoValue}>
                  {user?.email || 'Не указано'}
                </Typography>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Возможности приложения
          </Typography>

          <View style={styles.settingsList}>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Typography variant="regularText" style={styles.settingIconText}>
                    💖
                  </Typography>
                </View>
                <View style={styles.settingContent}>
                  <Typography variant="regularText" style={styles.settingTitle}>
                    Избранные
                  </Typography>
                  <Typography variant="regularText" style={styles.settingSubtitle}>
                    Сохраняйте факты которые вам понравились
                  </Typography>
                </View>
              </View>
              <Typography variant="regularText" style={styles.settingArrow}>
                ›
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate('Interests')}
            >
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Typography variant="regularText" style={styles.settingIconText}>
                    🌍
                  </Typography>
                </View>
                <View style={styles.settingContent}>
                  <Typography variant="regularText" style={styles.settingTitle}>
                    Интересы
                  </Typography>
                  <Typography variant="regularText" style={styles.settingSubtitle}>
                    Выберите свои интересы
                  </Typography>
                </View>
              </View>
              <Typography variant="regularText" style={styles.settingArrow}>
                ›
              </Typography>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Настройки аккаунта
          </Typography>

          <View style={styles.settingsList}>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Typography variant="regularText" style={styles.settingIconText}>
                    ✏️
                  </Typography>
                </View>
                <View style={styles.settingContent}>
                  <Typography variant="regularText" style={styles.settingTitle}>
                    Редактировать профиль
                  </Typography>
                  <Typography variant="regularText" style={styles.settingSubtitle}>
                    Изменить личные данные
                  </Typography>
                </View>
              </View>
              <Typography variant="regularText" style={styles.settingArrow}>
                ›
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate('Notifications')}
            >
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Typography variant="regularText" style={styles.settingIconText}>
                    🔔
                  </Typography>
                </View>
                <View style={styles.settingContent}>
                  <Typography variant="regularText" style={styles.settingTitle}>
                    Уведомления
                  </Typography>
                  <Typography variant="regularText" style={styles.settingSubtitle}>
                    Настройки уведомлений
                  </Typography>
                </View>
              </View>
              <Typography variant="regularText" style={styles.settingArrow}>
                ›
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate('PersonalizedAds')}
            >
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Typography variant="regularText" style={styles.settingIconText}>
                    💸
                  </Typography>
                </View>
                <View style={styles.settingContent}>
                  <Typography variant="regularText" style={styles.settingTitle}>
                    Реклама
                  </Typography>
                  <Typography variant="regularText" style={styles.settingSubtitle}>
                    Использовать рекламу
                  </Typography>
                </View>
              </View>
              <Typography variant="regularText" style={styles.settingArrow}>
                ›
              </Typography>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Правовая информация
          </Typography>

          <View style={styles.actionsList}>
            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionLeft}>
                <View style={styles.actionIcon}>
                  <Typography variant="regularText" style={styles.actionIconText}>
                    📋
                  </Typography>
                </View>
                <Typography variant="regularText" style={styles.actionTitle}>
                  Условия использования
                </Typography>
              </View>
              <Typography variant="regularText" style={styles.actionArrow}>
                ›
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionLeft}>
                <View style={styles.actionIcon}>
                  <Typography variant="regularText" style={styles.actionIconText}>
                    📄
                  </Typography>
                </View>
                <Typography variant="regularText" style={styles.actionTitle}>
                  Политика конфиденциальности
                </Typography>
              </View>
              <Typography variant="regularText" style={styles.actionArrow}>
                ›
              </Typography>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dangerSection}>
          <Button
            label="Выйти из аккаунта"
            onPress={handleLogout}
            style={styles.logoutButton}
            backgroundColor={colors.white}
            color={colors.teal}
            loading={logoutLoading}
            disabled={logoutLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;
