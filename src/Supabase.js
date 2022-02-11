import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kjdfchehyjheuutobjdb.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjczMDA0OCwiZXhwIjoxOTMyMzA2MDQ4fQ.9A3uBTWE5yztfnyrVdvQb1WM_IuvIimbmM3SU3PcNZM"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)