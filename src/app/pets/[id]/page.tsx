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
        <div className="container flex justify-center items-center flex-col gap-8">
            <PetCard pet={pet} />
            <PetForm defaultValues={pet} />
        </div>
    );
}