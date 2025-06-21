import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Typography } from '../Typography/typography.component';
import { colors } from '../../constants/colors.constant';
import { config } from '../../../config';
import { IFact } from '../../types/fact.type';
import Icon, { Icons } from '../Icon/icon.component';
import { api } from '../../api/api';

interface FactCardProps {
  fact: IFact;
  onMarkAsRead?: (factId: string) => void;
}

const FactCard: React.FC<FactCardProps> = ({ fact, onMarkAsRead }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isRead) {
        setIsRead(true);
        onMarkAsRead?.(fact._id);
        api.post(`/facts/${fact._id}/view`).catch(error => {
          console.error('Error marking fact as viewed:', error);
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [fact._id, isRead, onMarkAsRead]);

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: `${config.apiUrl}${fact.image}` }} style={styles.image} />
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
          <Icon
            type={Icons.MaterialIcons}
            name={isFavorite ? 'favorite' : 'favorite-border'}
            color={isFavorite ? colors.error : colors.white}
            size={28}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Typography variant="h2" style={styles.title}>
            {fact.title}
          </Typography>
          <Typography style={styles.description}>{fact.description}</Typography>
          {fact.category && (
            <View style={styles.categoryContainer}>
              <Typography style={styles.categoryText}>
                {typeof fact.category === 'string' ? fact.category : (fact.category as any).name}
              </Typography>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.smokeWhite,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    height: '80%',
    alignSelf: 'center',
    marginTop: 60,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  readIndicator: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  textContainer: {
    padding: 20,
  },
  title: {
    color: 'white',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  description: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  categoryContainer: {
    position: 'absolute',
    top: -40,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FactCard;
