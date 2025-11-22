import { pgTable, text, integer, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { nanoid } from "nanoid";
import { relations } from "drizzle-orm";

export const petType = ["dog", "cat"] as const;

// ペットタイプのenum（犬または猫）
export const petTypeEnum = pgEnum("pet_type", petType);

export const pets = pgTable("pets", {
  id: text("id").primaryKey().$defaultFn(() => nanoid(10)),
  name: text("name").notNull(),
  type: petTypeEnum("type").notNull(),
  hp: integer("hp").notNull().default(50),
  ownerID: text("owner_id").notNull().references(() => user.id, { onDelete: "cascade" })
});

export const petRelations = relations(pets, ({ one }) => ({
  owners: one(user, {
    fields: [pets.ownerID],
    references: [user.id],
  }),
}));