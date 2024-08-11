"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// 
// Components
import Loading from "@/app/loading";
// 
// Libs
import { fetchDataCollection, RecipeHome } from "@/lib/api/fetchCollection";
// 

const Page = () => {
  // State untuk menyimpan data dan status loading
  const [userData, setUserData] = useState<RecipeHome[]>([]);
  const [loading, setLoading] = useState(true);

  // Mengolah Data yang disimpan untuk ditampilkan/maping
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDataCollection();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />; // Tampilkan komponen Loading saat data sedang dimuat
  }

  return (
    <main className="w-full flex flex-col justify-center items-center">
      <section className="w-full h-16 flex justify-center items-end pb-2 shadow-sm rounded-lg bg-primary">
        {/* <h1 className="text-4xl font-bold text-white italic">Recipe</h1> */}
      </section>
      <section className="max-w-7xl w-full h-auto flex justify-center mt-10 rounded-lg">
        <div className="w-full grid grid-cols-2 justify-items-center gap-4 py-6">
          {/* Render data di sini */}
          {userData.map((recipe) => (
            <Link
              href={`/recipes/${recipe.id}`}
              key={recipe.id}
              className="max-w-xl w-full h-56 bg-card flex items-center py-4 px-4 gap-6 rounded-md hover:brightness-90 shadow-2xl"
            >
              <div className="w-56 h-full">
                <Image
                  src={recipe.images.length > 0 ? recipe.images[0] : '/assets/default/noImage.jpg'}
                  alt={recipe.nama_makanan}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-start w-72 h-full gap-2">
                <h1 className="text-xl font-bold">{recipe.nama_makanan}</h1>
                <p className="text-sm text-gray-600">Chef: {recipe.userName}</p> {/* Nama chef */}
                <p>{recipe.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Page;
