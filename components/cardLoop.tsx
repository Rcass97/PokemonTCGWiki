'use client'
import Link from 'next/link';

export default function CardLoop(params: {data: any}) {

        return (
            <div>
                <div className="grid lg:grid-cols-5 grid-cols-2 gap-2 m-2">
                    {params.data.map((data: any, index: number) => (
                        <Link href={'/card/' + data.id} key={index}>
                            <div className='rounded-xl h-70'>
                                <img src={data.images.small} className='rounded-xl m-auto mb-2 shadow-xl' />
                                <p className='text-lg font-bold text-center'>{data.name}</p>
                                <div className='flex items-center justify-center'>
                                    <p className='text-md text-center'>{data.rarity}</p>
                                    <p>&nbsp; - &nbsp;</p>
                                    <p>{data.number + '/' + data.set.total}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                
            </div>
        );
    }
