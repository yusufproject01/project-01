import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProfileProps {
    href: string;
    src: string;
    foodname: string;
    deskripsi: string;
}

const CardProfile: FC<CardProfileProps> = ({ href, src, foodname, deskripsi }) => {
    return (
        <div className="max-w-xl w-full rounded overflow-hidden shadow-lg">
            <Link href={href}>
                <Image
                    src={src}
                    alt={foodname}
                    width={400}
                    height={250}
                    className="w-full h-64 object-cover"
                />
            </Link>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{foodname}</div>
                <p className="text-gray-700 text-base">
                    {deskripsi}
                </p>
            </div>
        </div>
    );
};

export default CardProfile;
