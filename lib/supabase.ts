import 'react-native-url-polyfill/auto'

import asyncStorageProxy from './asyncStorage'
import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
const supabaseUrl = `https://bilodfuxqrpljoblocnn.supabase.co`;
const supabaseAnonKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpbG9kZnV4cXJwbGpvYmxvY25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5MjUyMDAsImV4cCI6MjA0MTUwMTIwMH0.pvN76JgIacunYY6_mAQwp2OB6Xx9QFiPPsLvk6kbSI8`;
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: asyncStorageProxy,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
