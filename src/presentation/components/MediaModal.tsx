import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { COLORS } from '../config/theme/colors';
import { FONTS } from '../config/theme/fonts';

import { useFavorites } from '../hooks/useFavorites';
import { ProvidersAPI } from '../../data/source/remote/api/providers.api';

const MediaModal = ({ visible, item, onClose }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const [providers, setProviders] = useState<any[]>([]);
  const [loadingProviders, setLoadingProviders] = useState(true);

  useEffect(() => {
    if (!item) return;
    loadProviders();
  }, [item]);

  const loadProviders = async () => {
    try {
      setLoadingProviders(true);

      const mediaType =
        item.mediaType || (item.title && !item.name ? 'movie' : 'tv');

      const data = await ProvidersAPI.getProviders(item.id, mediaType);
      setProviders(data);
    } catch (e) {
      console.log('Error loading providers:', e);
    } finally {
      setLoadingProviders(false);
    }
  };

  if (!item) return null;

  const fav = isFavorite(item.id);

  const itemFixed = {
    ...item,
    mediaType: item.mediaType || (item.title && !item.name ? 'movie' : 'tv'),
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={{ uri: item.poster }} style={styles.poster} />

            <Text style={styles.title}>{item.title}</Text>

            {item.rating && (
              <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
            )}

            {item.genres && (
              <Text style={styles.genres}>{item.genres.join(' • ')}</Text>
            )}

            {item.overview && (
              <Text style={styles.overview}>{item.overview}</Text>
            )}

            <Text style={styles.subTitle}>Disponible en:</Text>

            {loadingProviders ? (
              <ActivityIndicator color="white" style={{ marginVertical: 10 }} />
            ) : providers.length === 0 ? (
              <Text style={styles.noProviders}>
                No disponible en plataformas
              </Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {providers.map(p => (
                  <View key={p.providerId} style={styles.providerCard}>
                    <Image
                      source={{ uri: p.logo }}
                      style={styles.providerLogo}
                    />
                    <Text style={styles.providerName}>{p.name}</Text>
                  </View>
                ))}
              </ScrollView>
            )}

            <TouchableOpacity
              style={[styles.favButton, fav ? styles.remove : styles.add]}
              onPress={() => toggleFavorite(itemFixed)}
            >
              <Text style={styles.favText}>
                {fav ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Cerrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  container: {
    height: '85%',
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 16,
  },
  poster: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.text,
    marginTop: 16,
  },
  rating: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    marginTop: 4,
  },
  genres: {
    color: COLORS.textSecondary,
    marginTop: 4,
    fontFamily: FONTS.regular,
  },
  overview: {
    fontFamily: FONTS.regular,
    color: COLORS.text,
    marginTop: 10,
    lineHeight: 20,
  },
  subTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 10,
  },
  providerCard: {
    marginRight: 15,
    alignItems: 'center',
  },
  providerLogo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 5,
  },
  providerName: {
    color: 'white',
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
  noProviders: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  favButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  add: {
    backgroundColor: COLORS.primary,
  },
  remove: {
    backgroundColor: '#FF5555',
  },
  favText: {
    fontFamily: FONTS.bold,
    color: '#FFF',
  },
  closeButton: {
    marginTop: 25,
    alignItems: 'center',
  },
  closeText: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
});

export default MediaModal;
