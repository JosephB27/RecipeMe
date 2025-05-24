import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper function to handle errors
export const handleSupabaseError = (error: any) => {
  if (error) {
    console.error('Supabase error:', error);
    throw new Error(error.message || 'An unexpected error occurred');
  }
};

// Export types for better TypeScript support
export type { User, Session, AuthError } from '@supabase/supabase-js'; 