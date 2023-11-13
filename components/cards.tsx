'use client'
import { useQuery } from '@tanstack/react-query';
import { homeCards } from '@/API/fetchers';
import CardLoop from './cardLoop';
import SearchBar from './searchBar';

export default function Cards() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['homeCards'],
        queryFn: () => homeCards('sv4'),
        staleTime: 2.77778e-7
    })

    if (isLoading) return <div><img src='/loading.gif' className='m-auto w-10 mt-20' /></div>;

    if (isError) return <div>Error fetching data</div>;

    if (data) {

        return (
            <div>
                <SearchBar />
                <img src="sv04-logo.png" className='m-auto w-4/6' />
                <h1 className='text-center text-lg my-3 p-2'>Check out some cards from the newest set <p className='italic'>Scarlet & Violet - Paradox Rift</p></h1>
                <div>
                    <CardLoop data={data} />
                </div>

            </div>
        );
    }
}