import { useState, useEffect } from 'react';
import { requestLocationPermission } from '@/utils/device.util';

export type PermissionStatus = 'pending' | 'granted' | 'denied' | 'checking';

export const useLocationPermission = () => {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('pending');

  const checkPermission = async () => {
    setPermissionStatus('checking');

    try {
      const granted = await requestLocationPermission();
      setPermissionStatus(granted ? 'granted' : 'denied');
      return granted;
    } catch (error) {
      console.error('Ошибка при проверке разрешения:', error);
      setPermissionStatus('denied');
      return false;
    }
  };

  const requestPermission = async () => {
    setPermissionStatus('checking');

    try {
      const granted = await requestLocationPermission();
      setPermissionStatus(granted ? 'granted' : 'denied');
      return granted;
    } catch (error) {
      console.error('Ошибка при запросе разрешения:', error);
      setPermissionStatus('denied');
      return false;
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return {
    permissionStatus,
    checkPermission,
    requestPermission,
    isGranted: permissionStatus === 'granted',
    isDenied: permissionStatus === 'denied',
    isPending: permissionStatus === 'pending',
    isChecking: permissionStatus === 'checking',
  };
};
