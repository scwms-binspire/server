import type { z } from "zod/v4";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { nanoid } from "nanoid";
import { insertExcludedFields, timestamps } from "../base";

export const organizationsTable = pgTable("organizations", {
  id: text("id")
    .$defaultFn(() => nanoid())
    .primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  ...timestamps,
});

export const insertOrganizationSchema = createInsertSchema(organizationsTable)
  .omit(insertExcludedFields)
  .strict();

export const updateOrganizationSchema = insertOrganizationSchema.partial();

export type Organization = typeof organizationsTable.$inferSelect;
export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;
export type UpdateOrganization = z.infer<typeof updateOrganizationSchema>;
