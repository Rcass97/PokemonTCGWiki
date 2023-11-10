'use client'
import Link from 'next/link';
import { motion } from "framer-motion"

export default function CardLoop(params: { data: any }) {

    return (
        <div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-5 mx-10">
                {params.data.map((data: any, index: number) => (
                    <Link href={'/card/' + data.id} key={index}>
                        <motion.div className='flex justify-center'
                               initial={{ opacity: 0, scale: 0.5, y:-100, x: -100 }}
                               animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                               transition={{ duration: 0.2, delay: index / 15 }}
                               whileHover={{ scale: 1.1 }}
                               whileTap={{ scale: 1.1 }}>
                            <img src={data.images.large} className='w-11/12 rounded-xl mb-2 shadow-xl' />
                        </motion.div>
                        <div className='flex flex-col'>
                            <p className='text-lg font-bold text-center'>{data.name}</p>
                            <div className='flex items-center justify-center'>
                                <p className='sm:text-base text-sm text-center'>{data.rarity} - {data.number + '/' + data.set.total}</p>
                            </div>
                            <p className='sm:text-base text-[13px] text-center flex justify-center'>{data.set.series} - {data.set.name}</p>
                            <p className='text-xs text-center'>Release Date: {data.set.releaseDate.substring(0, 4)}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}
