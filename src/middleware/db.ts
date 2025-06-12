import getDb from "@binspire/lib/db";
import { factory } from "@binspire/utils/factory";
import { logger } from "@binspire/utils/logger";

const dbMiddleware = factory.createMiddleware(async (c, next) => {
  try {
    const db = getDb();
    c.set("db", db);
    await next();
  } catch (error) {
    logger.error("Failed to initialize database in middleware:", error);
    return c.json(
      {
        status: false,
        message: "Internal Server Error: Database connection failed.",
      },
      500,
    );
  }
});

export default dbMiddleware;
