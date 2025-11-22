import { Card, CardContent } from "./ui/card";
import { Pet } from "../types/pet";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

export function PetCard({ pet }: { pet: Pet }) {
    const typeLabels: Record<string, string> = {
        dog: "犬",
        cat: "猫",
    };

    return (
        <Card className="w-full max-w-[200px]">
            <CardContent>
                <h1 className="text-black font-bold">{pet.name}</h1>
                <Badge variant="secondary" className="mt-1">
                    {typeLabels[pet.type]}
                </Badge>
                <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>HP</span>
                        <span>{pet.hp}/100</span>
                    </div>
                    <Progress
                        value={pet.hp}
                        className={`h-2 ${pet.hp > 50
                            ? "[&>[data-slot=progress-indicator]]:bg-green-500"
                            : pet.hp > 20
                                ? "[&>[data-slot=progress-indicator]]:bg-yellow-500"
                                : "[&>[data-slot=progress-indicator]]:bg-red-500"
                            }`}
                    />
                </div>
            </CardContent>
        </Card>
    );
}