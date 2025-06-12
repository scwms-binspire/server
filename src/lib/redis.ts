import env from "@binspire/config/env";
import { logger } from "@binspire/utils/logger";
import { Redis } from "ioredis";

let redis: Redis | undefined;

export async function initRedis() {
  if (redis) {
    logger.info("Redis connection already established.");
    return redis;
  }

  const connectionUrl = env?.REDIS_URL;
  if (!connectionUrl)
    throw new Error("REDIS_URL is not provided in environment variables");

  const redisInstance = new Redis(connectionUrl);

  try {
    await redisInstance.ping();
    logger.info("Redis connected");
    redis = redisInstance;
    return redis;
  } catch (error) {
    redisInstance.disconnect();
    logger.error("Failed to connect redis", error);
    throw error;
  }
}

function getRedis() {
  if (!redis)
    throw new Error("Redis has not been initialized. Call initRedis() first.");
  return redis;
}

export default getRedis;
