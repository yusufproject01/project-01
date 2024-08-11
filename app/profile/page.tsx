"use client"

import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, where, orderBy, deleteDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../loading";
import Link from "next/link";
import CardProfile from "@/Components/ProfileComp/Card/CardProfieComp";

interface UserData {
    name: string;
    email: string;
    image: string;
}

interface Recipe {
    nama_makanan: string;
    ingredients: { amount: string; unit: string; name: string }[];
    instructions: string;
    images: string[];
    description: string;
    userId: string;
    id: string;
    createdAt: Timestamp; // Tipe data untuk timestamp Firestore
}

const ProfilePage = () => {
    const [user, setUser] = useState<any>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);

                try {
                    const userDocRef = doc(collection(db, "users"), user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const data = userDocSnap.data() as UserData;
                        setUserData(data);
                        setImagePreview(data.image || null);
                    } else {
                        console.log("No user data found");
                    }

                    // Fetch recipes for the user with indexing and sorting
                    const recipesQuery = query(
                        collection(db, "recipes"),
                        where("userId", "==", user.uid),
                        orderBy("createdAt", "desc")
                    );
                    const recipesSnapshot = await getDocs(recipesQuery);
                    const recipesData: Recipe[] = [];
                    recipesSnapshot.forEach((doc) => {
                        const data = doc.data() as Omit<Recipe, 'id'>;
                        recipesData.push({ ...data, id: doc.id });
                    });
                    setRecipes(recipesData);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setUser(null);
                setUserData(null);
                setImagePreview(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, "recipes", id));
            setRecipes(recipes.filter(recipe => recipe.id !== id));
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };

    if (loading) {
        return <div><Loading /></div>;
    }

    return (
        <div className="h-auto w-full pt-20">
            {user ? (
                <div>
                    {userData ? (
                        <div className="mx-9">
                            <div className="mb-6">
                                <div className="max-w-7xl w-full h-96 relative overflow-hidden rounded mx-auto">
                                    <Image src="/assets/hero/hero.jpg" alt="hero" width={600} height={600} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute w-full flex bottom-44 left-14 gap-6">
                                    <div className="bg-slate-300 w-52 h-52 rounded overflow-hidden group">
                                        <Image
                                            src={imagePreview || userData.image || '/assets/default/noImage.jpg'}
                                            alt="Profile"
                                            width={200}
                                            height={200}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="mt-10">
                                            <p className="text-5xl text-white font-bold capitalize">{userData.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p><Loading /></p>
                    )}
                </div>
            ) : (
                <p>No user is logged in</p>
            )}
            <section className="w-full h-auto gap-4 my-6 ml-9 flex flex-col justify-center">
                <Link
                    href={'/profile/editprofile'}
                    className="bg-slate-400 text-white p-2 rounded w-36 h-10"
                >
                    Change Profile
                </Link>
                <Link href={'/profile/addrecipe'} className="w-36 h-10 bg-slate-400 text-white p-2 rounded text-center">Add Recipe</Link>
            </section>
            <section className="mx-9 grid grid-cols-4 gap-4">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe.id} className="relative">
                            <CardProfile
                                href={`/recipes/${recipe.id}`}
                                src={recipe.images[0] || '/assets/default/noImage.jpg'}
                                foodname={recipe.nama_makanan}
                                deskripsi={recipe.description}
                            />
                            <button
                                onClick={() => handleDelete(recipe.id)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
            </section>
        </div>
    );
};

export default ProfilePage;
