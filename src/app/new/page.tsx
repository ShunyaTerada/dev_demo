import { Metadata } from 'next';
import PetForm from '@/components/pet-form';

export const metadata: Metadata = {
    title: "新規ペット登録",
}

export default function NewPage() {
    return (<>

        <PetForm/>
    
    </>);
}
