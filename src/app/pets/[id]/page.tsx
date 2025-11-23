import { getPet } from "@/data/pet";
import { notFound } from "next/navigation";

export default async function PetPage({ params }: PageProps<'/pets/[id]'>) {
    const petId = (await params).id;
    const pet = await getPet(petId);

    if (!pet) {
        notFound();
    }

    return (
        <div>
            <h1>ペット詳細ページ</h1>
            <p>名前: {pet?.name}</p>
            <p>種類: {pet?.type}</p>
            <p>HP: {pet?.hp}</p>
        </div>
    );
}