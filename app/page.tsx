"use client";

// React NextJs
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
// 
// Components
import Hero from "@/Components/HomeComp/Hero";
import Card from "@/Components/HomeComp/Card";
import Text from "@/Components/Text";
import BgImage from "@/Components/BgImage";
import CardChef from "@/Components/BgImage/CardChef";
import Loading from './loading';
// 
// Libs
import { FoodiesProps } from "@/lib/inteface";
import { fetchDataCollectionLimit } from "@/lib/api/fetchCollection";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { monitoringAuthState } from '@/lib/Utils/monitoringAuthState';
import { useRouter } from 'next/router';
// 


export default function Home() {
  // State untuk menampung data dan loading
  const [userData, setUserData] = useState<FoodiesProps[]>([]);
  const [userDataRecomend, setUserDataRecomend] = useState<FoodiesProps[]>([]);
  const [loading, setLoading] = useState(true); // State untuk loading
  const limitRecomend = 4; // Set limit here
  const limitCount = 6; // Set limit here
  // 

  // Mengolah Data untuk Section Recomend
  useEffect(() => {
    async function fetchData() {
      const dataLimit = await fetchDataCollectionLimit(limitRecomend);
      setUserDataRecomend(dataLimit);
      setLoading(false); // Set loading ke false setelah data di-fetch
    }
    fetchData();
  }, []);
  // 

  // Mengolah Data untuk Section Recipe Home
  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataCollectionLimit(limitCount);
      setUserData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />; // Tampilkan komponen Loading saat data sedang dimuat
  }
  // 
  // 
  monitoringAuthState()

  return (
    <main className="w-full h-full max-w-7xl mx-auto">
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
        {userDataRecomend.map((foodie) => (
          <Card.Oval
            id={foodie.id}
            key={foodie.id}
            src={foodie.image}
            title={foodie.nama_makanan}
            desc={foodie.deskripsi}
            href={`/recipe/${foodie.id}`}
          />
        ))}
      </section>
      {/* Recipe Card Section */}
      {/* The Most Popular Chef Share Recipe section  */}
      <section className="my-12 w-full h-96 pt-4">
        <BgImage src="/assets/hero/hero3.jpg" title="The Most Popular Chef Share Recipe" alt="Chef">
          <CardChef href="/" src="/assets/chef/chef1.png" nameChef="Michael Jack S." position="Head Chef" resto=" Bistrot Instinct Restaurant" />
          <CardChef href="/" src="/assets/chef/chef2.png" nameChef="Sintya Cheng Lau" position="Head Chef" resto="Vong Kitchen Restaurant" />
          <CardChef href="/" src="/assets/chef/chef3.png" nameChef="Jack Sulivan" position="Head Chef" resto=" Bistro Chez Restaurant" />
          <CardChef href="/" src="/assets/chef/chef4.png" nameChef="Monalisa" position="Head Chef" resto=" Boutary Restaurant" />
        </BgImage>
      </section>
      {/* The Popular Chef and User  section  */}
      {/* semua makanan */}
      <div className='pt-14 flex flex-col items-center justify-center w-full '>
        <div className='w-full flex flex-col items-center'>
          <Text.Title text="Mau Masak Apa Hari Ini?" />
        </div>
        <section className="max-w-7xl w-full h-auto flex justify-center mt-10 rounded-lg">
          <div className="w-full grid grid-cols-2 justify-items-center gap-4 py-6">
            {/* Render data di sini */}
            {userData.map((data) => (
              <Card.Simple
                id={data.id}
                key={data.id}
                src={data.image}
                title={data.nama_makanan}
                desc={data.deskripsi}
                href={`/recipe/${data.id}`}
              />
            ))}
          </div>
        </section>
      </div>
      {/* semua makanan */}
    </main>
  );
}
