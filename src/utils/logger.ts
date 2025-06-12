import pino from "pino";
import env from "@binspire/config/env";

export const logger = pino({
  level: env?.LOG_LEVEL,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  redact: ["DATABASE_URL"],
});
