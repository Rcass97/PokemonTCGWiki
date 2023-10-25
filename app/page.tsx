'use client'

import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/API/fetchers';
import { PokemonCard } from '@/API/interfaces'

export default function Home() {
  const { data, isLoading, isError } = useQuery({ queryKey: ['todos'], queryFn: fetcher })

  console.log(data)

  if (isLoading) return <div>Loading...</div>;
  
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <p className='text-3xl font-bold text-center'>{data.data.name}</p>
      <img src={data.data.images.large} className='rounded-xl m-auto'/>
    </div>
  );
}