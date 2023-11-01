'use client'
import { useQuery } from '@tanstack/react-query';
import { item } from '@/API/fetchers';
import Link from 'next/link';

export default function Page({ params }: { params: { slug: string } }) {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['singleCard', params.slug],
        queryFn: () => item(params.slug),
        staleTime: 2.77778e-7
    })

    if (isLoading) return <div><img src='/loading.gif' className='m-auto w-10 mt-20' /></div>;

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
            <div className='m-3'>
                <div className='flex flex-col justify-between items-center gap-6 mb-10'>
                    <div className=''>
                        <img src={data.images.large} className='rounded-2xl m-auto mb-4 shadow-xl' />
                        <p className='text-3xl font-bold text-center'>{data.name}</p>
                        <p className='text-md text-center '>{data.set.series} - {data.rarity}</p>
                        <p className='text-xs text-center'>Release Date: {data.set.releaseDate.substring(0, 4)}</p>
                    </div>
                    <div>
                        <h2 className='text-center'>Moves:</h2>
                        <table className="table-fixed w-auto">
                            <thead className='text-center'>
                                <tr className='border border-neutral-950 '>
                                    <th className='border border-neutral-950 p-2'>Attack</th>
                                    <th className='border border-neutral-950 p-2'>Energy</th>
                                    <th className='border border-neutral-950 p-2'>Damage</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {data.attacks?.map((attack: any, index: number) => (
                                    <tr className='border border-neutral-950' key={index}>
                                        <td className='border border-neutral-950 p-2'>{attack.name}</td>
                                        <td className='border p-2 grid grid-cols-2 gap-2' >
                                            {attack?.cost.map((cost: any, index: number) => (
                                                <img src={'/' + cost + '.png'} className='w-8' key={index} />
                                            ))}
                                        </td>
                                        <td className='border border-neutral-950 p-2'>{attack.damage}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className='text-center'>{data.flavorText}</p>
                </div>
                <div className=''>
                    <Link href={'/set/' + data.set.id} className='flex justify-center items-center gap-2'>
                        <img src={data.set.images.symbol} className='w-8' />
                        <img src={data.set.images.logo} className='w-20' />
                    </Link>
                </div>
            </div>
        );
    }

}