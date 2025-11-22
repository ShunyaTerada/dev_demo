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