import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import env from "../config/env";
import * as schema from "../db/index";
import { logger } from "@binspire/utils/logger";

export type Database = PostgresJsDatabase<typeof schema>;

let db: Database | undefined;

export async function initDatabase() {
  if (db) {
    logger.info("Database connection already established.");
    return db;
  }

  const connectionUrl = env?.DATABASE_URL;
  if (!connectionUrl)
    throw new Error("DATABASE_URL is not provided in environment variables");

  try {
    const client = postgres(connectionUrl);
    const drizzleInstance = drizzle(client, { schema });
    await drizzleInstance.execute("SELECT 1");
    logger.info("Database connected");
    db = drizzleInstance;
    return db;
  } catch (error) {
    logger.error("Failed to connect database", error);
    throw error;
  }
}

function getDb() {
  if (!db) {
    throw new Error(
      "Database has not been initialized. Call initDatabase() first.",
    );
  }
  return db;
}

export default getDb;
