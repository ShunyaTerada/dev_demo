import { Card,CardContent } from "./ui/card";
import { Pet } from "../types/pet";


export function PetCard({pet}: {pet: Pet}){
    return (
        <Card >
            <CardContent>
                <h1 className="text-black font-bold">{pet.name}</h1>
                <p className="text-muted-foreground text-sm break-all">
                    {pet.type}
                </p>
                <p className="text-muted-foreground text-sm break-all">
                    {pet.hp}
                </p>

            </CardContent>
        </Card>
    );
}