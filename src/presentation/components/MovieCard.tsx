import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../config/theme/colors';
import { FONTS } from '../config/theme/fonts';

interface Props {
  title: string;
  image: string | null | undefined;
  rating?: number;
  onPress?: () => void;
}

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const MovieCard: React.FC<Props> = ({ title, image, rating, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={
          image
            ? { uri: IMAGE_BASE + image }
            : require('../../../assets/noimage.png')
        }
        style={styles.image}
      />

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
        {rating !== undefined && (
          <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 130,
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: 190,
    borderRadius: 12,

    // Estilo profesional tipo Netflix
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  info: {
    marginTop: 6,
  },
  title: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.text,
  },
  rating: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 2,
  },
});

export default MovieCard;
