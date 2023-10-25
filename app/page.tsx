'use client'

import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/API/fetchers';

export default function Home() {
  const { data, isLoading, isError } = useQuery(['data'], fetcher);

  if (isLoading) return <div>Loading...</div>;
  
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>My Next.js App</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}