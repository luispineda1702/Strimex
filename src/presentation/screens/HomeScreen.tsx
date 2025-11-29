import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native';
import { useHome } from '../hooks/useHome';
import MediaCarousel from '../components/MediaCarousel';
import MediaModal from '../components/MediaModal';
import { COLORS } from '../config/theme/colors';

const HomeScreen = () => {
  const { homeData, loading } = useHome();

  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (item: any) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  if (loading || !homeData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: 'white' }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={require('../../../assets/logoresplandor.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <MediaCarousel
          title="🔥 Películas Populares"
          items={homeData.popularMovies}
          onSelect={openModal}
        />

        <MediaCarousel
          title="🔥 Series Populares"
          items={homeData.popularSeries}
          onSelect={openModal}
        />

        <MediaCarousel
          title="⭐ Películas Mejor Calificadas"
          items={homeData.topMovies}
          onSelect={openModal}
        />

        <MediaCarousel
          title="⭐ Series Mejor Calificadas"
          items={homeData.topSeries}
          onSelect={openModal}
        />

        <MediaCarousel
          title="📈 Tendencias"
          items={homeData.trending}
          onSelect={openModal}
        />
      </ScrollView>

      <MediaModal
        visible={modalVisible}
        item={selectedItem}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },

  logo: {
    width: 160,
    height: 70,
    marginTop: 20,
  },
});

export default HomeScreen;
