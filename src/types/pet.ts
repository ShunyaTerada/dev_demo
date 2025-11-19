import { pets } from "../../db/schema/pet";
import { petFormSchema } from "../../zod/pet";
import { z } from "zod";

export type Pet = typeof pets.$inferSelect;
export type PetFormData =  z.infer<typeof petFormSchema>;
 
