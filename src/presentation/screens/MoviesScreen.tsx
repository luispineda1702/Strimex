import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MoviesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Películas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1aff', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#8A2BE2', fontSize: 20 },
});

export default MoviesScreen;
