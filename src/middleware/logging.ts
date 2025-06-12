import pino from "pino";
import env from "@binspire/config/env";
import { nanoid } from "nanoid";
import { pinoLogger } from "hono-pino";
import pretty from "pino-pretty";

export default function loggingMiddleware() {
  return pinoLogger({
    pino: pino(
      {
        level: env?.LOG_LEVEL || "info",
      },
      env?.NODE_ENV === "prod" ? undefined : pretty(),
    ),
    http: {
      reqId: () => nanoid(),
    },
  });
}
