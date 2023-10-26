'use client'

import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/API/fetchers';
import { PokemonCard } from '@/API/interfaces'

export default function Cards() {
    const { data, isLoading, isError } = useQuery({ queryKey: ['todos'], queryFn: fetcher })

    console.log(data)

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error fetching data</div>;

    return (
        <div className="grid grid-cols-2 gap-2 m-3">
            {Array.isArray(data.data) ? (
                data.data.map((data: any) => (
                    <div key={data.id} className='border border-[#1B263B] rounded-xl p-2'>
                        <img src={data.images.small} className='rounded-xl m-auto' />
                        <p className='text-lg font-bold text-center'>{data.name}</p>
                        <p className='text-md text-center'>{data.rarity}</p>
                        <p className='text-md text-center'>Release Date: {data.set.releaseDate.substring(0, 4)}</p>
                    </div>
                ))
            ) : (
                <div>No data to display</div>
            )}
        </div>
    );

}