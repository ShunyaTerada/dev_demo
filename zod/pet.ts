import { z} from "zod";
import { pets, petType } from "../db/schema/pet";
import { createInsertSchema } from "drizzle-zod";

// export const petFormSchema = z.object({
//     name: z.string().min(1, { message: "名前は必須です" }).max(50, { message: "名前は50文字以内で入力してください" }),
//     type: z.enum(["dog", "cat"], { required_error: "種類は必須です" }),
//     hp: z.number().min(1, { message: "HPは1以上で入力してください" }).max(100, { message: "HPは100以下で入力してください" }),
// });

export const petFormSchema = createInsertSchema(pets,{
    hp: z.number().min(1,"HPは1以上で入力してください" ).max(100,"HPは100以下で入力してください"),
    name: z.string().trim().min(1,"名前は必須です").max(50,"名前は50文字以内で入力してください"),
    type: z.enum(petType),
})
.omit({
    ownerID:true
});