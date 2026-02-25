"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { PetFormSchema } from "@/zod/pet";
import { PetFormData } from "@/types/pet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createPet, updatePet } from "@/actions/pet";
import { toast } from "sonner";
import { Pet } from "@/types/pet";

export default function PetForm({ defaultValues }: { defaultValues?: Pet }) {
  const router = useRouter();
  const form = useForm<PetFormData>({
    resolver: zodResolver(PetFormSchema),
    defaultValues: defaultValues ?? {
      name: "",
      type: undefined,
      hp: 50,
    },
  });

  const onSubmit = async (data: PetFormData) => {
    try {
      if (defaultValues) {
        await updatePet(defaultValues.id, data);
      } else {
        await createPet(data);
        form.reset();
      }
      toast(`ペットの${defaultValues ? "更新" : "作成"}が完了しました！`, {
        description: `${data.name}を${defaultValues ? "更新" : "追加"}しました。`,
      });
      router.refresh();
      // 成功時のみペット一覧ページにリダイレクト
      router.push("/pets");
    } catch (error) {
      toast(`ペットの${defaultValues ? "更新" : "作成"}に失敗しました。`, {
        description:
          error instanceof Error
            ? error.message
            : "ペットの作成に失敗しました。",
      });
      console.error("Error creating pet:", error);
    }
  };

  const isSubmitting = form.formState.isSubmitting;
  return (
    <div className="container flex justify-center items-center max-w-3xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {defaultValues ? "ペット情報を編集" : "新規ペット登録"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>名前</FormLabel>
                    <FormControl>
                      <Input placeholder="ペットの名前を入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>種類</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="種類を選択" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dog">犬</SelectItem>
                        <SelectItem value="cat">猫</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HP</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={100}
                        placeholder="50"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {defaultValues ? "ペットを更新" : "ペットを追加"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
