import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useAuth } from "../hooks/useAuth";
import { useFavorites } from "../hooks/useFavorites";

import { COLORS } from "../config/theme/colors";
import { FONTS } from "../config/theme/fonts";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={
            user?.avatar
              ? { uri: user.avatar }
              : require("../../../assets/userplaceholder.png")
          }
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.nombreCompleto}</Text>
        <Text style={styles.email}>{user?.correo}</Text>
      </View>

      {/* FAVORITOS */}
      <Text style={styles.sectionTitle}>⭐ Mis Favoritos</Text>

      <View style={styles.favoritesGrid}>
        {favorites.length === 0 ? (
          <Text style={styles.noFavs}>No tienes favoritos aún.</Text>
        ) : (
          favorites.map((item) => (
            <Image
              key={`${item.id}-${item.type}`}
              source={{ uri: IMAGE_BASE + item.poster }}
              style={styles.favoritePoster}
            />
          ))
        )}
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },

  header: {
    alignItems: "center",
    marginVertical: 30,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  name: {
    fontFamily: FONTS.bold,
    color: COLORS.text,
    fontSize: 22,
  },

  email: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    fontSize: 14,
    marginTop: 4,
  },

  sectionTitle: {
    fontFamily: FONTS.bold,
    color: COLORS.text,
    fontSize: 20,
    marginBottom: 10,
  },

  favoritesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  favoritePoster: {
    width: "48%",
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },

  noFavs: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    textAlign: "center",
    width: "100%",
    marginTop: 10,
  },

  logoutBtn: {
    backgroundColor: COLORS.primary,
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 60,
  },

  logoutText: {
    color: "#FFF",
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
});

export default ProfileScreen;
