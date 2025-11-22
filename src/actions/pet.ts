'use server';

import { db } from '@/db';
import { PetFormSchema } from '@/zod/pet';
import { pets } from '@/db/schema/pet';
import { verifySession } from '@/lib/session';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

export async function createPet(formData: z.infer<typeof PetFormSchema>) {
    try {
        const data = PetFormSchema.parse(formData);
        const session = await verifySession();
        const ownerID = session.user.id;

        await db.insert(pets).values({ ...data, ownerID });
    } catch (error) {
        console.error('Error creating pet:', error);
        throw error;
    }
}

export async function updatePet(id: string, formData: z.infer<typeof PetFormSchema>) {
    const data = PetFormSchema.parse(formData);
    const session = await verifySession();
    const ownerID = session.user.id;

    await db
        .update(pets)
        .set({ ...data, ownerID })
        .where(and(eq(pets.id, id), eq(pets.ownerID, ownerID)));
}

export async function deletePet(id: string) {
    const session = await verifySession();
    const ownerID = session.user.id;

    await db
        .delete(pets)
        .where(and(eq(pets.id, id), eq(pets.ownerID, ownerID)));
}       