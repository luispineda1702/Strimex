import React, { useState } from 'react';
import {  
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  onLogin: () => void;
  onRegister?: () => void;
}

const LoginScreen: React.FC<Props> = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() !== '' && password.trim() !== '') {
      onLogin();
    } else {
      alert('Por favor, ingresa usuario y contraseña.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0D" />

      <Image 
        source={require('../assets/logoresplandor.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />

      <Text style={styles.title}>Bienvenido a Strimex</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onRegister}>
        <Text style={styles.registerText}>
          ¿No tienes cuenta? <Text style={styles.registerLink}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1aff',
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
    fontWeight: '600',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1A082C',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    color: '#FFF',
    borderWidth: 1,
    borderColor: '#8A2BE2',
  },
  button: {
    backgroundColor: '#8A2BE2',
    width: '100%',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  registerText: {
    color: '#AAA',
    fontSize: 14,
  },
  registerLink: {
    color: '#8A2BE2',
    fontWeight: '600',
  },
});

export default LoginScreen;
