import { Pet } from "@/types/pet";
import { PetCard } from "@/components/pet-card";


export default function PetsPage(){
    const mockPets: Pet[] = [
        {id: "1", name: "Fido", type: "dog", hp: 80, ownerID: "owner1"},
        {id: "2", name: "Whiskers", type: "cat", hp: 60, ownerID: "owner2"},]
    ;
    return (
        <div>
        <h1>ペット一覧</h1>
        {mockPets.map((pet)=>
            <PetCard key={pet.id} pet={pet} />
        )}
        </div>
    )
}