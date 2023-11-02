'use client'
import { useQuery } from '@tanstack/react-query';
import { specificSet } from '@/API/fetchers';
import Link from 'next/link';

export default function AllCardsInSet(params: { slug: string }) {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['allCardsInSet', params.slug],
        queryFn: () => specificSet(params.slug),
        staleTime: 2.77778e-7
    })

    if (isLoading) return <div><img src='/loading.gif' className='m-auto w-10 mt-20' /></div>;

    if (isError) return <div>Error fetching data</div>;

    console.log(data)

    if (data) {

        return (
            <div>
                <div className="grid lg:grid-cols-5 grid-cols-2 gap-2 m-2">
                    {data.map((data: any, index: number) => (
                        <Link href={'/card/' + data.id} key={index}>
                            <div className='rounded-xl h-70'>
                                <img src={data.images.small} className='rounded-xl m-auto mb-2 shadow-xl' />
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
