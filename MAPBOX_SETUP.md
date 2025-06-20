# Настройка Mapbox API и разрешений геолокации

## Обзор

Для получения информации о городе и стране по координатам используется Mapbox Geocoding API. Приложение автоматически запрашивает разрешение на геолокацию у пользователя.

## Получение API ключа

1. Зарегистрируйтесь на [Mapbox](https://www.mapbox.com/)
2. Создайте новый проект или используйте существующий
3. Скопируйте ваш Public Access Token

## Настройка в приложении

### Вариант 1: Прямая замена в коде

Откройте файл `config.ts` в корне проекта и замените токен:

```typescript
export const config = {
  // ... другие настройки
  mapbox: {
    access_token: 'ваш_реальный_токен_здесь',
  },
};
```

### Вариант 2: Использование переменных окружения (рекомендуется)

1. Установите библиотеку:

```bash
npm install react-native-dotenv
```

2. Создайте файл `.env` в корне проекта:

```env
MAPBOX_ACCESS_TOKEN=ваш_реальный_токен_здесь
```

3. Обновите `babel.config.js`:

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
};
```

4. Обновите `config.ts`:

```typescript
import { MAPBOX_ACCESS_TOKEN } from '@env';

export const config = {
  // ... другие настройки
  mapbox: {
    access_token: MAPBOX_ACCESS_TOKEN,
  },
};
```

## Разрешения геолокации

### Автоматический запрос разрешений

Приложение автоматически запрашивает разрешение на геолокацию при:

- Первом входе в приложение
- Попытке получить местоположение
- Использовании компонента `LocationPermission`

### Компоненты для работы с разрешениями

#### `LocationPermission`

Компонент для запроса разрешения на геолокацию:

```typescript
import { LocationPermission } from '@/components/LocationPermission/locationPermission.component';

<LocationPermission
  onPermissionGranted={() => console.log('Разрешение предоставлено')}
  onPermissionDenied={() => console.log('Разрешение отклонено')}
  showDialog={true} // Показать диалог автоматически
/>;
```

#### `useLocationPermission`

Хук для работы с разрешениями:

```typescript
import { useLocationPermission } from '@/hooks/useLocationPermission';

const { permissionStatus, isGranted, isDenied, requestPermission } = useLocationPermission();
```

### Статусы разрешений

- `pending` - ожидание проверки
- `checking` - проверка разрешения
- `granted` - разрешение предоставлено
- `denied` - разрешение отклонено

## Проверка работы

После настройки токена приложение будет автоматически:

1. **Запрашивать разрешение** на геолокацию
2. **Получать координаты** (если разрешено)
3. **Определять страну и город** через Mapbox API
4. **Сохранять данные** в профиле пользователя

### Пример данных

```typescript
{
  device: 'ios',
  locationData: {
    country: 'Россия',
    city: 'Москва',
    timezone: 'Europe/Moscow'
  }
}
```

## Обработка ошибок

### Если разрешение не предоставлено:

- Приложение продолжит работать
- Будет сохранен только часовой пояс
- Пользователь может изменить разрешение в настройках

### Если Mapbox API недоступен:

- Приложение продолжит работать
- Будет сохранен только часовой пояс
- В консоли появится предупреждение

## Лимиты API

Mapbox Geocoding API имеет следующие лимиты:

- **Бесплатный план**: 100,000 запросов в месяц
- **Платные планы**: от $0.75 за 1000 запросов

## Безопасность

⚠️ **Важно**: Никогда не коммитьте реальные API ключи в репозиторий!

- Используйте `.env` файлы
- Добавьте `.env` в `.gitignore`
- Используйте разные ключи для разработки и продакшена

## Разрешения в манифестах

### Android

Разрешения уже добавлены в `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

### iOS

Описание уже добавлено в `Info.plist`:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Приложению требуется доступ к местоположению для улучшения пользовательского опыта и персонализации контента</string>
```

## Пример использования

### Получение данных устройства и местоположения

```typescript
import { getDeviceAndLocationData } from '@/utils/device.util';

const { device, locationData } = await getDeviceAndLocationData();

console.log('Устройство:', device); // 'ios' или 'android'
console.log('Страна:', locationData.country); // 'Россия'
console.log('Город:', locationData.city); // 'Москва'
console.log('Часовой пояс:', locationData.timezone); // 'Europe/Moscow'
```

### Работа с разрешениями

```typescript
import { useLocationPermission } from '@/hooks/useLocationPermission';

const MyComponent = () => {
  const { isGranted, requestPermission } = useLocationPermission();

  const handleRequestLocation = async () => {
    if (!isGranted) {
      const granted = await requestPermission();
      if (granted) {
        // Разрешение предоставлено, можно получать местоположение
        const locationData = await getLocationData();
      }
    }
  };

  return <LocationPermission onPermissionGranted={handleRequestLocation} />;
};
```

## Устранение неполадок

### Разрешение не запрашивается

1. Проверьте, что разрешения добавлены в манифесты
2. Убедитесь, что используется правильная версия `react-native-geolocation-service`
3. Перезапустите приложение

### Mapbox API не работает

1. Проверьте правильность токена
2. Убедитесь, что токен имеет права на Geocoding API
3. Проверьте лимиты API

### Ошибки в консоли

- Все ошибки логируются в консоль
- Приложение продолжает работать даже при ошибках
- Проверьте логи для диагностики проблем
