'use client';
import { useQueryState } from 'nuqs';
import { z } from 'zod';
import { Input } from './ui/input';

const searchSchema = z.object({
    name: z.string().optional(),
})

export default function PetSearchForm() {
    const [name, setName] = useQueryState('name', {
        defaultValue: '',
    })
    return (
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    );
}