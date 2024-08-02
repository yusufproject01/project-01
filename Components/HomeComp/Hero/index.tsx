import Image from "next/image"

const Hero = () => {
    return (
        <div className="bg-slate-400 w-full max-h-[430px] h-full flex overflow-hidden rounded-lg shadow-lg">
            <div className="w-1/3 bg-primary flex flex-col items-center pt-8">
                <div className="w-96 h-full flex flex-col justify-center gap-2">
                    <p className="text-white">Selamat datang....</p>
                    <div className="flex flex-col justify-center w-full text-white">
                        <h1 className="text-5xl font-bold ">
                            Resep
                        </h1>
                        <h1 className="text-5xl font-bold ">
                            Makanan
                        </h1>
                        <h1 className="text-5xl font-bold ">
                            Lengkap
                        </h1>
                    </div>
                    <h3 className="text-base font-semibold text-white">Temukan, Bagikan, dan Nikmati Kreasi Kuliner</h3>
                    <p className="text-white">
                        Temukan inspirasi kuliner di FoodieShare, tempat di mana Anda bisa menemukan resep lezat.
                    </p>
                    <button className="w-44 h-8 bg-qutenary flex justify-center items-center rounded-md text-white hover:brightness-110">Get More Recipe</button>
                </div>
            </div>
            <div className="w-2/3 h-full">
                <Image src="/assets/hero/hero2.jpg"
                    alt="Hero"
                    width={600}
                    height={600}
                    className="object-cover w-full h-full" />
            </div>
        </div>
    )
}

export default Hero