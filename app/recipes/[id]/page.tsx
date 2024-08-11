"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchDataCollectionID2, fetchUserData } from "@/lib/api/fetchCollection";
import Loading from '@/app/loading';

interface Recipe {
    nama_makanan: string;
    images: string[];
    description: string;
    ingredients: { amount: string; unit: string; name: string }[];
    instructions: string;
    userId: string;
}

interface UserData {
    name: string;
}

interface PageProps {
    params: {
        id: string;
    };
}

const Page = ({ params }: PageProps) => {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [chef, setChef] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            try {
                const recipeData = await fetchDataCollectionID2(params.id);

                if (recipeData) {
                    setRecipe(recipeData);
                } else {
                    setError('No data found');
                }

                if (recipeData && recipeData.userId) {
                    const userData = await fetchUserData(recipeData.userId);
                    setChef(userData);
                }
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [params.id]);

    if (loading) return <div><Loading /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className='w-full h-auto flex flex-col justify-center items-center py-20'>
            {recipe ? (
                <div className='flex flex-col max-w-5xl w-full rounded-xl shadow-lg bg-white px-12 py-10 gap-6'>
                    <div className="">
                        <h1 className='text-3xl font-bold w-full text-center'>{recipe.nama_makanan}</h1>
                        <h2 className='text-lg font-semibold w-full text-center'>
                            Chef: {' '}
                            <Link href={`/profile/${recipe.userId}`} className='text-primary font-semibold hover:brightness-90'>
                                {chef?.name || 'Unknown'}
                            </Link>
                        </h2>
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <div className='max-w-2xl w-full h-80 rounded-lg overflow-hidden'>
                            {recipe.images.length > 0 ? (
                                <Image
                                    src={recipe.images[0]}  // Display the first image from the array
                                    alt={recipe.nama_makanan}
                                    width={600}
                                    height={600}
                                    className='w-full h-full object-cover' />
                            ) : (
                                <Image
                                    src='/assets/default/noImage.jpg'  // Default image if no images are available
                                    alt='No Image'
                                    width={600}
                                    height={600}
                                    className='w-full h-full object-cover' />
                            )}
                        </div>
                    </div>
                    <article className='text-justify'>
                        {recipe.description}
                    </article>
                    <article className='text-justify gap-4 flex flex-col h-screen'>
                        <div>
                            <h3 className='text-xl font-semibold'>Bahan-bahan :</h3>
                            <ul>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className='text-xl font-semibold'>Langkah pembuatan :</h3>
                            <p>{recipe.instructions}</p>
                        </div>
                    </article>
                    <button
                        onClick={() => router.back()}
                        className='w-36 h-10 bg-slate-400 text-white p-2 rounded text-center'
                    >
                        Kembali
                    </button>
                </div>
            ) : (
                <div>No data found</div>
            )}
        </section>
    );
};

export default Page;
