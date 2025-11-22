import 'server-only';
import { db } from '../db';
import { eq } from 'drizzle-orm';


export const getPets = async () => {
    return db.query.pets.findMany({
        with: {
            owners: true
        },
        columns: {
            id: true,
            name: true,
            type: true,
            ownerID: true,
        }
    })
};

export const getPet = async (id: string) => {
    return db.query.pets.findFirst(
        { where: (pets) => eq(pets.id, id), with: { owners: true } })
};