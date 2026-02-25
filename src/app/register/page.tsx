import { Metadata } from "next";
import RegisterForm from "@/components/register-form/register-form";

export const metadata: Metadata = {
  title: "新規登録",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
