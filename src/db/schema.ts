import { InferSelectModel, relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
});

export const plans = pgTable(
  'plan',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    user: text('user')
      .notNull()
      .references(() => users.id),
    plan: text('plan').notNull(),
    eventName: text('eventName').notNull(),
    pricePaid: integer('pricePaid').notNull(),
    endDate: timestamp('endDate', { mode: 'date' }).notNull(),
    pauseUploads: boolean('pauseUploads').notNull().default(false),
    url: text('url').notNull().unique(),
    pin: text('pin'),
    storageLimit: integer('storageLimit').notNull(),
    downloadUsed: integer('downloadUsed').notNull().default(0),
  },
  (plan) => ({
    unq: unique().on(plan.user, plan.eventName),
  }),
);

export const images = pgTable('image', {
  plan_id: text('plan_id').references(() => plans.id, {
    onDelete: 'cascade',
  }),
  guest: text('guest').notNull(),
  url: text('url').notNull(),
  key: text('key').notNull(),
  size: integer('size').notNull(),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull(),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

// Relations
export const plansRelations = relations(plans, ({ many }) => ({
  images: many(images),
}));

export const imagesRelations = relations(images, ({ one }) => ({
  plan: one(plans, {
    fields: [images.plan_id],
    references: [plans.id],
  }),
}));

// Types
export type User = InferSelectModel<typeof users>;
export type Plan = {
  plan: string;
  eventName: string;
  endDate: Date;
  pauseUploads: boolean;
  url: string;
  pin: string | null;
  storageLimit: number;
  downloadUsed: number;
  images: {
    guest: string;
    url: string;
    key: string;
    size: number;
    createdAt: Date;
  }[];
};
export type Plans = Pick<
  InferSelectModel<typeof plans>,
  'id' | 'eventName' | 'endDate'
>;
