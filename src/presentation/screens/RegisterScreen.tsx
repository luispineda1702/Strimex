// src/presentation/screens/RegisterScreen.tsx

import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

import { useAuth } from '../hooks/useAuth';
import { COLORS } from '../config/theme/colors';
import { FONTS } from '../config/theme/fonts';

const RegisterScreen = () => {
  const navigation: any = useNavigation();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert('Error', 'Completa todos los campos.');
      return;
    }

    try {
      setLoading(true);

      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseToken = await cred.user.getIdToken();

      const ok = await register(firebaseToken, name);

      if (!ok) {
        Alert.alert('Error', 'No se pudo registrar en el servidor.');
        return;
      }

      Alert.alert('Éxito', 'Registro exitoso. Ahora inicia sesión.');
      navigation.replace('Login');
    } catch (error: any) {
      console.log('REGISTER ERROR:', error);
      Alert.alert('Error', error.message ?? 'No se pudo registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0D" />

      <Image
        source={require('../../../assets/logoresplandor.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Crear Cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#888"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Registrarme</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.registerText}>
          ¿Ya tienes cuenta?{' '}
          <Text style={styles.registerLink}>Inicia sesión</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 180,
    height: 100,
    marginBottom: 30,
  },
  title: {
    color: '#E0E0E0',
    fontSize: 22,
    fontFamily: FONTS.bold,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.primary,
    fontFamily: FONTS.regular,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: COLORS.text,
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  registerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  registerLink: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
});

export default RegisterScreen;
