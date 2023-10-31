'use client'
import { useQuery } from '@tanstack/react-query';
import { item } from '@/API/fetchers';

export default function Page({params}: {params:{slug: string}}) {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['singleCard', params.slug],
        queryFn: () => item(params.slug),
        staleTime: 2.77778e-7
    })

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error fetching data</div>;
    //     try {
    //         const card = await PokemonTCG.Card.find('xy1');
    //         renderPokemonData(card);
    //     } catch (error) {
    //         // Handle errors
    //         console.error('Error fetching Pokémon TCG data:', error);
    //     }
    // };

    // const renderPokemonData = (card) => {
    //     return (
    //         <div className="grid lg:grid-cols-5 grid-cols-2 gap-2 m-3">
    //             {Array.isArray(card.data) ? (
    //                 card.data.map((data) => (
    //                     <div key={data.id} className='border border-[#1B263B] rounded-xl p-2'>
    //                         <img src={data.images.small} className='rounded-xl m-auto' />
    //                         <p className='text-lg font-bold text-center'>{data.name}</p>
    //                         <p className='text-md text-center'>{data.rarity}</p>
    //                         <p className='text-md text-center'>Release Date: {data.set.releaseDate.substring(0, 4)}</p>
    //                     </div>
    //                 ))
    //             ) : (
    //                 <div>No data to display</div>
    //             )}
    //         </div>
    //     );
    // };

    // fetchPokemonData();

    if (data) {

        return (
            <div>
                <div className="grid lg:grid-cols-5 grid-cols-2 gap-2 m-3">
                    <div className='border border-[#1B263B] rounded-xl p-2'>
                        <img src={data.images.small} className='rounded-xl m-auto' />
                        <p className='text-lg font-bold text-center'>{data.name}</p>
                        <p className='text-md text-center'>{data.rarity}</p>
                        <p className='text-md text-center'>Release Date: {data.set.releaseDate.substring(0, 4)}</p>
                    </div>
                </div>
            </div>
        );
    }

}