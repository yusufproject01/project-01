"use client";

import Hero from "@/Components/Hero";
import Card from "@/Components/HomeComp/Card";
import Text from "@/Components/Text";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";

interface Foodies {
  id: string;
  nama_makanan: string;
  deskripsi: string;
  image: string;
}

async function fetchDataFromFirestore(): Promise<Foodies[]> {
  const querySnapshot = await getDocs(collection(db, "Foodies"));
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

export default function Home() {
  const [userData, setUserData] = useState<Foodies[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full px-10 ">
      <div className="w-full flex justify-center mb-8">
        <Hero />
      </div>
      <div className="w-full flex flex-col items-center">
        <Text.Title text="Best Recipe Recommendation" />
        <Text.SubTitle text="Jelajahi, Bagikan, dan Nikmati Setiap Suapan" />
      </div>
      <div className="w-full h-auto pt-6 grid grid-cols-3 justify-items-center">
        {userData.map((foodie) => (
          <Card.Oval
            key={foodie.id}
            src={foodie.image}
            title={foodie.nama_makanan}
            desc={foodie.deskripsi}
            href={'/'}
          />
        ))}
      </div>
      <section className="my-16">
        <div className="">
          <div className="absolute z-20 pl-12 h-screen w-80 flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold text-white">Test</h1>
          </div>
          <div className=" max-w-2xl w-full h-screen bg-primary rounded-full relative -left-80" />
        </div>
      </section>
    </div>
  );
}
