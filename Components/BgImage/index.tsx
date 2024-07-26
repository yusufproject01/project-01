import Image from "next/image"

interface bgImageProps {
    children: any,
    title: string,
    src: string,
    alt: string
}

const BgImage = ({ children, title, src, alt }: bgImageProps) => {

    return (
        <main className="w-full max-h-[430px] overflow-hidden object-cover relative">
            <Image src={src}
                alt={alt}
                width={900}
                height={900}
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