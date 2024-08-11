"use client";

import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation'; // Untuk melakukan navigasi programatik
import { auth } from "@/lib/firebase";
import Loading from "@/app/loading";

const playfirDisplay = Playfair_Display({ subsets: ["latin"] });

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false); // State untuk loading
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

  // Handle Signout
  const handleSignOut = async () => {
    setLoading(true); // Set loading state to true
    try {
      await signOut(auth);
      router.push('/auth/signin'); // Redirect to sign-in page after sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // Handle Recipe menu click
  const handleRecipeClick = () => {
    if (!user) {
      alert('You need to be logged in to access the Recipe page.');
      router.push('/auth/signin'); // Redirect to sign-in page
    } else {
      router.push('/recipes');
    }
  };

  return (
    <>
      {loading && <Loading />} {/* Tampilkan loading jika dalam proses logout */}
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
                hover:bg-white p-2 h-full flex items-center justify-center hover:text-primary transition-all ease-in-out rounded`}
            >
              Home
            </Link>
          </li>
          <li>
            <button
              onClick={handleRecipeClick} // Handle click event
              className={`hover:scale-105 hover:font-semibold
                hover:bg-white p-2 h-full flex items-center justify-center hover:text-primary transition-all ease-in-out rounded`}
            >
              Recipes
            </button>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  href="/profile"
                  className={`hover:scale-105 hover:font-semibold
                    hover:bg-white p-2 h-full flex items-center justify-center hover:text-primary transition-all ease-in-out rounded`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className={`hover:scale-105 hover:font-semibold
                    hover:bg-white p-2 h-full flex items-center justify-center hover:text-primary transition-all ease-in-out text-white rounded`}
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
    </>
  );
};

export default Navbar;
