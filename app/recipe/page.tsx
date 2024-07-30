"use client";

// React NextJs
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// 
// Componets
import Loading from "@/app/loading";
// 
// Libs
import { FoodiesProps } from "@/lib/inteface";
import { fetchDataCollection } from "@/lib/api/fetchCollection";
// 


const Page = () => {


  // State untuk menyimpan data dan status loading
  const [userData, setUserData] = useState<FoodiesProps[]>([]);
  const [loading, setLoading] = useState(true);
  // 

  // Mengolah Data yang disimpan untuk ditampilkan/maping
  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataCollection();
      setUserData(data);
      setLoading(false);
    }
    fetchData();
  }, []);
  if (loading) {
    return <Loading />; // Tampilkan komponen Loading saat data sedang dimuat
  }
  // 

  return (
    <main className="w-full flex flex-col justify-center items-center">
      <section className="w-full h-16 flex justify-center items-end pb-2 shadow-sm rounded-lg bg-primary">
        {/* <h1 className="text-4xl font-bold text-white italic">Recipe</h1> */}
      </section>
      <section className="max-w-7xl w-full h-auto flex justify-center mt-10 rounded-lg">
        <div className="w-full grid grid-cols-2 justify-items-center gap-4 py-6">
          {/* Render data di sini */}
          {userData.map((data) => (
            <Link href={`/recipe/${data.id}`} key={data.id} className="max-w-xl w-full h-56 bg-card flex items-center py-4 px-4 
            gap-6 rounded-md hover:brightness-90 shadow-2xl">
              <div className="w-56 h-full">
                <Image
                  src={data.image}
                  alt="Oval"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full rounded-lg" />
              </div>
              <div className="flex flex-col justify-start w-72 h-full gap-2">
                <h1 className="text-xl font-bold">{data.nama_makanan}</h1>
                <h1>chef</h1>
                <h1>{data.deskripsi}</h1>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Page;
