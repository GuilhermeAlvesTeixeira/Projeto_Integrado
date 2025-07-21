import {createClient} from "@supabase/supabase-js";

const supabaseURL = process.env.supabaseURL || "";
const supabaseAnonKey = process.env.supabaseAnonKey || "";
export const supabase = createClient(supabaseURL, supabaseAnonKey);