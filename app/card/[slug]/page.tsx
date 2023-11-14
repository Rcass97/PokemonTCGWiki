'use client'
import { useQuery } from '@tanstack/react-query';
import { item } from '@/API/fetchers';
import Link from 'next/link';
import { motion } from "framer-motion";

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
            <div className='sm:m-20 p-10 rounded-xl'>
                <div className='md:flex md:flex-row md:items-start md:gap-1 md:w1/2 flex flex-col justify-evenly items-center gap-6 mb-5'>
                    <div>
                        <motion.div className=''
                            initial={{ opacity: 0, scale: 0.5, y: -100, x: -100 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            transition={{ duration: 0.2 }}
                            whileHover={{ scale: 1.07 }}
                            whileTap={{ scale: 1.1 }}>
                                <img src={data.images.large} className='rounded-2xl m-auto mb-4 shadow-xl sm:w-[463px] sm:h-[645px]' />
                        </motion.div>

                        <Link href={'/set/' + data.set.id} className='flex justify-center items-center gap-2 '>
                            <img src={data.set.images.symbol} className='w-12' />
                            <img src={data.set.images.logo} className='w-[135px]' />
                        </Link>
                    </div>

                    <div className='md:flex md:flex-col md:w-1/2 w-screen shadow-xl'>
                        <div className={`rounded-t-2xl ` + (data.types ? data?.types[0] : `bg-neutral-500`)}>
                            <h1 className='text-[40px] text-center'>{data.name}</h1>
                        </div>

                        <div className={`flex justify-between items-center p-4 ` + (data.types ? `${data.types![0]}-resist` : `bg-neutral-300`)}>
                            <p className='sm:text-[20px] text-base'>{data.subtypes} - {data.rarity}</p>
                            <div className='flex items-center gap-1'>
                                <p className='sm:text-[20px] text-base font-bold'>HP: {data.hp}</p>
                                {data.types?.map((types: any, index: number) => (
                                    <img src={'/' + types + '.png'} className='sm:w-8 sm:h-8 w-6 h-6' key={index} />
                                ))}
                            </div>
                        </div>

                        <div className={`p-4 ` + (data.types ? `${data.types![0]}-body` : `bg-neutral-100 `)}>
                            <div className='flex flex-col gap-6 mx-2 my-6 '>
                                {data.abilities?.map((abilities: any, index: number) => (
                                    <div key={index}>
                                        <p className='text-[25px] text-red-800 italic'>Ability</p>
                                        <p className='text-[30px] font-bold'>{abilities.name}</p>
                                        <p className='text-[20px]'>{abilities.text}</p>
                                    </div>
                                ))}
                                <div>
                                    {/* <p className='text-[25px] text-stone-950 italic'>Attacks</p> */}
                                    {data.attacks?.map((attack: any, index: number) => (
                                        <div key={index} className='flex items-center justify-between'>
                                            <div>
                                                <div className='flex gap-1 items-center'>
                                                    {attack?.cost.map((cost: any, index: number) => (
                                                        <img src={'/' + cost + '.png'} className='sm:w-8 sm:h-8 w-6 h-6' key={index} />
                                                    ))}
                                                    <p className='sm:text-[30px] text-[20px] font-bold'>{attack.name}</p>
                                                </div>
                                                <p className='sm:text-[20px] text-[15px]'>{attack.text}</p>
                                            </div>
                                            <p className='sm:text-[20px] text-[15px]'>{attack.damage}</p>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    {data.rules && data?.rules.map((rules: any, index: number) => (
                                        <div className='mb-5'>
                                            <p className='sm:text-[30px] text-[15px] font-bold italic' key={index}>{rules}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`flex p-4 justify-evenly ` + (data.types ? `${data.types![0]}-resist` : `bg-neutral-300`)}>
                            <div>
                                <p>Weakness</p>
                                {data.weaknesses?.map((weakness: any, index: number) => (
                                    <div className='flex justify-center items-center gap-1' key={index}>
                                        <img src={'/' + weakness.type + '.png'} className='sm:w-8 sm:h-8 w-6 h-6' />
                                        <p className='md:text-[30px] text-base'>{weakness.value}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p>Resistance</p>
                                {data.resistances?.map((resistances: any, index: number) => (
                                    <div className='flex justify-center items-center gap-1' key={index}>
                                        <img src={'/' + resistances.type + '.png'} className='sm:w-8 sm:h-8 w-6 h-6' />
                                        <p className='md:text-[30px] text-base'>{resistances.value}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p>Retreat Cost</p>
                                <div className='flex justify-center items-center gap-1'>
                                    {data.retreatCost?.map((retreatCost: any, index: number) => (
                                        <div key={index}>
                                            <img src={'/' + retreatCost + '.png'} className='sm:w-8 sm:h-8 w-6 h-6' />
                                            <p className='md:text-[30px] text-base'>{retreatCost.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`flex p-4 justify-between rounded-b-2xl items-center  ` + (data.types ? `${data.types![0]}-artist` : `bg-neutral-100`)}>
                            <div>
                                <p className='sm:text-lg text-sm'>
                                    Illustrator: {data.artist}
                                </p>
                            </div>
                            <div>
                                <p className='sm:text-base text-xs'>
                                    Release Date: {data.set.releaseDate}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}