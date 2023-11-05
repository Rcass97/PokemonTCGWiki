'use client'
import Link from 'next/link';

export default function CardLoop(params: { data: any }) {

    return (
        <div>
            <div className="grid lg:grid-cols-5 grid-cols-2 gap-4 m-2">
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
            </div>

        </div>
    );
}
