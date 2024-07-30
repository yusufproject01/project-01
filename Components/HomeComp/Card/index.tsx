"use client";

import Loading from "@/app/loading";
import { auth } from "@/lib/firebase";
import { CardFoodProps, FoodiesProps } from "@/lib/inteface";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Card({ children }: any) {
    return (
        <div>
            {children}
        </div>
    );
}

function Oval({ src, title, desc, href, id }: CardFoodProps) {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    // Check user authentication status
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);
    // 

    const handleRecipeClick = () => {
        if (!user) {
            alert('You need to be logged in to access the Recipe page.');
            <Loading />
            router.push('/auth/signin'); // Redirect to sign-in page
        } else {
            router.push(href);
        }
    };


    return (
        <button onClick={handleRecipeClick} key={id} className="w-72 max-h-[350px] h-full bg-primary 
        flex flex-col rounded-lg overflow-hidden transition-all ease-in-out hover:scale-105 shadow-lg">
            <div className="w-full h-80 overflow-hidden">
                <Image src={src} alt="Oval" width={200} height={200} className="object-cover w-full h-full" />
            </div>
            <div className="w-full h-60 flex flex-col items-center pt-4 gap-2">
                <h1 className="text-xl font-semibold text-white hover:scale-105">{title}</h1>
                <p className="text-base text-white text-center w-full">{desc}</p>
            </div>
        </button>
    );
}



function Simple({ src, title, desc, href, id }: CardFoodProps) {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    // Check user authentication status
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);
    // 

    const handleRecipeClick = () => {
        if (!user) {
            alert('You need to be logged in to access the Recipe page.');
            <Loading />
            router.push('/auth/signin'); // Redirect to sign-in page
        } else {
            router.push(href);
        }
    };

    return (
        <button onClick={handleRecipeClick} key={id} className="max-w-xl w-full h-56 bg-card flex items-center py-4 px-4 
            gap-6 rounded-md hover:brightness-90 shadow-2xl">
            <div className="w-56 h-full">
                <Image
                    src={src}
                    alt="Oval"
                    width={300}
                    height={300}
                    className="object-cover w-full h-full rounded-lg" />
            </div>
            <div className="flex flex-col justify-start w-72 h-full gap-2">
                <h1 className="text-xl font-bold">{title}</h1>
                <h1>chef</h1>
                <h1>{desc}</h1>
            </div>
        </button>
    )
}
Card.Simple = Simple;
Card.Oval = Oval;

export default Card;
