import type { AppBindings, AppOpenAPI } from "./types";
import packageJSON from "../../package.json" with { type: "json" };
import { Scalar } from "@scalar/hono-api-reference";
import { OpenAPIHono } from "@hono/zod-openapi";

export function createOpenAPIRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
  });
}

export function createOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Binspire API",
    },
    servers: [
      {
        url: "http://localhost:8080/api/v1",
        description: "Local Development Server",
      },
    ],
  });

  app.get(
    "/reference",
    Scalar({
      url: "/api/v1/doc",
      pageTitle: "Binspire API",
      servers: [
        {
          url: "http://localhost:8080",
          description: "Local Development Server",
        },
      ],
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
    }),
  );
}
