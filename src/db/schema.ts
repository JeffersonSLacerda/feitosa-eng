import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).default('user').notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at").defaultNow(),
});

export const productsTable = pgTable('products', {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  priceInCents: integer("price_in_cents").notNull(),
  stripeId: varchar('stripe_id', { length: 100 }).notNull(),
  imageUrl: varchar('image_url', { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const blogCategoriesTable = pgTable('blog_categories', {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).unique().notNull(),
});

export const blogPostsTable = pgTable('blog_posts', {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  authorId: text('author_id').references(() => usersTable.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id').references(() => blogCategoriesTable.id, { onDelete: 'cascade' }),
  publishedAt: timestamp('published_at').defaultNow().notNull(),
  featured: boolean('featured').default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const ordersTable = pgTable('orders', {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text('user_id').references(() => usersTable.id, { onDelete: 'set null' }),
  stripePaymentId: varchar('stripe_payment_id', { length: 100 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // completed, failed
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const orderItemsTable = pgTable('order_items', {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => ordersTable.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').references(() => productsTable.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull().default(1),
  unitPriceInCents: integer('unit_price').notNull(),
});

export const blogPostsRelations = relations(blogPostsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [blogPostsTable.authorId],
    references: [usersTable.id],
  }),
  category: one(blogCategoriesTable, {
    fields: [blogPostsTable.categoryId],
    references: [blogCategoriesTable.id],
  }),
}));