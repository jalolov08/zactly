import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Typography } from '@/components/Typography/typography.component';
import { Button } from '@/components/Button/button.component';
import { colors } from '@/constants/colors.constant';
import { requestLocationPermission } from '@/utils/device.util';

interface LocationPermissionProps {
  onPermissionGranted?: () => void;
  onPermissionDenied?: () => void;
  showDialog?: boolean;
}

export const LocationPermission: React.FC<LocationPermissionProps> = ({
  onPermissionGranted,
  onPermissionDenied,
  showDialog = false,
}) => {
  const [permissionStatus, setPermissionStatus] = useState<'pending' | 'granted' | 'denied'>(
    'pending'
  );

  const handleRequestPermission = async () => {
    try {
      const granted = await requestLocationPermission();

      if (granted) {
        setPermissionStatus('granted');
        onPermissionGranted?.();
      } else {
        setPermissionStatus('denied');
        onPermissionDenied?.();
      }
    } catch (error) {
      console.error('Ошибка при запросе разрешения:', error);
      setPermissionStatus('denied');
      onPermissionDenied?.();
    }
  };

  const handleShowExplanation = () => {
    Alert.alert(
      'Зачем нужен доступ к местоположению?',
      'Приложению требуется доступ к вашему местоположению для:\n\n• Персонализации контента\n• Улучшения пользовательского опыта\n• Определения вашего часового пояса\n• Аналитики использования',
      [
        {
          text: 'Понятно',
          onPress: handleRequestPermission,
        },
        {
          text: 'Отмена',
          style: 'cancel',
          onPress: () => {
            setPermissionStatus('denied');
            onPermissionDenied?.();
          },
        },
      ]
    );
  };

  useEffect(() => {
    if (showDialog) {
      handleShowExplanation();
    }
  }, [showDialog]);

  if (permissionStatus === 'granted') {
    return (
      <View style={styles.container}>
        <Typography variant="regularText" style={styles.successText}>
          ✅ Доступ к местоположению разрешен
        </Typography>
      </View>
    );
  }

  if (permissionStatus === 'denied') {
    return (
      <View style={styles.container}>
        <Typography variant="regularText" style={styles.warningText}>
          ⚠️ Доступ к местоположению ограничен
        </Typography>
        <Typography variant="regularText" style={styles.description}>
          Некоторые функции могут работать некорректно
        </Typography>
        <Button label="Попробовать снова" onPress={handleRequestPermission} style={styles.button} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Typography variant="h3" style={styles.title}>
        Доступ к местоположению
      </Typography>
      <Typography variant="regularText" style={styles.description}>
        Для улучшения пользовательского опыта приложению требуется доступ к вашему местоположению
      </Typography>
      <View style={styles.buttonContainer}>
        <Button label="Разрешить" onPress={handleRequestPermission} style={styles.button} />
        <Button
          label="Узнать больше"
          onPress={handleShowExplanation}
          style={styles.secondaryButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    margin: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkTeal,
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    color: colors.lightBlueGrey,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    marginBottom: 0,
  },
  secondaryButton: {
    backgroundColor: colors.lightGrey,
  },
  successText: {
    color: colors.teal,
    textAlign: 'center',
    fontWeight: '600',
  },
  warningText: {
    color: colors.error,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 8,
  },
});
