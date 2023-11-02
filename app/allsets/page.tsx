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
    <h1 className="text-center text-lg p-2">All Sets</h1>
    <div className="grid lg:grid-cols-5 grid-cols-2 gap-1 mx-2 lg:m-auto">
        {data.map((data: any, index: number) => (
            <Link href={"/set/" + data.id} className="" key={index}>
                <div className="flex flex-col justify-between items-center m-auto h-[150px] w-auto border-[2px] border-zinc-400 bg-zinc-300 rounded-xl">
                    <div className="w-3/4 h-3/4"> 
                        <img src={data.images.logo} className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex items-center gap-1">
                        <img src={data.images.symbol} className="w-6 h-6 object-contain" />
                        <p className="text-sm text-center">{data.name}</p>
                    </div>
                </div>
            </Link>
        ))}
    </div>
</div>

        );
    }

}