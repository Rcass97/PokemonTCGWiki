'use client'
import { useQuery } from '@tanstack/react-query';
import { AllItems } from '@/API/fetchers';
import Link from 'next/link';

export default function Cards() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['homeCards'],
        queryFn: () => AllItems('sv3pt5'),
        staleTime: 2.77778e-7
    })

    if (isLoading) return <div><img src='/loading.gif' className='m-auto w-10 mt-20'/></div>;

    if (isError) return <div>Error fetching data</div>;

    if (data) {

        return (
            <div>
                <h1 className='text-center text-lg mt-3'>Check Out Some Cards From the Newest TCG Set Pokémon 151!</h1>
                <div className="grid lg:grid-cols-5 grid-cols-2 gap-4 m-3">
                    {data.map((data: any, index: number) => (
                        <Link href={'/card/' + data.id} key={index}>
                            <div className='rounded-xl p-2 h-70'>
                                <img src={data.images.small} className='rounded-xl m-auto' />
                                <p className='text-lg font-bold text-center'>{data.name}</p>
                                <p className='text-md text-center'>{data.rarity}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

}