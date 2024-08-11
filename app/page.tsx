"use client";

// React NextJs
import React, { useEffect, useState } from 'react';
// 
// Components
import Hero from "@/Components/HomeComp/Hero";
import Card from "@/Components/HomeComp/Card";
import Text from "@/Components/Text";
import Loading from './loading';
// 
// Libs
// import { Recipe } from "@/lib/inteface";
import { fetchDataCollectionLimit, RecipeHome } from "@/lib/api/fetchCollection";
import { monitoringAuthState } from '@/lib/Utils/monitoringAuthState';
import BgImage from '@/Components/BgImage';
import CardChef from '@/Components/BgImage/CardChef';

export default function Home() {
  const [userData, setUserData] = useState<RecipeHome[]>([]);
  const [userDataRecomend, setUserDataRecomend] = useState<RecipeHome[]>([]);
  const [loading, setLoading] = useState(true);
  const limitRecomend = 4;
  const limitCount = 6;

  useEffect(() => {
    async function fetchData() {
      const dataLimit = await fetchDataCollectionLimit(limitRecomend);
      setUserDataRecomend(dataLimit);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataCollectionLimit(limitCount);
      setUserData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  monitoringAuthState();

  return (
    <main className="w-full h-full max-w-7xl mx-auto">
      <section className="w-full flex justify-center mb-8">
        <Hero />
      </section>
      <div className="w-full flex flex-col items-center">
        <Text.Title text="Best Recipe Recommendation" />
        <Text.SubTitle text="Jelajahi, Bagikan, dan Nikmati Setiap Suapan" />
      </div>
      <section className="w-full h-auto grid grid-cols-4 justify-items-center pt-6">
        {userDataRecomend.map((foodie) => (
          <Card.Oval
            id={foodie.id}
            key={foodie.id}
            src={foodie.images[0]}
            title={foodie.nama_makanan}
            desc={foodie.description}
            href={`/recipes/${foodie.id}`}
          />
        ))}
      </section>
      <section className="my-12 w-full h-96 pt-4">
        <BgImage src="/assets/hero/hero3.jpg" title="The Most Popular Chef Share Recipe" alt="Chef">
          <CardChef href="/" src="/assets/chef/chef1.png" nameChef="Michael Jack S." position="Head Chef" resto=" Bistrot Instinct Restaurant" />
          <CardChef href="/" src="/assets/chef/chef2.png" nameChef="Sintya Cheng Lau" position="Head Chef" resto="Vong Kitchen Restaurant" />
          <CardChef href="/" src="/assets/chef/chef3.png" nameChef="Jack Sulivan" position="Head Chef" resto=" Bistro Chez Restaurant" />
          <CardChef href="/" src="/assets/chef/chef4.png" nameChef="Monalisa" position="Head Chef" resto=" Boutary Restaurant" />
        </BgImage>
      </section>
      <div className='pt-14 flex flex-col items-center justify-center w-full '>
        <div className='w-full flex flex-col items-center'>
          <Text.Title text="Mau Masak Apa Hari Ini?" />
        </div>
        <section className="max-w-7xl w-full h-auto flex justify-center mt-10 rounded-lg">
          <div className="w-full grid grid-cols-2 justify-items-center gap-4 py-6">
            {userData.map((data) => (
              <Card.Simple
                id={data.id}
                key={data.id}
                src={data.images[0]}
                title={data.nama_makanan}
                desc={data.description}
                href={`/recipes/${data.id}`}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
