import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Typography } from '@/components/Typography/typography.component';
import { api } from '@/api/api';
import { IFact } from '../../types/fact.type';
import FactCard from '@/components/FactCard/fact-card.component';
import { colors } from '@/constants/colors.constant';
import LottieView from 'lottie-react-native';
import loadingAnimation from '../../assets/animations/loading-2.json';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { NoInternet } from '@/components/NoInternet/NoInternet.component';
import { useRoute, useNavigation } from '@react-navigation/native';
import { BackButton } from '@/components/BackButton/back-button.component';
import styles from './categoryFacts.style';

interface RouteParams {
  categoryId: string;
  categoryName: string;
}

function CategoryFacts() {
  const route = useRoute();
  const navigation = useNavigation();
  const { categoryId, categoryName } = route.params as RouteParams;

  const swiperRef = useRef<Swiper<IFact>>(null);
  const [facts, setFacts] = useState<IFact[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [shouldRetry, setShouldRetry] = useState(false);
  const [noMoreFacts, setNoMoreFacts] = useState(false);
  const { isConnected, isDisconnected, checkNetworkStatus } = useNetworkStatus();

  const fetchFacts = async () => {
    setLoading(true);
    try {
      const response = await api.get<{ facts: IFact[]; hasMore: boolean }>(
        `/facts/feed/${categoryId}?limit=15`
      );
      console.log(response.data);
      setFacts(response.data.facts);
      setHasMore(response.data.hasMore);

      if (response.data.facts.length === 0 && !response.data.hasMore) {
        setNoMoreFacts(true);
      }
    } catch (error) {
      console.error('Error fetching facts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && (shouldRetry || facts.length === 0)) {
      fetchFacts();
      setShouldRetry(false);
    }
  }, [isConnected, shouldRetry, categoryId]);

  const handleMarkAsRead = async (factId: string) => {
    try {
      await api.post(`/facts/${factId}/view`);
    } catch (error) {
      console.error('Error marking fact as viewed:', error);
    }
  };

  const handleSwiped = (cardIndex: number) => {
    console.log('Swiped card at index:', cardIndex);
  };

  const handleSwipedAll = () => {
    if (hasMore) {
      fetchFacts();
    } else {
      setNoMoreFacts(true);
    }
  };

  const handleRetry = () => {
    setShouldRetry(true);
    checkNetworkStatus();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (isDisconnected) {
    return (
      <View style={styles.centered}>
        <NoInternet onRetry={handleRetry} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={handleBack} style={styles.backButton} />
        <Typography variant="h2" style={styles.categoryTitle}>
          {categoryName}
        </Typography>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <View style={styles.loadingContainer}>
            <LottieView source={loadingAnimation} autoPlay loop style={styles.animation} />
          </View>
        </View>
      ) : noMoreFacts ? (
        <View style={styles.centered}>
          <Typography>Факты закончились</Typography>
          <Typography>Попробуйте другую категорию!</Typography>
        </View>
      ) : facts.length === 0 ? (
        <View style={styles.centered}>
          <Typography>Нет актуальных фактов</Typography>
          <Typography>Попробуйте другую категорию!</Typography>
        </View>
      ) : (
        <Swiper<IFact>
          ref={swiperRef}
          cards={facts}
          renderCard={fact =>
            fact ? <FactCard fact={fact} onMarkAsRead={handleMarkAsRead} /> : null
          }
          onSwipedLeft={cardIndex => handleSwiped(cardIndex)}
          onSwipedRight={cardIndex => handleSwiped(cardIndex)}
          onSwipedAll={handleSwipedAll}
          cardIndex={0}
          backgroundColor={colors.bg}
          stackSize={3}
          stackSeparation={15}
          animateOverlayLabelsOpacity
          animateCardOpacity
          overlayLabels={{}}
        />
      )}
    </SafeAreaView>
  );
}

export default CategoryFacts;
