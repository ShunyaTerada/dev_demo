'use client'

import { Button } from "@/components/ui/button";
import { deletePet } from "@/actions/pet";
import { useRouter } from "next/navigation";

export default function DeletePetButton({ petId }: { petId: string }) {
    const router = useRouter();
    return (
        <Button
            onClick={() => {
                deletePet(petId);
                router.refresh()
            }}
            className="bg-red-500 text-white px-4 py-2 rounded">
            ペットを削除
        </Button>
    );
}
