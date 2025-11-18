import { Pet } from "@/types/pet";
import { PetCard } from "@/components/pet-card";

export default function PetsPage(){
    const mockPets: Pet[] = [
        {id: "1", name: "ポチ", type: "dog", hp: 80, ownerID: "owner1"},
        {id: "2", name: "ミケ", type: "cat", hp: 60, ownerID: "owner2"},
        {id: "3", name: "タロ", type: "dog", hp: 95, ownerID: "owner1"},
        {id: "4", name: "シロ", type: "cat", hp: 75, ownerID: "owner3"}
    ];

    return (
        <div className="container mx-auto py-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">ペット一覧</h1>
                <p className="text-gray-600">{mockPets.length}匹のペット</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockPets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} />
                ))}
            </div>

            {mockPets.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🐾</div>
                    <h2 className="text-xl font-semibold text-gray-600 mb-2">
                        ペットがいません
                    </h2>
                    <p className="text-gray-500">
                        最初のペットを追加してみましょう！
                    </p>
                </div>
            )}
        </div>
    )
}