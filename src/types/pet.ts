import { pets} from "@/db/schema/pet";
 

export type Pet = typeof pets.$inferSelect;
 
