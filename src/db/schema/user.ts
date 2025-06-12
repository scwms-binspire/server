import type { z } from "zod/v4";
import { index, boolean, pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { nanoid } from "nanoid";
import { insertExcludedFields, timestamps } from "../base";
import { organizationsTable } from "./org";
import { permissionEnum, roleEnum } from "../enum";

export const usersTable = pgTable(
  "users",
  {
    id: text("id")
      .$defaultFn(() => nanoid())
      .primaryKey(),
    orgId: text("org_id").references(() => organizationsTable.id, {
      onDelete: "cascade",
    }),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").notNull(),
    permission: permissionEnum().notNull(),
    image: text("image"),
    role: roleEnum().notNull(),
    isOnline: boolean("is_online").notNull().default(false),
    ...timestamps,
  },
  (table) => ({
    orgIdIdx: index("users_org_id_idx").on(table.orgId),
    roleIdx: index("users_role_idx").on(table.role),
    permissionIdx: index("users_permission_idx").on(table.permission),
    isOnlineIdx: index("users_is_online_idx").on(table.isOnline),
    emailVerifiedIdx: index("users_email_verified_idx").on(table.emailVerified),
  }),
);

export const insertUserSchema = createInsertSchema(usersTable)
  .omit(insertExcludedFields)
  .strict();

export const updateUserSchema = insertUserSchema.partial();

export type User = typeof usersTable.$inferSelect;
export type UserRole = (typeof roleEnum.enumValues)[number];
export type UserPermission = (typeof permissionEnum.enumValues)[number];
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
