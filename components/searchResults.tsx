import { searchCards } from "@/API/fetchers";
import { useQuery } from "@tanstack/react-query";
import CardLoop from "./cardLoop";
import CardsError from "./cardsError";

export default function SearchResults({ params }) {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['searchResults', params.sendSearch],
        queryFn: () => searchCards(params),
        staleTime: 2.77778e-7
    });

    if (isLoading) return <div><img src='/loading.gif' className='m-auto w-10 mt-20' /></div>;

    // if (isError) return <CardsError isVisible={isError} details={params.sendSearch} />;

    // if (data?.length == 0 && params) return <CardsError isVisible={true} details={params.sendSearch} />

    console.log(params.sendSearch)

    return (
        <div>
            <h1 className='text-center text-2xl font-bold mb-8 p-2'>
                {/* {params.sendSearch.search && !params.sendSearch.types.length && (
                    <>
                        Search Results for name: <span className="text-green-600">{params.sendSearch.search}</span>
                    </>
                )}
                {!params.sendSearch.search && params.sendSearch.types.length > 0 && (
                    <>
                        Search Results for type of: <span className="text-green-600">{params.sendSearch.types.map((type: string) => type)}</span>
                    </>
                )}
                {!params.sendSearch.search && !params.sendSearch.types.length && params.sendSearch.sets.length > 0 && (
                    <>
                        Search Results for Set: <span className="text-green-600">{params.sendSearch.sets.map((set: string) => set)}</span>
                    </>
                )}
                {params.sendSearch.search && params.sendSearch.types.length > 0 && (
                    <>
                        Search Results for name: <span className="text-green-600">{params.sendSearch.search}</span>
                        {` with types of `}
                        {params.sendSearch.types.map((type: string, index: number) => (
                            <span key={index} className="text-green-600">{type + ' '}</span>
                        ))}
                    </>
                )} */}
                Search Results: {params.sendSearch.search && <span className="text-green-600">{params.sendSearch.search}</span>}

                {params.sendSearch.types.length > 0 && <span className="text-green-600">{params.sendSearch.types.map((type: string) => type)}</span>}

                {params.sendSearch.sets.length > 0 && <span className="text-green-600">{params.sendSearch.sets.map((set: string) => set)}</span>}


            </h1>


            <div className="">
                <CardLoop data={data} />
            </div>
        </div>
    );
}