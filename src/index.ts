import env from "./config/env";
import app from "./lib/app";
import bootstrap from "./lib/bootstrap";
import { logger } from "./utils/logger";

await bootstrap();

Bun.serve({
  fetch: app.fetch,
  port: env?.PORT,
});

logger.info(`Server is running on http://localhost:8080/api/v1`);
