import dbMiddleware from "@binspire/middleware/db";
import loggingMiddleware from "@binspire/middleware/logging";
import indexRoute from "@binspire/modules";
import { notFound, onError } from "stoker/middlewares";
import { createOpenAPI, createOpenAPIRouter } from "./open-api";
import checkHealthRoute from "@binspire/modules/checkhealth/route";

export function initApp() {
  const app = createOpenAPIRouter().basePath("/api/v1");
  app.use(loggingMiddleware()).use(dbMiddleware);
  app.notFound(notFound);
  app.onError(onError);
  return app;
}

const app = initApp();

createOpenAPI(app);

const routes = [indexRoute, checkHealthRoute] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
