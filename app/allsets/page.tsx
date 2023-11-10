'use client'
import { useQuery } from '@tanstack/react-query';
import { allSets } from '@/API/fetchers';
import Link from 'next/link';
import { motion } from "framer-motion"

export default function AllSets() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['allSets'],
        queryFn: allSets,
        staleTime: 2.77778e-7
    })

    if (isLoading) return <div><img src='/loading.gif' className='m-auto w-10 mt-20' /></div>;

    if (isError) return <div>Error fetching data</div>;

    if (data) {

        return (
            <div>
                <h1 className="text-center text-[30px] font-bold p-1 my-5">All Sets</h1>
                <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 sm:gap-10 gap-5 m-2 sm:px-10 px-2 lg:m-auto">
                    {data.map((data: any, index: number) => (
                        <Link href={"/set/" + data.id} className="" key={index}>
                            <motion.div className="flex flex-col justify-between items-center m-auto "
                                initial={{ opacity: 0, scale: 0.5, y:-100, x: -100 }}
                                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                                transition={{ duration: 0.2, delay: index / 15 }}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 1.1 }}
                                drag="x"
                                dragConstraints={{ left: -100, right: 100 }}>
                                <motion.div className=" h-[200px] w-full border-t-2 border-x-2 border-[#0D1B2A] rounded-t-xl bg-[#ACB7C3]"
                                    whileHover={{
                                        backgroundColor: "#5C7490",
                                        transition: { duration: 0.5 },
                                    }}

                                >
                                    <img src={data.images.logo} className="w-full h-full object-contain p-5" />
                                </motion.div>
                                <div className="flex justify-center items-center bg-[#2E4059] w-full text-white border-b-2 border-x-2 border-[#0D1B2A] rounded-b-xl">
                                    <img src={data.images.symbol} className="sm:w-10 sm:h-10 w-7 h-7 p-1 object-contain" />
                                    <p className="sm:text-[18px] text-[12px] font-bold text-center">{data.name}</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

        );
    }

}