'use client'
import { useQuery } from '@tanstack/react-query';
import { set } from '@/API/fetchers';
import AllCardsInSet from '@/components/allCardsInSet';
import Link from 'next/link';
import { motion } from "framer-motion"

export default function Page({ params }: { params: { slug: string } }) {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['singleSet', params.slug],
        queryFn: () => set(params.slug),
        staleTime: 2.77778e-7
    })

    if (isLoading) return <div><img src='/loading.gif' className='m-auto w-10 mt-20' /></div>;

    if (isError) return <div>Error fetching data</div>;

    console.log(data)

    if (data) {

        return (
            <div>
                <Link href={'/allsets/'}>
                    <motion.button className='flex items-center border border-black rounded-md text-base sm:text-2xl p-2 ml-2 mt-2 w-auto'
                        whileHover={{
                            backgroundColor: "#0D1B2A",
                            transition: { duration: 0.7 },
                            scale: 1.05,
                            color: "white",
                        }}>
                        &#8592; All Sets
                    </motion.button>
                </Link>
                <div>
                    <div className='flex flex-col justify-center p-5'>
                        <img src={data.images.logo} className='md:w-2/6 sm:w-4/6 w-3/4 m-auto my-2' />
                        <div className='flex justify-center items-center gap-2'>
                            <img src={data.images.symbol} className='w-10' />
                            <p className='text-lg font-bold text-center'>{data.series} - {data.name}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <AllCardsInSet slug={params.slug} />
                </div>
            </div>
        );
    }



}