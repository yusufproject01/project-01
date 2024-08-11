// Interface untuk typedata Collection ParamsId
export interface PageProps {
    params: {
        id: string;
    }
}

export interface Recipe {
    nama_makanan: string;
    images: string[]; // Array string untuk menyimpan URL gambar
    description: string;
    ingredients: { amount: string; unit: string; name: string }[];
    instructions: string;
    userId: string;
}

// Interface untuk typedata Foodies
export interface FoodiesProps {
    id: string;
    nama_makanan: string;
    ingredients: string;
    instructions: string;
    deskripsi: string;
    image: string;
}

// Interface untuk typedata Component BgCard
export interface bgImageProps {
    children: any,
    title: string,
    src: string,
    alt: string
}

// Interface untuk typedata Chef
export interface CardChefProps {
    src: string,
    nameChef: string,
    position: string,
    resto: string,
    href: string
}

// Interface untuk typedata Food
export interface CardFoodProps {
    id: string,
    src: string,
    title: string,
    desc: string,
    href: string
}