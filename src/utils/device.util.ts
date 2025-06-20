import Geolocation from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import { UserDevice } from '@/types/user.type';
import axios from 'axios';
import { config } from '../../config';

export interface LocationData {
  country?: string;
  city?: string;
  timezone?: string;
}

export const getDeviceInfo = (): UserDevice => {
  return Platform.OS === 'ios' ? UserDevice.IOS : UserDevice.ANDROID;
};

export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    return true;
  }

  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Разрешение на геолокацию',
          message:
            'Приложению требуется доступ к местоположению для улучшения пользовательского опыта',
          buttonNeutral: 'Спросить позже',
          buttonNegative: 'Отмена',
          buttonPositive: 'OK',
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Ошибка при запросе разрешения на геолокацию:', err);
      return false;
    }
  }

  return false;
};

const showLocationPermissionDialog = (): Promise<boolean> => {
  return new Promise(resolve => {
    Alert.alert(
      'Доступ к местоположению',
      'Для улучшения пользовательского опыта приложению требуется доступ к вашему местоположению. Это поможет персонализировать контент и улучшить функциональность.',
      [
        {
          text: 'Отмена',
          style: 'cancel',
          onPress: () => resolve(false),
        },
        {
          text: 'Разрешить',
          onPress: () => resolve(true),
        },
      ]
    );
  });
};

const getLocationInfoFromCoordinates = async (
  longitude: number,
  latitude: number
): Promise<{ country?: string; city?: string }> => {
  try {
    if (
      !longitude ||
      !latitude ||
      longitude < -180 ||
      longitude > 180 ||
      latitude < -90 ||
      latitude > 90
    ) {
      console.warn('Некорректные координаты:', { longitude, latitude });
      return {};
    }

    let country: string | undefined;
    let city: string | undefined;

    try {
      const countryResponse = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
        {
          params: {
            access_token: config.mapbox.access_token,
            types: 'country',
            language: 'ru',
          },
          timeout: 5000,
        }
      );

      if (countryResponse.data?.features?.length > 0) {
        country = countryResponse.data.features[0].text;
      }
    } catch (error) {
      console.warn('Ошибка получения страны:', error);
    }

    try {
      const cityResponse = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
        {
          params: {
            access_token: config.mapbox.access_token,
            types: 'place,locality',
            language: 'ru',
          },
          timeout: 5000,
        }
      );

      if (cityResponse.data?.features?.length > 0) {
        city = cityResponse.data.features[0].text;
      }
    } catch (error) {
      console.warn('Ошибка получения города:', error);
    }

    console.log('Mapbox API ответ:', { country, city });
    return { country, city };
  } catch (error: any) {
    console.warn('Ошибка получения информации о местоположении через Mapbox:', {
      error: error.message,
      status: error.response?.status,
      data: error.response?.data,
      coordinates: { longitude, latitude },
    });
    return {};
  }
};

export const getLocationData = async (): Promise<LocationData> => {
  const hasPermission = await requestLocationPermission();

  if (!hasPermission) {
    const userWantsToGrant = await showLocationPermissionDialog();

    if (userWantsToGrant) {
      const permissionGranted = await requestLocationPermission();
      if (!permissionGranted) {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return { timezone };
      }
    } else {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return { timezone };
    }
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async position => {
        try {
          const { longitude, latitude } = position.coords;
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          const locationInfo = await getLocationInfoFromCoordinates(longitude, latitude);

          resolve({
            timezone,
            country: locationInfo.country,
            city: locationInfo.city,
          });
        } catch (error) {
          console.warn('Ошибка при обработке местоположения:', error);
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          resolve({ timezone });
        }
      },
      error => {
        console.warn('Ошибка получения местоположения:', error);
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        resolve({ timezone });
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  });
};

export const getDeviceAndLocationData = async (): Promise<{
  device: UserDevice;
  locationData: LocationData;
}> => {
  const device = getDeviceInfo();
  const locationData = await getLocationData();

  return { device, locationData };
};
