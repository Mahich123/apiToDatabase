import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL!,
});

await pool.connect();
export const db = drizzle(pool);
