import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help-circle-outline';
          let iconName2: keyof typeof AntDesign.glyphMap = 'message1';

          if (route.name === 'index') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'discover') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'create') {
            iconName = 'add-circle';
            size = 40;
            color = '#00b894';
          } else if (route.name === 'chats') {
            iconName2 = focused ? 'message1' : 'message1';
          } else if (route.name === 'profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6c5ce7',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: true,
        tabBarStyle: {
          display: 'flex',
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="discover" options={{ title: 'Discover' }} />
      <Tabs.Screen name="create" options={{ title: 'Add' }} />
      <Tabs.Screen name="chats" options={{ title: 'Chats' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />

       <Tabs.Screen name="hidden" options={{ href: null }} />
    </Tabs>
  );
}