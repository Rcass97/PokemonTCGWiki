'use client'
import { useQuery } from '@tanstack/react-query';
import { allSets } from '@/API/fetchers';
import Link from 'next/link';

export default function AllSets() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['allSets'],
        queryFn: allSets,
        staleTime: 2.77778e-7
    })

    if (isLoading) return <div><img src='/loading.gif' className='m-auto w-10 mt-20' /></div>;

    if (isError) return <div>Error fetching data</div>;

    if (data) {

        return (
            <div>
                <h1 className='text-center text-lg p-2'>All Sets</h1>
                <div className='grid lg:grid-cols-5 grid-cols-2'>
                    {data.map((data: any, index: number) => (
                        <Link href={'/set/' + data.id} className='' key={index}>
                            <div className='flex flex-col justify-center items-center gap-1 w-48 h-24'>
                                <div className=''>
                                    <img src={data.images.logo} className='w-20' />
                                </div>
                                <div className='flex items-center'>
                                    <img src={data.images.symbol} className='w-4' />
                                    <p className='text-xs'>{data.name} </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

}