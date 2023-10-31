'use client'
import { useQuery } from '@tanstack/react-query';
import { set } from '@/API/fetchers';

export default function Page({params}: {params:{slug: string}}) {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['singleSet', params.slug],
        queryFn: () => set(params.slug),
        staleTime: 2.77778e-7
    })

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error fetching data</div>;

    if (data) {

        return (
            <div>
                <div className="grid lg:grid-cols-5 grid-cols-2 gap-2 m-3">
                    <div className='border border-[#1B263B] rounded-xl p-2'>
                        <img src={data.images.symbol} className='rounded-xl m-auto' />
                        <p className='text-lg font-bold text-center'>{data.name}</p>
                    </div>
                </div>
            </div>
        );
    }

}