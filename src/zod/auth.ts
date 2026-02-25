import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "名前は必須です")
      .max(50, "名前は50文字以内で入力してください"),
    email: z.string().email("有効なメールアドレスを入力してください"),
    password: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください")
      .max(100, "パスワードは100文字以内で入力してください"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof RegisterSchema>;
