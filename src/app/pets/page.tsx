import { PetCard } from "@/components/pet-card";
import { getPets } from "@/data/pet";


export default async function PetsPage() {
    const pets = await getPets();

    return (
        <div className="container mx-auto py-8 space-y-6">
            <div className="flex justify-between items-center space-x-4 mx-8">
                <h1 className="text-3xl font-bold">ペット一覧</h1>
                <p className="text-gray-600">{pets.length}匹のペット</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-8">
                {pets.map((pet) => (
                    <PetCard key={pet.id} pet={{ ...pet, hp: pet.hp }} />
                ))}
            </div>

            {pets.length === 0 && (
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