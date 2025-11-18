import { Pet } from "@/types/pet";
import { PetCard } from "@/components/pet-card";


export default function PetsPage(){
    const mockPets: Pet[] = [
        {id: "1", name: "Fido", type: "dog", hp: 80, ownerID: "owner1"},
        {id: "2", name: "Whiskers", type: "cat", hp: 60, ownerID: "owner2"},]
    ;
    return (
        <div className='container mx-auto p-10'>
        <h1 className="text-2xl font-bold mb-4">ペット一覧</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3  gap-4 font-bold text-black">
                {mockPets.map((pet)=>(
                    <div key={pet.id}>
                <PetCard pet={pet} />
                    </div>
                ))}
            </div>
        </div>
    )
}