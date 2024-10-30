import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qnbnkbjozmmvbswfurla.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuYm5rYmpvem1tdmJzd2Z1cmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNTI0NjQsImV4cCI6MjA0NTgyODQ2NH0.-HMex6hIDkwj5lGCV6e0JAqwrOYKAGqrjkD13Hb0pEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);