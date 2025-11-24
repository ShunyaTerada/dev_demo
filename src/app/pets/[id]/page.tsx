import { getPet } from "@/data/pet";
import { notFound } from "next/navigation";
import PetCard from "@/components/pet-card";
import PetForm from "@/components/pet-form";

export default async function PetPage({ params }: PageProps<'/pets/[id]'>) {
    const petId = (await params).id;
    const pet = await getPet(petId);

    if (!pet) {
        notFound();
    }

    return (
        <div>
            <PetCard pet={pet} />
            <PetForm pet={pet} />
        </div>
    );
}