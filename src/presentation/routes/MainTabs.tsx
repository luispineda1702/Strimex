import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MoviesScreen from '../screens/MoviesScreen';
import SeriesScreen from '../screens/SeriesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS } from '../config/theme/colors';

// IMPORTAR SVGs
import HomeIcon from '../../../assets/icon/home.svg';
import MovieIcon from '../../../assets/icon//movie.svg';
import SeriesIcon from '../../../assets/icon/serie.svg';
import ProfileIcon from '../../../assets/icon/profile.svg';

export type MainTabsParamList = {
  Home: undefined;
  Movies: undefined;
  Series: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#222',
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#777',
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ focused }) => {
          let Icon;

          switch (route.name) {
            case 'Home': Icon = HomeIcon; break;
            case 'Movies': Icon = MovieIcon; break;
            case 'Series': Icon = SeriesIcon; break;
            case 'Profile': Icon = ProfileIcon; break;
          }

          return (
            <Icon
              width={28}
              height={28}
              fill={focused ? COLORS.primary : '#777'}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Movies" component={MoviesScreen} />
      <Tab.Screen name="Series" component={SeriesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
