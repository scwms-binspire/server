import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "prod", "test"]).default("dev"),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GMAIL_HOST: z.string(),
  GMAIL_USER: z.string(),
  GMAIL_PASS: z.string(),
  AUTH_SECRET: z.string(),
  PORT: z.coerce.number().default(8080),
  ORS_API_KEY: z.string(),
  LOG_LEVEL: z.string().default("info"),
});

/* eslint-disable node/no-process-env */
const { data: env, error } = envSchema.safeParse(process.env);

if (error) {
  console.error("Invalid environment variables");
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

export default env;
