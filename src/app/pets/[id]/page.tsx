import { getPet } from "@/data/pet";
import { redirect } from "next/navigation";
import PetCard from "@/components/pet-card";
import PetForm from "@/components/pet-form";
import DeletePetButton from "@/components/delete-pet-button";

export default async function PetPage({ params }: PageProps<'/pets/[id]'>) {
    const petId = (await params).id;
    const pet = await getPet(petId);

    if (!pet) {
        redirect('/pets');
    }

    return (
        <div className="container flex justify-center items-center flex-col gap-8">
            <PetCard pet={pet} />
            <PetForm defaultValues={pet} />
            <DeletePetButton petId={pet.id} />
        </div >
    );
}