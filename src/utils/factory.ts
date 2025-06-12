import { createFactory } from "hono/factory";
import type { AppBindings } from "@binspire/lib/types";

export const factory = createFactory<AppBindings>();
