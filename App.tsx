import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/presentation/routes/StackNavigator';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle={"light-content"}/>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
