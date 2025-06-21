import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export type NetworkStatus = 'connected' | 'disconnected' | 'checking';

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>('checking');

  const checkNetworkStatus = async () => {
    setNetworkStatus('checking');
    try {
      const state = await NetInfo.fetch();
      setNetworkStatus(state.isConnected ? 'connected' : 'disconnected');
    } catch (error) {
      console.error('Ошибка при проверке сетевого статуса:', error);
      setNetworkStatus('disconnected');
    }
  };

  useEffect(() => {
    checkNetworkStatus();

    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkStatus(state.isConnected ? 'connected' : 'disconnected');
    });

    return () => unsubscribe();
  }, []);

  return {
    networkStatus,
    isConnected: networkStatus === 'connected',
    isDisconnected: networkStatus === 'disconnected',
    isChecking: networkStatus === 'checking',
    checkNetworkStatus,
  };
};
