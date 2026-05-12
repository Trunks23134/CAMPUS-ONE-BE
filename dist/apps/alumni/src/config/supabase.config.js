"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupabaseClient = getSupabaseClient;
const supabase_js_1 = require("@supabase/supabase-js");
let supabaseInstance = null;
function getSupabaseClient() {
    if (!supabaseInstance) {
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!url || !key) {
            throw new Error('[Alumni] SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env');
        }
        supabaseInstance = (0, supabase_js_1.createClient)(url, key, {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        });
    }
    return supabaseInstance;
}
//# sourceMappingURL=supabase.config.js.map