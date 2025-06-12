import { permissionValues, roleValues } from "@binspire/lib/constant";
import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", roleValues);
export const permissionEnum = pgEnum("permission", permissionValues);
