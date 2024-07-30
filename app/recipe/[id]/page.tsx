"use client"

// React NextJs
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// 
// Libs
import { fetchDataCollectionID } from "@/lib/api/fetchCollection";
import { PageProps } from '@/lib/inteface/index';
// 
// Componets
import Loading from '@/app/loading';
// 



const Page = ({ params }: PageProps) => {
    // State untuk menyimpan data dan status loading
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // 

    // Mengolah Data yang disimpan untuk ditampilkan/maping
    useEffect(() => {
        const getData = async () => {
            try {
                const fetchedData = await fetchDataCollectionID(params.id);
                setData(fetchedData);
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [params.id]);
    if (loading) return <div><Loading /></div>;
    if (error) return <div>Error: {error}</div>;
    // 

    return (
        <section className='w-full h-auto flex flex-col justify-center items-center py-20'>
            {data ? (
                <div className='flex flex-col max-w-5xl w-full rounded-xl shadow-lg bg-white px-12 py-10 gap-6'>
                    <div className="">
                        <h1 className='text-3xl font-bold w-full text-center'>{data.nama_makanan}</h1>
                        <h1 className='text-lg font-semi w-full text-center'>
                            Chef : {' '}
                            <Link href={'/'} className='text-primary font-semibold hover:brightness-90'>Michael Jack S.</Link>
                        </h1>
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <div className='max-w-2xl w-full h-80 rounded-lg overflow-hidden '>
                            <Image
                                src={data.image}
                                alt={data.nama_makanan}
                                width={600}
                                height={600}
                                className='w-full h-full object-cover' />
                        </div>
                    </div>
                    <p className='text-justify'>
                        {data.deskripsi}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quam a exercitationem eum sit sequi mollitia consequuntur aperiam vitae,
                        accusamus reprehenderit assumenda perspiciatis quisquam, saepe eligendi asperiores,
                        odit ut doloremque! Dolorem, in. Nulla natus distinctio illum architecto aperiam modi dolorem in culpa?
                        Earum officiis, expedita voluptas enim minima quibusdam possimus!
                        Cumque nemo sit reprehenderit perspiciatis fuga! Aperiam vero,
                        beatae unde animi tempore dolorem voluptatem temporibus eum nisi atque, blanditiis quod sit.
                        Repudiandae, sint. Iste optio, numquam totam obcaecati aliquid commodi culpa,
                        molestiae laborum architecto reprehenderit necessitatibus,
                        nobis vitae voluptate eaque aut fugiat expedita a libero porro assumenda maiores incidunt.
                        Molestias, modi numquam maxime asperiores sit officiis sequi porro incidunt aut accusantium
                        dolore esse earum deleniti dignissimos quidem eveniet aperiam eaque non.
                        Aut sequi consequuntur nobis error sunt ratione natus mollitia,
                        ipsam obcaecati aspernatur illum nemo inventore quibusdam sed repellat,
                        quia impedit neque nostrum dicta? Nisi explicabo facilis iure atque delectus autem aut
                        accusantium hic nam inventore asperiores quasi labore, non aliquid quod temporibus ad unde.
                        Veritatis fuga delectus, recusandae corrupti inventore tenetur dolorum laboriosam
                        exercitationem officia consectetur excepturi labore nam magnam aliquam nobis quo
                        cupiditate vel esse mollitia, vitae in ex. Possimus autem nam hic voluptates consequuntur
                        tenetur qui quae eveniet odit odio exercitationem animi, facere earum molestiae culpa suscipit fuga ea.
                        Sequi, numquam dicta. At, velit ratione cupiditate tempore nobis quaerat eaque facere error
                        consequuntur ad suscipit tempora libero et optio adipisci veritatis ab rerum. Omnis autem quas,
                        nobis a excepturi nostrum recusandae error officia rerum voluptatum similique libero id facere eum
                        reiciendis nemo ipsa? Placeat obcaecati quod amet quisquam doloribus illo in doloremque neque deserunt
                        itaque dolor quo, repudiandae perferendis ab exercitationem facilis eaque ipsum!
                        Sit dolore provident reprehenderit deleniti veniam fuga praesentium molestiae ex?
                        Explicabo adipisci veritatis recusandae beatae ut dignissimos autem magnam quia,
                        rerum perferendis, nihil blanditiis!
                    </p>
                </div>
            ) : (
                <div>No data found</div>
            )}
        </section>
    )
}

export default Page;
