import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text, Image } from "react-native";
import { useMediaByGenre } from "../hooks/useMediaByGenre";
import MediaCarousel from "../components/MediaCarousel";
import MediaModal from "../components/MediaModal";
import { COLORS } from "../config/theme/colors";

const MoviesScreen = () => {
  const { loading, sections } = useMediaByGenre("movie");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: "white" }}>Cargando...</Text>
      </View>
    );
  }

  const openModal = (item: any) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Logo igual que en Home */}
        <View style={styles.header}>
          <Image
            source={require("../../../assets/logoresplandor.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Carruseles por género */}
        {sections.map((section, idx) => (
          <MediaCarousel
            key={idx}
            title={section.genre}
            items={section.items}
            onSelect={openModal}
          />
        ))}
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
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 160,
    height: 70,
    marginTop: 20,
  },
});

export default MoviesScreen;
