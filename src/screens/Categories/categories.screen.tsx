import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Typography } from '@/components/Typography/typography.component';
import { colors } from '@/constants/colors.constant';
import { api } from '@/api/api';
import { config } from '../../../config';
import { Category } from '@/types/category.type';
import styles from './categories.style';
import LottieView from 'lottie-react-native';
import loadingAnimation from '@/assets/animations/loading-2.json';

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    filterCategories();
  }, [searchQuery, categories]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories/active');
      setCategories(response.data || []);
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при загрузке категорий');
    } finally {
      setLoading(false);
    }
  };

  const filterCategories = () => {
    if (!searchQuery.trim()) {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(
        category =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  const handleCategoryPress = (category: Category) => {
    console.log(category)тзь ;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <LottieView source={loadingAnimation} autoPlay loop style={styles.animation} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Typography variant="h1" style={styles.title}>
            Категории
          </Typography>
          <Typography variant="regularText" style={styles.subtitle}>
            Выберите интересующую вас категорию
          </Typography>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Поиск категорий..."
              placeholderTextColor={colors.lightBlueGrey}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                <Typography variant="regularText" style={styles.clearIcon}>
                  ✕
                </Typography>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {error ? (
          <Typography variant="regularText" style={styles.error}>
            {error}
          </Typography>
        ) : null}

        {filteredCategories.length === 0 && !loading ? (
          <View style={styles.emptyContainer}>
            <Typography variant="regularText" style={styles.emptyIcon}>
              📚
            </Typography>
            <Typography variant="regularText" style={styles.emptyTitle}>
              Категории не найдены
            </Typography>
            <Typography variant="regularText" style={styles.emptyText}>
              {searchQuery
                ? 'Попробуйте изменить поисковый запрос'
                : 'В данный момент категории недоступны'}
            </Typography>
          </View>
        ) : (
          <View style={styles.categoriesGrid}>
            {filteredCategories.map(category => (
              <TouchableOpacity
                key={category._id}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category)}
                activeOpacity={0.7}
              >
                <View style={styles.categoryImageContainer}>
                  {category.image ? (
                    <Image
                      source={{ uri: `${config.apiUrl}${category.image}` }}
                      style={styles.categoryImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.categoryImagePlaceholder}>
                      <Typography variant="regularText" style={styles.categoryPlaceholderIcon}>
                        📚
                      </Typography>
                    </View>
                  )}
                </View>
                <View style={styles.categoryContent}>
                  <Typography variant="regularText" style={styles.categoryName}>
                    {category.name}
                  </Typography>
                  <Typography variant="regularText" style={styles.categoryDescription}>
                    {category.description}
                  </Typography>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Categories;
