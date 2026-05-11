import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://uhaaawuaqogjzzmzijji.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoYWFhd3VhcW9nanp6bXppamppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MjE5NzEsImV4cCI6MjA4NTk5Nzk3MX0.rmI-JF23exUut9O2s_Yy8I_XL0j34bdTXFhrXtUjuto';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
