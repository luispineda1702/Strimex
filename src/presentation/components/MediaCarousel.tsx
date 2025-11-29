import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MediaItem } from '../hooks/useHome';
import MovieCard from './MovieCard';
import { COLORS } from '../config/theme/colors';
import { FONTS } from '../config/theme/fonts';

interface Props {
  title: string;
  items: MediaItem[];
  onSelect?: (item: MediaItem) => void;
}

const MediaCarousel: React.FC<Props> = ({ title, items, onSelect }) => {
  if (!items || items.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 8 }}
      >
        {items.map(item => (
          <MovieCard
            key={item.id}
            title={item.title || item.name || ''}
            image={item.poster}
            rating={item.voteAverage}
            onPress={() => onSelect && onSelect(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default MediaCarousel;
