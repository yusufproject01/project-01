import Image from "next/image"
import Link from "next/link"
import { CardChefProps } from "../../../lib/inteface";
// import { useEffect } from "react"


const CardChef = ({src,nameChef,position,resto, href}: CardChefProps) => {
    
    
    // useEffect(() => {
        
    // }, [])
    
    return (
        <main className="w-full h-80 animate__animated animate__fadeInLeft animate__slow">
            <Link href={href} className="w-full h-80
            px-4 pb-2 group transition-all ease-in-out duration-1000">
                <div className="w-64 h-full shadow-xl rounded-md overflow-hidden relative">
                    <Image src={src} alt="Chef" width={200} height={200} className={'object-cover w-full h-full'} />
                    <div className="w-full h-1/3 bg-page absolute bottom-0 rounded-xl 
                    flex flex-col items-center justify-center group-hover:bg-primary group-hover:text-white">
                        <h1 className="text-xl font-bold">{nameChef}</h1>
                        <h3 className="text-base italic text-slate-400 group-hover:text-slate-300 font-semibold">{position}</h3>
                        <p className="text-lg">{resto}</p>
                    </div>
                </div>
            </Link>
        </main>
    )
}

export default CardChef