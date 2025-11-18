import { pgTable, text, integer, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { nanoid } from "nanoid";
import { relations } from "drizzle-orm";

// ペットタイプのenum（犬または猫）
export const petTypeEnum = pgEnum("pet_type", ["dog", "cat"]);

export const pets = pgTable("pets", {
  id: text("id").primaryKey().$defaultFn(() => nanoid(10)),
  name: text("name").notNull(),
  type: petTypeEnum("type").notNull(),
  hp: integer("hp").notNull().default(50),
  ownerID: text("owner_id").notNull().references(() => users.id, {onDelete: "cascade"})
});

export const petRelations = relations(pets,({one})=>({
  owners: one(users,{
    fields: [pets.ownerID],
    references: [users.id],
  }),
}));