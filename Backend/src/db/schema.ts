import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('Users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  email: text().notNull().unique(),
});

export const tasks = pgTable('Tasks', {
  id: integer().primaryKey().notNull().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  description: text(),
  completed: boolean().notNull().default(false),
  createdAt: timestamp().notNull().defaultNow(),
  userId: integer()
    .notNull()
    .references(() => users.id),
});

export const userRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
}));

export const taskRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
}));
