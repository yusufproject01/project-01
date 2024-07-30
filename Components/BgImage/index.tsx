import Image from "next/image"
import { bgImageProps } from "../../lib/inteface";


const BgImage = ({ children, title, src, alt }: bgImageProps) => {
    return (
        <main className="w-full max-h-[430px] overflow-hidden object-cover rounded-md relative">
            <Image src={src}
                alt={alt}
                width={600}
                height={600}
                className={'object-cover w-full h-full brightness-50'} />
            <div className="w-full flex flex-col items-center absolute top-0 pt-6">
                <h1 className="text-4xl font-bold text-white shadow-lg italic">{title}</h1>
                <div className="grid grid-cols-4 gap-4">
                    {children}
                </div>
            </div>
            {/* <div className="absolute bottom-0"> */}
            {/* </div> */}
        </main>
    )
}

export default BgImage