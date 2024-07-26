"use client";

import React, { useEffect, useState } from 'react';
import Hero from "@/Components/Hero";
import Card from "@/Components/HomeComp/Card";
import Text from "@/Components/Text";
import { db } from "@/lib/firebase";
import BgImage from "@/Components/BgImage";
import CardChef from "@/Components/BgImage/CardChef";
import { collection, getDocs, limit, query } from 'firebase/firestore';
import Loading from '../Components/loading';

interface Foodies {
  id: string;
  nama_makanan: string;
  deskripsi: string;
  image: string;
}

// fetch data from firestore and set state  
async function fetchDataFromFirestore(limitCount: number): Promise<Foodies[]> {
  const q = query(collection(db, "Foodies"), limit(limitCount));
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

export default function Home() {
  const [userData, setUserData] = useState<Foodies[]>([]);
  const [loading, setLoading] = useState(true); // State untuk loading
  const limitCount = 4; // Set limit here

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore(limitCount);
      setUserData(data);
      setLoading(false); // Set loading ke false setelah data di-fetch
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading/>; // Tampilkan komponen Loading saat data sedang dimuat
  }

  return (
    <main className="w-full ">
      {/* Hero Section */}
      <section className="w-full flex justify-center mb-8">
        <Hero />
      </section>
      {/* Hero Section */}
      {/* Recipe Card Section */}
      <div className="w-full flex flex-col items-center">
        <Text.Title text="Best Recipe Recommendation" />
        <Text.SubTitle text="Jelajahi, Bagikan, dan Nikmati Setiap Suapan" />
      </div>
      <section className="w-full h-auto grid grid-cols-4 justify-items-center pt-6">
        {userData.map((foodie) => (
          <Card.Oval
            key={foodie.id}
            src={foodie.image}
            title={foodie.nama_makanan}
            desc={foodie.deskripsi}
            href={'/'}
          />
        ))}
      </section>
      {/* Recipe Card Section */}
      {/* The Most Popular Chef Share Recipe section  */}
      <section className="my-16 w-full h-96 pt-4">
        <BgImage src="/assets/hero3.jpg" title="The Most Popular Chef Share Recipe" alt="Chef">
          <CardChef href="/" src="/assets/chef/chef1.png" nameChef="Michael Jack S." position="Head Chef" resto=" Bistrot Instinct Restaurant" />
          <CardChef href="/" src="/assets/chef/chef2.png" nameChef="Sintya Cheng Lau" position="Head Chef" resto="Vong Kitchen Restaurant" />
          <CardChef href="/" src="/assets/chef/chef3.png" nameChef="Jack Sulivan" position="Head Chef" resto=" Bistro Chez Restaurant" />
          <CardChef href="/" src="/assets/chef/chef4.png" nameChef="Monalisa" position="Head Chef" resto=" Boutary Restaurant" />
        </BgImage>
      </section>
      {/* The Popular Chef and User  section  */}
    </main>
  );
}
