import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.ts",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:E8dxzZehYU2j@ep-silent-haze-a5mim07u.us-east-2.aws.neon.tech/neondb?sslmode=require",
  }
});