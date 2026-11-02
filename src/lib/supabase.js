import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://otcqwshujyurrnnxlbda.supabase.co';

const SUPABASE_KEY = 'sb_publishable_vDJo5BENkhjg2_u7Adkz-Q_b8GmWlo6';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
