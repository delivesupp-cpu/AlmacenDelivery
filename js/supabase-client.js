// js/supabase-client.js
const SUPABASE_URL = 'https://uaqmropyhnlzgijnlzsg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ei2ob5egOE3yMoBQtffJpw_BOj6c8GH';

// Crear cliente único
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabase = window.supabaseClient; // alias para compatibilidad