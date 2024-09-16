import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    
    // Wait for 2 seconds to show the splash screen
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (session) {
      // User is logged in, redirect to tabs
      router.replace('/(tabs)');
    } else {
      // User is not logged in, redirect to welcome screen
      router.replace('/(auth)/welcome');
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../assets/images/splash.png')} />
    </View>
  );
}