"use client";

import { Montserrat, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });
const playfirDisplay = Playfair_Display({ subsets: ["latin"] });

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 
  const [active, setActive] = useState<string>('');

  const handleSetActive = (option: string) => {
    setActive(option);
  };

  return (
    <section className={`w-full h-14 flex items-center justify-between px-14 fixed text-white z-50
    ${scrolled ? 'bg-primary shadow-lg' : 'bg-transparent'}`}>
      <Link href="/">
        <h1 className={`${playfirDisplay.className} text-4xl font-bold`}>NavBrand</h1>
      </Link>
      <ul className="flex justify-between items-center text-base w-64 h-full">
        <Link
          href="/"
          className={`hover:scale-105 hover:font-semibold
            ${active === '/' ? ' text-white' : 'text-white'
            } hover:bg-white p-2 h-full flex items-center justify-center hover:text-primary`}
          onClick={() => handleSetActive('/')}>
          Home
        </Link>
        <Link
          href="/"
          className={`hover:scale-105 hover:font-semibold
            ${active === '/' ? ' text-white' : 'text-white'
            } hover:bg-white p-2 h-full flex items-center justify-center hover:text-primary`}
          onClick={() => handleSetActive('/')}>
          Recipe
        </Link>
        <Link
          href="/"
          className={`hover:scale-105 hover:font-semibold
            ${active === '/' ? ' text-white' : 'text-white'
            } hover:bg-white p-2 h-full flex items-center justify-center hover:text-primary`}
          onClick={() => handleSetActive('/')}>
          Login
        </Link>
      </ul>
    </section>
  );
};

export default Navbar;
