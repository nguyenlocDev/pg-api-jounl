import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userId: integer("user_id").primaryKey().generatedAlwaysAsIdentity(),
  username: varchar("username", { length: 50 }).unique().notNull(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  fullName: varchar("full_name", { length: 100 }),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow(),
  lastLogin: timestamp("last_login").defaultNow(),
});
