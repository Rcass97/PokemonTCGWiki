'use client'
import { useQuery } from '@tanstack/react-query';
import { randomCards } from '@/API/fetchers';
import Link from 'next/link';
import CardLoop from './cardLoop';

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
                <div>
                   <CardLoop data={data}/>
                </div>
                
            </div>
        );
    }
}