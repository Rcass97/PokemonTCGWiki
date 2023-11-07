'use client'
import Link from 'next/link';
import { motion } from "framer-motion"

export default function CardLoop(params: { data: any }) {

    return (
        <div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-3 m-2">
                {params.data.map((data: any, index: number) => (
                    <Link href={'/card/' + data.id} key={index}>
                        <motion.div className=''
                            initial={{ opacity: 0, scale: 0.5, x: -100 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index / 10 }}>
                            <img src={data.images.small} className='sm:w-5/6 rounded-xl m-auto mb-2 shadow-xl transition ease-in-out sm:hover:scale-105' />
                            <div className='flex flex-col'>
                                <p className='text-lg font-bold text-center'>{data.name}</p>
                                <div className='flex items-center justify-center'>
                                    <p>{data.rarity} - {data.number + '/' + data.set.total}</p>
                                </div>
                                <p className='text-center flex justify-center'>{data.set.series} - {data.set.name}</p>
                                <p className='text-xs text-center'>Release Date: {data.set.releaseDate.substring(0, 4)}</p>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

        </div>
    );
}
