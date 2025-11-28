// presentation/routes/StackNavigator.tsx
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import MainTabs from './MainTabs';
import { useAuth } from '../hooks/useAuth';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { status, checkStatus, logout } = useAuth();

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {status !== 'authenticated' ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="MainTabs">
          {() => <MainTabs onLogout={logout} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
