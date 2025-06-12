import { createRoute } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { createOpenAPIRouter } from "@binspire/lib/open-api";

const indexRoute = createOpenAPIRouter().openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema("Binspire API"),
        "Binspire API Index",
      ),
    },
  }),
  (c) => {
    return c.json(
      {
        message: "Binspire API",
      },
      HttpStatusCodes.OK,
    );
  },
);

export default indexRoute;
