import { Card,CardContent } from "./ui/card";
import { Pet } from "../types/pet";


export function PetCard({pet}: {pet: Pet}){
    return (
        <Card className='max-w-sm mx-auto'>
            <CardContent className= 'flex flex-col items-center gap-4 p-6'>
                <h1 className="text-muted font-bold">{pet.name}</h1>
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