'use client'
import { useQuery } from '@tanstack/react-query';
import { homeCards } from '@/API/fetchers';
import { motion } from "framer-motion";
import Link from 'next/link';
import CardLoop from './cardLoop';
import SearchBar from './searchBar';
import CardCarousel from './cardCarousel';

export default function Cards() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['homeCards'],
        queryFn: () => homeCards('sv4'),
        refetchOnMount: true
    })

    if (isLoading) return <div><img src='/loading.gif' className='m-auto w-10 mt-20' /></div>;

    if (isError) return <div>Error fetching data</div>;

    if (data) {

        return (
            <>
                <SearchBar />
                <div className='flex flex-col-2 flex-wrap'>
                    <div className='flex flex-col sm:w-4/6 w-full'>
                        <img src="sv04-logo.png" className='m-auto sm:w-3/6 w-3/4 my-5' />
                        <h1 className='text-center text-xl mb-3'>Check out some cards from the newest set <p className='italic font-bold'>Scarlet & Violet - Paradox Rift</p></h1>
                        <div>
                            {/* <CardLoop data={data} /> */}
                            <CardCarousel data={data} />
                        </div>
                    </div>
                    <div className='flex flex-col items-center sm:gap-10 gap-5 sm:w-2/6 w-full mt-10'>
                        <h1 className='text-2xl font-bold'>Latest Products:</h1>
                        <div className='flex sm:flex-col'>
                            <div className='m-auto sm:w-1/2 w-3/4'>
                                <p className='text-center'>ETB - Iron Valiant</p>
                                <Link href='https://www.pokemoncenter.com/product/187-85415/pokemon-tcg-scarlet-and-violet-paradox-rift-pokemon-center-elite-trainer-box-iron-valiant'>
                                    <motion.img src='PR_1.png' className=''
                                        transition={{ duration: 0.2 }}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 1.1 }} />
                                </Link>
                            </div>
                            <div className='m-auto sm:w-1/2 w-3/4'>
                                <p className='text-center'>ETB - Roaring Moon</p>
                                <Link href='https://www.pokemoncenter.com/product/187-85417/pokemon-tcg-scarlet-and-violet-paradox-rift-pokemon-center-elite-trainer-box-roaring-moon' className='inline-block'>
                                    <motion.img src='PR_2.png' className=''
                                        transition={{ duration: 0.2 }}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 1.1 }} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}