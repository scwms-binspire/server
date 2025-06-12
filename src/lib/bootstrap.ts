import { logger } from "@binspire/utils/logger";
import { initDatabase } from "./db";
import { initRedis } from "./redis";

export default async function bootstrap() {
  try {
    logger.info("Application starting up...");
    await Promise.all([await initDatabase(), await initRedis()]);
    logger.info("All services initialized successfully.");
  } catch (error) {
    console.error(error);
    logger.error("Fatal error during application startup:", error);
    process.exit(1);
  }
}
