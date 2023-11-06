'use client'
import { useQuery } from '@tanstack/react-query';
import { specificSet } from '@/API/fetchers';
import CardLoop from './cardLoop';

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
                <CardLoop data={data}/>
            </div>
        );
    }

}
