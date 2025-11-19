'use server';

import { db } from '@/db';
import { PetFormSchema } from '@/zod/pet';
import { pets } from '../db/schema/pet';
import { PetFormData } from '@/types/pet';
import { verifySession } from '../lib/session';

export async function createPet(formData: PetFormData){
    const data = PetFormSchema.parse(formData);

    const session = await verifySession();
    const ownerID = session.user.id;

    await db.insert(pets).values({...data, ownerID}); 
}