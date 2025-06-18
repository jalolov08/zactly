import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { Typography } from '@/components/Typography/typography.component';
import { Button } from '@/components/Button/button.component';
import { BackButton } from '@/components/BackButton/back-button.component';
import { useAuthStore } from '@/zustand/useAuthStore';
import styles from './interests.style';
import { InterestsScreenProps } from '@/types/main.type';
import { api } from '@/api/api';
import { config } from '../../../config';
import { User } from '@/types/user.type';
import { Category } from '@/types/category.type';

function Interests({ navigation }: InterestsScreenProps) {
  const { user, setUser } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);

  const MAX_INTERESTS = 5;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (user?.interests) {
      setSelectedInterests(user.interests);
    }
  }, [user?.interests]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories/active');
      setCategories(response.data || []);
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при загрузке категорий');
    } finally {
      setInitialLoading(false);
    }
  };

  const toggleInterest = (categoryId: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        if (prev.length >= MAX_INTERESTS) {
          Alert.alert(
            'Максимальное количество интересов',
            `Вы можете выбрать не более ${MAX_INTERESTS} интересов. Снимите выбор с одного из текущих интересов, чтобы добавить новый.`
          );
          return prev;
        }
        return [...prev, categoryId];
      }
    });
  };

  const handleSaveInterests = async () => {
    if (selectedInterests.length === 0) {
      setError('Пожалуйста, выберите хотя бы один интерес');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.patch<{ user: User }>('/users/interests', {
        interests: selectedInterests,
      });

      setUser(response.data.user);

      Alert.alert(
        'Интересы сохранены',
        'Ваши интересы успешно обновлены. Теперь вы будете получать персонализированные факты.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при сохранении интересов');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Typography variant="regularText" style={styles.loadingText}>
            Загрузка категорий...
          </Typography>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BackButton onPress={() => navigation.goBack()} style={styles.backButton} />

        <View style={styles.header}>
          <Typography variant="h1" style={styles.title}>
            Выберите интересы
          </Typography>
          <Typography variant="regularText" style={styles.subtitle}>
            Выберите до {MAX_INTERESTS} категорий, которые вас интересуют
          </Typography>
        </View>

        <View style={styles.counterContainer}>
          <Typography variant="regularText" style={styles.counterText}>
            Выбрано: {selectedInterests.length}/{MAX_INTERESTS}
          </Typography>
        </View>

        {error ? (
          <Typography variant="regularText" style={styles.error}>
            {error}
          </Typography>
        ) : null}

        <View style={styles.categoriesContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category._id}
              style={[
                styles.categoryItem,
                selectedInterests.includes(category._id) && styles.categoryItemSelected,
              ]}
              onPress={() => toggleInterest(category._id)}
            >
              <View style={styles.categoryContent}>
                <View style={styles.categoryIcon}>
                  {category.image ? (
                    <Image
                      source={{ uri: `${config.apiUrl}${category.image}` }}
                      style={styles.categoryImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.categoryImagePlaceholder}>
                      <Typography variant="regularText" style={styles.categoryIconText}>
                        📚
                      </Typography>
                    </View>
                  )}
                </View>
                <View style={styles.categoryInfo}>
                  <Typography variant="regularText" style={styles.categoryName}>
                    {category.name}
                  </Typography>
                  <Typography variant="regularText" style={styles.categoryDescription}>
                    {category.description}
                  </Typography>
                </View>
                <View
                  style={[
                    styles.checkbox,
                    selectedInterests.includes(category._id) && styles.checkboxSelected,
                  ]}
                >
                  {selectedInterests.includes(category._id) && (
                    <Typography variant="regularText" style={styles.checkmark}>
                      ✓
                    </Typography>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="Сохранить интересы"
            onPress={handleSaveInterests}
            loading={loading}
            disabled={selectedInterests.length === 0}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Interests;
