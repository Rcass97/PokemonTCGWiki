import { searchCards } from "@/API/fetchers";
import { useQuery } from "@tanstack/react-query";
import CardLoop from "./cardLoop";
import CardsError from "./cardsError";

export default function SearchResults(params: { keywords: string }) {  
        const { data, isLoading, isError } = useQuery({
            queryKey: ['searchResults', params.keywords],
            queryFn: () => searchCards(params.keywords),
            staleTime: 2.77778e-7
        });

        if (isLoading) return <div><img src='/loading.gif' className='m-auto w-10 mt-20' /></div>;

        if (isError) return <CardsError isVisible={isError} details={params.keywords} />;

        if (data?.length == 0) return <CardsError isVisible={true} details={params.keywords} />

        return (
            <div>
                <h1 className='text-center text-2xl font-bold mt-3 p-2'>Search Results for <span className="text-green-600">{params.keywords}</span></h1>
                <hr />
                <div className="">
                    <CardLoop data={data} />
                </div>
            </div>
        );
    }