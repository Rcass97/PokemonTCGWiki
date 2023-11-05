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
                <h1 className="text-center text-[25px] font-bold p-1">All Sets</h1>
                <div className="grid lg:grid-cols-5 grid-cols-2 gap-2 m-2 lg:m-auto">
                    {data.map((data: any, index: number) => (
                        <Link href={"/set/" + data.id} className="" key={index}>
                            <div className="flex flex-col justify-between items-center m-auto ">
                                <div className="h-[145px] w-full border-t-2 border-x-2 border-[#0D1B2A] bg-[#ACB7C3] rounded-t-xl">
                                    <img src={data.images.logo} className="w-full h-full object-contain p-1" />
                                </div>
                                <div className="flex justify-center items-center bg-[#2E4059] w-full text-white border-b-2 border-x-2 border-[#0D1B2A] rounded-b-xl">
                                    <img src={data.images.symbol} className="w-7 h-7 p-1 object-contain" />
                                    <p className="text-[11px] font-bold text-center">{data.name}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        );
    }

}