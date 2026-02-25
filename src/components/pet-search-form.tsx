"use client";
import { debounce, useQueryState } from "nuqs";
import { z } from "zod";
import { Input } from "./ui/input";

const searchSchema = z.object({
  name: z.string().optional(),
});

export default function PetSearchForm() {
  const [name, setName] = useQueryState("name", {
    defaultValue: "",
    shallow: false,
  });
  return (
    <Input
      type="text"
      value={name}
      onChange={(e) =>
        setName(e.target.value, {
          limitUrlUpdates: e.target.value === "" ? undefined : debounce(500),
        })
      }
    />
  );
}
