/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SeriesScreen from '../screens/SeriesScreen';
import MoviesScreen from '../screens/MoviesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faTv, faFilm, faUser } from '@fortawesome/free-solid-svg-icons';
import { LoginScreenFB } from '../screens/auth/LoginScreenFB';

const Tab = createBottomTabNavigator();

const MainTabs = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#0B0B0D',
          height: 65,
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          paddingLeft: 10,
        },
        headerShadowVisible: false,

        tabBarIcon: ({ color }) => {
          let icon;
          if (route.name === 'Inicio') icon = faHome;
          else if (route.name === 'Series') icon = faTv;
          else if (route.name === 'Películas') icon = faFilm;
          else if (route.name === 'Perfil') icon = faUser;

          return <FontAwesomeIcon icon={icon} color={color} size={20} />;
        },
        tabBarActiveTintColor: '#9B4DFF',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#0B0B0D',
          borderTopColor: '#1E1E1E',
          height: 60,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Series" component={SeriesScreen} />
      <Tab.Screen name="Películas" component={MoviesScreen} />
      <Tab.Screen name="Perfil">
        {() => <ProfileScreen onLogout={onLogout} />}
      </Tab.Screen>
      <Tab.Screen name="FB" component={LoginScreenFB}/>
    </Tab.Navigator>
  );
};

export default MainTabs;
