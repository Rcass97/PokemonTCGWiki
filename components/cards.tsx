'use client'
import { useQuery } from '@tanstack/react-query';
import { randomCards } from '@/API/fetchers';
import Link from 'next/link';

export default function Cards() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['homeCards'],
        queryFn: randomCards,
        staleTime: 2.77778e-7
    })

    if (isLoading) return <div><img src='/loading.gif' className='m-auto w-10 mt-20' /></div>;

    if (isError) return <div>Error fetching data</div>;

    if (data) {

        return (
            <div>
                <h1 className='text-center text-lg mt-3 p-2'>Pick a card, any card!</h1>
                <div className="grid lg:grid-cols-5 grid-cols-2 gap-6 m-3">
                    {data.map((data: any, index: number) => (
                        <Link href={'/card/' + data.id} key={index}>
                            <div className='rounded-xl h-70'>
                                <img src={data.images.small} className='rounded-xl m-auto' />
                                <p className='text-lg font-bold text-center'>{data.name}</p>
                                <div className='flex items-center justify-center'>
                                    <p className='text-md text-center'>{data.rarity}</p>
                                    <p>&nbsp; - &nbsp;</p>
                                    <p>{data.number + '/' + data.set.total}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                
            </div>
        );
    }

}