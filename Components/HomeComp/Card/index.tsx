"use client";

import Image from "next/image"
import Link from "next/link"

function Card({ children }: any) {
    return (
        <div>
            {children}
        </div>
    )
}

interface OvalProps {
    src: string,
    title: string,
    desc: string,
    href: string
}
function Oval({ src, title, desc, href }: OvalProps) {
    return (
        <Link href={href} className="w-72 max-h-[350px] h-full bg-primary flex flex-col rounded-lg overflow-hidden transition-all ease-in-out hover:scale-105 shadow-lg">
            <div className="w-full  overflow-hidden">
                <Image src={src} alt="Oval" width={200} height={200} className="object-cover w-full h-full" />
            </div>
            <div className="w-full h-60 flex flex-col items-center pt-4 gap-2">
                <h1 className="text-xl font-semibold text-white hover:scale-105">{title}</h1>
                <p className="text-base text-white text-center w-full">{desc}</p>
            </div>
        </Link>
    )
}

Card.Oval = Oval

export default Card