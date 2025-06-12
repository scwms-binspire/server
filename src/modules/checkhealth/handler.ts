import type { AppRouteHandler } from "@binspire/lib/types";
import type { CheckHealthRoute } from "./route";
import * as HttpStatusCodes from "stoker/http-status-codes";

const checkHealthHandler: AppRouteHandler<CheckHealthRoute> = async (c) => {
  try {
    return c.json(
      {
        status: "operational",
        message: "Your API is operational. All systems are running smoothly.",
      },
      HttpStatusCodes.OK,
    );
  } catch {
    return c.json(
      {
        status: "down",
        message:
          "Your API is down. We are currently experiencing issues and are working to resolve them.",
      },
      HttpStatusCodes.SERVICE_UNAVAILABLE,
    );
  }
};

export default checkHealthHandler;
