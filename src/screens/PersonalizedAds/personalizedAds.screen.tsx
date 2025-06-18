import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Switch, Alert } from 'react-native';
import { Typography } from '@/components/Typography/typography.component';
import { BackButton } from '@/components/BackButton/back-button.component';
import { useAuthStore } from '@/zustand/useAuthStore';
import { colors } from '@/constants/colors.constant';
import styles from './personalizedAds.style';
import { PersonalizedAdsScreenProps } from '@/types/main.type';
import { api } from '@/api/api';
import { User } from '@/types/user.type';

function PersonalizedAds({ navigation }: PersonalizedAdsScreenProps) {
  const { user, setUser } = useAuthStore();
  const [personalizedAdsEnabled, setPersonalizedAdsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.allowPersonalizedAds !== undefined) {
      setPersonalizedAdsEnabled(user.allowPersonalizedAds);
    }
  }, [user?.allowPersonalizedAds]);

  const handleTogglePersonalizedAds = async (value: boolean) => {
    setLoading(true);
    setError('');

    try {
      const response = await api.patch<{ user: User }>('/users/personalized-ads', {
        allowPersonalizedAds: value,
      });

      setUser(response.data.user);
      setPersonalizedAdsEnabled(value);

      Alert.alert(
        value ? 'Персонализированная реклама включена' : 'Персонализированная реклама отключена',
        value
          ? 'Теперь вы будете видеть рекламу, которая соответствует вашим интересам.'
          : 'Персонализированная реклама отключена. Вы будете видеть общую рекламу.',
        [{ text: 'OK' }]
      );
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при изменении настроек рекламы');
      setPersonalizedAdsEnabled(!value);
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
            Персонализированная реклама
          </Typography>
          <Typography variant="regularText" style={styles.subtitle}>
            Управляйте настройками рекламы
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
                  💸
                </Typography>
              </View>
              <View style={styles.settingContent}>
                <Typography variant="regularText" style={styles.settingTitle}>
                  Персонализированная реклама
                </Typography>
                <Typography variant="regularText" style={styles.settingSubtitle}>
                  Показывать рекламу на основе ваших интересов
                </Typography>
              </View>
            </View>
            <Switch
              value={personalizedAdsEnabled}
              onValueChange={handleTogglePersonalizedAds}
              disabled={loading}
              trackColor={{ false: colors.lightGrey, true: colors.teal }}
              thumbColor={personalizedAdsEnabled ? colors.white : colors.lightBlueGrey}
              ios_backgroundColor={colors.lightGrey}
            />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Typography variant="regularText" style={styles.infoTitle}>
            Что такое персонализированная реклама:
          </Typography>
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Typography variant="regularText" style={styles.infoBullet}>
                •
              </Typography>
              <Typography variant="regularText" style={styles.infoText}>
                Реклама подбирается на основе ваших интересов и предпочтений
              </Typography>
            </View>
            <View style={styles.infoItem}>
              <Typography variant="regularText" style={styles.infoBullet}>
                •
              </Typography>
              <Typography variant="regularText" style={styles.infoText}>
                Более релевантные предложения и акции
              </Typography>
            </View>
            <View style={styles.infoItem}>
              <Typography variant="regularText" style={styles.infoBullet}>
                •
              </Typography>
              <Typography variant="regularText" style={styles.infoText}>
                Помогает поддерживать бесплатное использование приложения
              </Typography>
            </View>
          </View>
        </View>

        <View style={styles.privacyContainer}>
          <Typography variant="regularText" style={styles.privacyTitle}>
            Конфиденциальность:
          </Typography>
          <Typography variant="regularText" style={styles.privacyText}>
            Ваши данные используются только для подбора рекламы и не передаются третьим лицам. Вы
            можете отключить персонализированную рекламу в любое время.
          </Typography>
        </View>

        <View style={styles.noteContainer}>
          <Typography variant="regularText" style={styles.noteText}>
            💡 Совет: Включение персонализированной рекламы помогает нам показывать вам более
            интересные и полезные предложения.
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PersonalizedAds;
