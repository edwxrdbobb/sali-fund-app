import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a simple in-memory storage for server-side rendering
const memoryStorage = new Map<string, string>();

const asyncStorageProxy = {
  getItem: async (key: string) => {
    if (typeof window === 'undefined') {
      return memoryStorage.get(key) || null;
    }
    return AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    if (typeof window === 'undefined') {
      memoryStorage.set(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  },
  removeItem: (key: string) => AsyncStorage.removeItem(key),
  // Implement other AsyncStorage methods as needed
};

export default asyncStorageProxy;