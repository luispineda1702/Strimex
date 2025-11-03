import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MovieCard from '../components/MovieCard';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recomendadas</Text>
        <View style={styles.grid}>
          <MovieCard title="Avatar" image={require('../assets/avatar.jpg')} />
          <MovieCard title="Inception" image={require('../assets/inception.jpg')} />
          <MovieCard title="Interstellar" image={require('../assets/interstellar.jpg')} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1aff',
    paddingHorizontal: 10,
  },
  title: {
    color: '#8A2BE2',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 6,
    paddingTop:10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default HomeScreen;
