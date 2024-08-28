import { sql } from "drizzle-orm";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const Jsonforms = pgTable("jsonForms", {
  id: serial('id').primaryKey(),
  jsonform: text("jsonform").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull()
})

export const UserResponse = pgTable("userResponse", {
  id: serial('id').primaryKey(),
  jsonResponse: text('jsonResponse').notNull(),
  createdBy: varchar("createdBy").default(sql`'anonymous'`),
  createdAt: varchar("createdAt").notNull(),
  formRef: integer('formRef').references(()=>Jsonforms.id)
})