import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '@/components/Typography/typography.component';
import styles from './NoInternet.style';
import LottieView from 'lottie-react-native';
import noInternetAnimation from '@/assets/animations/no-network.json';

interface NoInternetProps {
  onRetry?: () => void;
}

export const NoInternet: React.FC<NoInternetProps> = ({ onRetry }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <LottieView source={noInternetAnimation} autoPlay loop style={styles.animation} />
        <Typography variant="regularText" style={styles.title}>
          Нет интернета
        </Typography>
        <Typography variant="regularText" style={styles.message}>
          Проверьте подключение к интернету и повторите попытку
        </Typography>
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Typography variant="regularText" style={styles.retryText}>
              Повторить
            </Typography>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
