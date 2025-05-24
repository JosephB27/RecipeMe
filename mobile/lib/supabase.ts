import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// Get these values from your Supabase project settings
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 