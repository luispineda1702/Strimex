import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const ProfileScreen = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <View style={styles.container}>
      <Button title="Cerrar sesión" onPress={onLogout} color="#9B4DFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1aff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
