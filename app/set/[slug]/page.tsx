'use client'
import { useQuery } from '@tanstack/react-query';
import { set } from '@/API/fetchers';
import AllCardsInSet from '@/components/allCardsInSet';

export default function Page({ params }: { params: { slug: string } }) {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['singleSet', params.slug],
        queryFn: () => set(params.slug),
        staleTime: 2.77778e-7
    })

    if (isLoading) return <div><img src='/loading.gif' className='m-auto w-10 mt-20' /></div>;

    if (isError) return <div>Error fetching data</div>;

    console.log(data)

    if (data) {

        return (
            <div>
                <div>
                        <div className='flex flex-col justify-center'>
                            <img src={data.images.logo} className='w-60 m-auto my-5' />
                            <div className='flex justify-center items-center gap-2'>
                                <img src={data.images.symbol} className='w-10' />
                                <p className='text-lg font-bold text-center'>{data.name}</p>
                            </div>
                        </div>
                </div>
                <div>
                    <AllCardsInSet slug={params.slug} />
                </div>
            </div>
        );
    }



}