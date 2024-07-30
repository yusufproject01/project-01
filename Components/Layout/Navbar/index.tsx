"use client";

import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation'; // Untuk melakukan navigasi programatik
import Loading from "@/app/loading";
import { auth } from "@/lib/firebase";

const playfirDisplay = Playfair_Display({ subsets: ["latin"] });

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter(); // Untuk melakukan navigasi programatik


  // Handle scroll position
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

  // Check user authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      <Loading/>
      // Optionally redirect user after sign out
      router.push('/auth/signin'); // Redirect to sign-in page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Handle Recipe menu click
  const handleRecipeClick = () => {
    if (!user) {
      alert('You need to be logged in to access the Recipe page.');
      router.push('/auth/signin'); // Redirect to sign-in page
    } else {
      router.push('/recipe');
    }
  };

  return (
    <section
      className={`w-full h-14 flex items-center justify-between px-14 fixed text-white z-50
      ${scrolled ? 'bg-primary shadow-lg transition-all ease-in-out' : 'bg-transparent'}`}
    >
      <Link href="/">
        <h1 className={`${playfirDisplay.className} text-4xl font-bold `}>
          FoodieShare
        </h1>
      </Link>
      <ul className="flex justify-between items-center text-base w-64 h-full">
        <li>
          <Link
            href="/"
            className={`hover:scale-105 hover:font-semibold
              hover:bg-white p-2 h-full flex items-center justify-center hover:text-primary transition-all ease-in-out`}
          >
            Home
          </Link>
        </li>
        <li>
          <button
            onClick={handleRecipeClick} // Handle click event
            className={`hover:scale-105 hover:font-semibold
              hover:bg-white p-2 h-full flex items-center justify-center hover:text-primary transition-all ease-in-out`}
          >
            Recipe
          </button>
        </li>
        {user ? (
          <>
            <li>
              <Link
                href="/profile"
                className={`hover:scale-105 hover:font-semibold
                  hover:bg-white p-2 h-full flex items-center justify-center hover:text-primary transition-all ease-in-out`}
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className={`hover:scale-105 hover:font-semibold
                  hover:bg-white p-2 h-full flex items-center justify-center hover:text-primary transition-all ease-in-out bg-red-500 text-white rounded`}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              href="/auth/signin"
              className={`hover:scale-105 hover:font-semibold
                hover:bg-white p-2 h-full flex items-center justify-center hover:text-primary transition-all ease-in-out`}
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
};

export default Navbar;
