import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { useRouter } from 'expo-router';

export default function AddScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(campaign)/create');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <ThemedText style={{ marginTop: 20, textAlign: 'center' }}>
        We are preparing your form...
      </ThemedText>
    </View>
  );
}