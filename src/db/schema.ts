import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('ec_users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
