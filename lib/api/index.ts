import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface Foodies {
    id: string;
    nama_makanan: string;
    deskripsi: string;
    image: string;
}

export const getRecipes = async (): Promise<Foodies[]> => {
    const querySnapshot = await getDocs(collection(db, 'Foodies'));
    const foodies: Foodies[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            nama_makanan: data.nama_makanan,
            deskripsi: data.deskripsi,
            image: data.image
        };
    });
    return foodies;
};
