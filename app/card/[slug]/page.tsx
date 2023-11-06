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

    if (data) {

        return (
            <div className='m-20 bg-white p-10 rounded-xl'>
                <div className='md:grid md: grid-cols-2 md:gap-1 flex flex-col justify-between items-center gap-6 mb-5'>
                    <div className=''>
                        <img src={data.images.large} className='rounded-2xl m-auto mb-4 shadow-xl md:w-1/2' />
                        <Link href={'/set/' + data.set.id} className='flex justify-center items-center gap-2 '>
                            <img src={data.set.images.symbol} className='w-12' />
                            <img src={data.set.images.logo} className='w-[135px]' />
                        </Link>
                    </div>
                    <div className='md: flex md: flex-col'>
                        <div className='bg-gray-500 rounded-t-md'>
                            <h1 className='text-[50px]'>{data.name}</h1>
                        </div>
                        <div className='flex justify-between bg-gray-300 items-center'>
                            <p className='text-[20px]'>{data.subtypes} - {data.rarity}</p>
                            <div className='flex gap-1'>
                                <p className='text-[20px] '>{data.hp}</p>
                                <img src={'/' + data.types + '.png'} className='w-8' />
                            </div>
                        </div>
                        <div className='bg-gray-100'>
                            <div className='flex flex-col gap-6 mx-2 my-6'>
                                {data.abilities?.map((abilities: any, index: number) => (
                                    <div key={index}>
                                        <p className='text-[25px] text-red-800 italic'>Ability</p>
                                        <p className='text-[30px] font-bold'>{abilities.name}</p>
                                        <p className='text-[20px]'>{abilities.text}</p>
                                    </div>
                                ))}
                                <div>
                                    {data.attacks?.map((attack: any, index: number) => (
                                        <div key={index} className='flex items-center justify-between'>
                                            <div>
                                                <div className='flex gap-1 items-center'>
                                                    {attack?.cost.map((cost: any, index: number) => (
                                                        <img src={'/' + cost + '.png'} className='w-8 h-8' key={index} />
                                                    ))}
                                                    <p className='text-[30px] font-bold'>{attack.name}</p>
                                                </div>
                                                <p className='text-[20px]'>{attack.text}</p>
                                            </div>
                                            <p className='text-[20px]'>{attack.damage}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex  justify-evenly bg-gray-300 rounded-b-md'>
                                <div>
                                    <p>Weakness</p>
                                    {data.weaknesses?.map((weakness: any, index: number) => (
                                        <div className='flex items-center gap-1' key={index}>
                                            <img src={'/' + weakness.type + '.png'} className='w-8 h-8' />
                                            <p className='text-[30px]'>{weakness.value}</p>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p>Resistance</p>
                                    {data.resistances?.map((resistances: any, index: number) => (
                                        <div className='flex items-center gap-1' key={index}>
                                            <img src={'/' + resistances.type + '.png'} className='w-8 h-8' />
                                            <p className='text-[30px]'>{resistances.value}</p>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p>Retreat Cost</p>
                                    <div className='flex items-center gap-1'>
                                        {data.retreatCost?.map((retreatCost: any, index: number) => (
                                            <div key={index}>
                                                <img src={'/' + retreatCost + '.png'} className='w-8 h-8' />
                                                <p className='text-[30px]'>{retreatCost.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='md: flex md: flex-col'>
                        <p className='text-3xl font-bold text-center'>{data.name} - {data.number + '/' + data.set.total}</p>
                        <p className='text-md text-center '>{data.set.series} - {data.rarity}</p>
                        <p className='text-xs text-center'>Release Date: {data.set.releaseDate.substring(0, 4)}</p>
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
                            {data.abilities?.map((abilities: any, index: number) => (
                                    <tr className='border border-neutral-950' key={index}>
                                        <td className='border border-neutral-950 p-2'>{abilities.name}</td>
                                        <td className='border p-2 grid grid-cols-2 gap-2' >{abilities.text}</td>
                                        <td className='border border-neutral-950 p-2'>{abilities.type}</td>
                                    </tr>
                                ))}
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
                    </div> */}
                {/* <div className=''>
                    <Link href={'/set/' + data.set.id} className='flex justify-center items-center gap-2'>
                        <img src={data.set.images.symbol} className='w-12' />
                        <img src={data.set.images.logo} className='w-28' />
                    </Link>
                </div> */}
            </div>
        );
    }

}