import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs, limit, query } from "firebase/firestore";
import { FoodiesProps } from "../../inteface";

// Fecth data Collection from Firestore
export async function fetchDataCollection(): Promise<FoodiesProps[]> {
    const q = query(collection(db, "Foodies"),);
    const querySnapshot = await getDocs(q);
    const data: FoodiesProps[] = [];
    querySnapshot.forEach((doc) => {
        const docData = doc.data();
        data.push({
            id: doc.id,
            nama_makanan: docData.nama_makanan,
            deskripsi: docData.deskripsi,
            image: docData.image,
        });
    });
    return data;
}

export const fetchDataCollectionID = async (id: string): Promise<FoodiesProps | null> => {
    try {
        const docRef = doc(db, "Foodies", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const docData = docSnap.data();
            return {
                id: docSnap.id,
                nama_makanan: docData.nama_makanan,
                deskripsi: docData.deskripsi,
                image: docData.image,
            };
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        throw new Error("Failed to fetch data");
    }
};

export async function fetchDataCollectionLimit(limitRecomend: number): Promise<FoodiesProps[]> {
    const q = query(collection(db, "Foodies"), limit(limitRecomend));
    const querySnapshot = await getDocs(q);
    const data: FoodiesProps[] = [];
    querySnapshot.forEach((doc) => {
        const docData = doc.data();
        data.push({
            id: doc.id,
            nama_makanan: docData.nama_makanan,
            deskripsi: docData.deskripsi,
            image: docData.image,
        });
    });
    return data;
}
