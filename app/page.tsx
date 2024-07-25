import Hero from "@/Components/Hero";
import Card from "@/Components/HomeComp/Card";
import Text from "@/Components/Text";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
        <Card.Oval
          src="/assets/hero.jpg"
          title="Nasgor"
          desc="Nasi Goreng lezat dengan resep seperti masakan nenek."
          href="/"
        />
        <Card.Oval
          src="/assets/hero.jpg"
          title="Nasgor"
          desc="Nasi Goreng lezat dengan resep seperti masakan nenek."
          href="/"
        />
        <Card.Oval
          src="/assets/hero.jpg"
          title="Nasgor"
          desc="Nasi Goreng lezat dengan resep seperti masakan nenek."
          href="/"
        />
      </div>
    </div>
  );
}
