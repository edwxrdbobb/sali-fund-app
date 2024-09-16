import { Platform } from 'react-native';

const ENV = {
  MAPBOX_ACCESS_TOKEN: process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN,
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  // Add other environment variables here
};

const getEnvVars = () => {
  if (__DEV__) {
    return ENV;
  }
  return ENV;
};

export default getEnvVars;