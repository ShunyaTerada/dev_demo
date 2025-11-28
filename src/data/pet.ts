import 'server-only';
import { db } from '../db';
import { eq, and, ilike } from 'drizzle-orm';
import { verifySession } from '@/lib/session';
import { pets } from '../db/schema/pet';

export const getPets = async () => {
    return db.query.pets.findMany({
        columns: {
            id: true,
            name: true,
            type: true,
            ownerID: true,
            hp: true,
        }
    })
};

export const getPet = async (id: string) => {
    return db.query.pets.findFirst(
        { where: (pets) => eq(pets.id, id) })
};

export const searchPets = async (name: string) => {
    return db.query.pets.findMany(
        { where: (pets) => ilike(pets.name, `%${name}%`) })
};

export const isPetOwner = async (petId: string) => {
    const session = await verifySession()
    const ownerId = session?.user.id;

    const pet = await db.query.pets.findFirst({
        where: and(eq(pets.id, petId), eq(pets.ownerID, ownerId))
    })

    return pet !== undefined;
};