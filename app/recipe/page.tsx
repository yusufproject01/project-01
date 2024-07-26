"use client";

import Loading from "@/Components/loading";
import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Interface untuk data Foodies
interface Foodies {
  id: string;
  nama_makanan: string;
  deskripsi: string;
  image: string;
}

// Fungsi untuk fetch data dari Firestore
async function fetchDataFromFirestore(): Promise<Foodies[]> {
  const q = query(collection(db, "Foodies"));
  const querySnapshot = await getDocs(q);
  const data: Foodies[] = [];
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

const Page = () => {
  // State untuk menyimpan data dan status loading
  const [userData, setUserData] = useState<Foodies[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="w-full flex flex-col ">
      <section className="w-full h-32 flex justify-center items-end pb-2 shadow-sm rounded-xl bg-primary">
        <h1 className="text-4xl font-bold text-white italic">Recipe</h1>
      </section>
      <section className="w-full flex justify-center">
        <div className="max-w-7xl w-full h-auto bg-slate-300 mt-14 shadow-lg rounded-lg 
        grid grid-cols-2 justify-items-center gap-4 py-6">
          {/* Render data di sini */}
          {userData.map((data) => (
            <Link href={`/`} className="max-w-xl w-full h-56 bg-card flex items-center py-4 px-4 
            gap-6 rounded-md hover:brightness-90 shadow-xl">
              <div className="w-1/3 h-full">
                <Image
                  src={data.image}
                  alt="Oval"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full" />
              </div>
              <div className="flex flex-col">
                <h1>judul makanan</h1>
                <h1>chef</h1>
                <h1>deskripsi</h1>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Page;
