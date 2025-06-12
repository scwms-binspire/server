import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import checkhealthHandler from "./handler";
import { createOpenAPIRouter } from "@binspire/lib/open-api";

const checkhealthHealthSchema = z
  .object({
    status: z.enum(["operational", "down"]),
    message: z.string().min(1, "Message is required"),
  })
  .strict();

const route = createRoute({
  method: "get",
  path: "/checkhealth",
  tags: ["System Health"],
  summary: "Checks the health status of the API",
  description:
    "Provides a simple endpoint to monitor the API's operational status.",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      checkhealthHealthSchema.extend({
        status: z.literal("operational"),
        message: z.literal(
          "Your API is operational. All systems are running smoothly.",
        ),
      }),
      "API is healthy, all services are running",
    ),
    [HttpStatusCodes.SERVICE_UNAVAILABLE]: jsonContent(
      checkhealthHealthSchema.extend({
        status: z.literal("down"),
        message: z.literal(
          "Your API is down. We are currently experiencing issues and are working to resolve them.",
        ),
      }),
      "API is currently down or experiencing issues",
    ),
  },
});

export type CheckHealthRoute = typeof route;

const checkHealthRoute = createOpenAPIRouter().openapi(
  route,
  checkhealthHandler,
);

export default checkHealthRoute;
