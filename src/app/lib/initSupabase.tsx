import { Database } from '@/supabase'
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''
)

const rooms= supabase.from("Rooms").select()