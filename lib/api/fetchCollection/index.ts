import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs, limit, query } from "firebase/firestore";
import { FoodiesProps } from "../../inteface";

export interface RecipeHome {
    id: string;
    nama_makanan: string;
    description: string;
    images: string[];
    userId: string;
    userName: string;
    // Tambahkan properti lain jika ada
}

// Fecth data Collection from Firestore
export async function fetchDataCollection(): Promise<RecipeHome[]> {
    try {
        const recipeCollection = collection(db, "recipes");
        const recipeSnapshot = await getDocs(recipeCollection);
        const recipes = recipeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as RecipeHome[];

        // Fetch user names for each recipe
        const recipesWithUserNames = await Promise.all(recipes.map(async recipe => {
            const userName = await fetchUserName(recipe.userId);
            return { ...recipe, chefName: userName || "Unknown" }; // Add chefName to recipe
        }));

        return recipesWithUserNames;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
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
                ingredients: docData.ingredients,
                instructions: docData.instructions,
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

// Tipe data untuk Recipe



export async function fetchDataCollectionLimit(limitCount: number): Promise<RecipeHome[]> {
    const q = query(collection(db, "recipes"), limit(limitCount));
    const querySnapshot = await getDocs(q);
    const recipes: RecipeHome[] = [];
    querySnapshot.forEach((doc) => {
        recipes.push({ id: doc.id, ...doc.data() } as RecipeHome);
    });
    return recipes;
}

// lib/api/fetchCollection.ts
interface RecipeData {
    nama_makanan: string;
    image: string[]; // Periksa bahwa ini adalah array string
    deskripsi: string;
    ingredients: { amount: string; unit: string; name: string }[];
    instructions: string;
    userId: string;
}

export interface Recipe {
    nama_makanan: string;
    images: string[]; // Array string untuk menyimpan URL gambar
    description: string;
    ingredients: { amount: string; unit: string; name: string }[];
    instructions: string;
    userId: string;
}




export interface UserData {
    name: string;
}

// Fungsi fetchDataCollectionID2 yang sesuai dengan tipe RecipeData
export const fetchDataCollectionID2 = async (id: string): Promise<Recipe | null> => {
    try {
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            // Asumsi bahwa data memiliki struktur yang sesuai dengan Recipe
            const recipe: Recipe = {
                nama_makanan: data?.nama_makanan || "",
                images: data?.images || [],
                description: data?.description || "",
                ingredients: data?.ingredients || [],
                instructions: data?.instructions || "",
                userId: data?.userId || "",
            };

            return recipe;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        return null;
    }
};




export async function fetchUserData(userId: string): Promise<UserData> {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
        return userDocSnap.data() as UserData; // Cast to UserData
    } else {
        throw new Error("User not found");
    }
}


export async function fetchUserName(name: string): Promise<string | null> {
    try {
        const userDoc = doc(db, "users", name); // Pastikan koleksi pengguna dinamai "users"
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            return userData.name || null; // Kembalikan nama pengguna
        } else {
            return null; // Pengguna tidak ditemukan
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}