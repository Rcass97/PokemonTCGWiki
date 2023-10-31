'use client'
import { useQuery } from '@tanstack/react-query';
import { AllItems } from '@/API/fetchers';
import Link from 'next/link';

export default function Cards() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['homeCards'],
        queryFn: AllItems,
        staleTime: 2.77778e-7
    })

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error fetching data</div>;

    if (data) {

        return (
            <div>
                <div className="grid lg:grid-cols-5 grid-cols-2 gap-2 m-3">
                    {data.map((data: any, index: number) => (
                        <Link href={'/card/' + data.id} key={index}>
                            <div className='border border-[#1B263B] rounded-xl p-2'>
                                <img src={data.images.small} className='rounded-xl m-auto' />
                                <p className='text-lg font-bold text-center'>{data.name}</p>
                                <p className='text-md text-center'>{data.rarity}</p>
                                <p className='text-md text-center'>Release Date: {data.set.releaseDate.substring(0, 4)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

}