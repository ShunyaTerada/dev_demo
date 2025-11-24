import { Card, CardContent, CardFooter } from "./ui/card";
import { Pet } from "../types/pet";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { PetType } from "../types/pet";
import { Button } from "./ui/button";
import Link from "next/link";

export default function PetCard({ pet }: { pet: Pet }) {

    const getPetTypeLabel = (type: PetType) => {
        const typeLabels: Record<PetType, string> = {
            dog: "犬",
            cat: "猫",
        }
        return typeLabels[type] || type;
    }
    return (

        <Card className="w-full max-w-[200px]">
            <CardContent>
                <h1 className="text-black font-bold">{pet.name}</h1>
                <Badge variant="secondary" className="mt-1">
                    {getPetTypeLabel(pet.type)}
                </Badge>
                <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>HP</span>
                        <span>{pet.hp}/100</span>
                    </div>
                    <Progress
                        value={pet.hp}
                        role="progressbar"
                        aria-roledescription="HP"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={pet.hp}
                        className={`h-2 ${pet.hp > 50
                            ? "[&>[data-slot=progress-indicator]]:bg-green-500"
                            : pet.hp > 20
                                ? "[&>[data-slot=progress-indicator]]:bg-yellow-500"
                                : "[&>[data-slot=progress-indicator]]:bg-red-500"
                            }`}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild>
                    <Link
                        href={`/pets/${pet.id}`}
                        className="w-full"
                    >
                        編集
                    </Link>
                </Button>

            </CardFooter>
        </Card>

    );
}