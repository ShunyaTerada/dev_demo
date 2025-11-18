import { pets} from "@/db/schema/pet";
 

export type Pet = typeof pets.$inferSelect;
    type Pet ={
        id: string;
        name: string;
        type: "dog" | "cat";
        hp: number;
        ownerID: string;
    }
 
