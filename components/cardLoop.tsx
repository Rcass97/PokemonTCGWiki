'use client'
import Link from 'next/link';
import { motion } from "framer-motion"

export default function CardLoop(params: { data: any }) {

    return (
        <div>
            <motion.div className="grid lg:grid-cols-5 grid-cols-2 gap-4 m-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
                {params.data.map((data: any, index: number) => (
                    <Link href={'/card/' + data.id} key={index}>
                        <div className=''>
                            <img src={data.images.small} className='rounded-xl m-auto mb-2 shadow-xl' />
                            <div className='flex flex-col'>
                                <p className='text-lg font-bold text-center'>{data.name}</p>
                                <div className='flex items-center justify-center'>
                                    <p>{data.rarity} - {data.number + '/' + data.set.total}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </motion.div>

        </div>
    );
}
