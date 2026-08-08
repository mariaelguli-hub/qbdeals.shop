import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rlnnlrtxklxllkiofgfp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsbm5scnR4a2x4bGxraW9mZ2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMTY1NjUsImV4cCI6MjEwMTc5MjU2NX0._s7k2BXmZC4-uNgx-pEG1VrxcMicAsjnLSNCpcYlOUg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
