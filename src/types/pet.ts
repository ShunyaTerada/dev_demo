import { pets } from "@/db/schema/pet";
import { PetFormSchema } from "@/zod/pet";
import { z } from "zod";

export type Pet = typeof pets.$inferSelect;
export type PetType = Pet["type"];
export type PetFormData = z.infer<typeof PetFormSchema>;
