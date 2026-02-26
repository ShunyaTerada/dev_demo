import PetCard from "@/components/pet-card";
import { getPets, searchPets } from "@/data/pet";
import PetSearchForm from "@/components/pet-search-form";
import { createLoader, parseAsString } from "nuqs/server";
import Link from "next/link";

export const loadSearchParams = createLoader({
  name: parseAsString.withDefault(""),
});

export default async function PetsPage({ searchParams }: PageProps<"/pets">) {
  const { name } = await loadSearchParams(searchParams);
  const pets = name ? await searchPets(name) : await getPets();

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="mx-8">
        <h3 className="text-xl font-semibold mb-4">検索</h3>
        <PetSearchForm />
      </div>

      <div className="flex justify-between items-center space-x-4 mx-8">
        <div>
          <h1 className="text-3xl font-bold">ペット一覧</h1>
          <p className="text-gray-600 mt-1">{pets.length}匹のペット</p>
        </div>
        <Link
          href="/pets/new"
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white font-semibold px-6 py-3 text-sm hover:bg-blue-700 transition-colors shadow-md"
        >
          🐾 新規ペット追加
        </Link>
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
          <p className="text-gray-500">最初のペットを追加してみましょう！</p>
        </div>
      )}
    </div>
  );
}
