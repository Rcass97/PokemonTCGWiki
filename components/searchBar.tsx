'use client'
import { useState, useRef, useEffect } from "react";
import SearchResults from "./searchResults";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AllSetData from '../API/allsets.json';

interface ISearch {
    search: string,
    types: string[],
    sets: string[]
}

export default function SearchBar() {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const initialSearchTerm = searchParams.getAll('name').join('');
    const initialTypeTerm = searchParams.getAll('types').join(',');
    const initialSetTerm = searchParams.getAll('sets').join(',');

    const [search, setSearch] = useState<ISearch>({ search: initialSearchTerm, types: [], sets: [] } || {});
    const [sendSearch, setSendSearch] = useState<Object>()

    const inputRef = useRef<HTMLInputElement>(null);

    const [startSearch, setStartSearch] = useState<boolean>(false);
    const [isInputFocused, setInputFocused] = useState<boolean>(false);

    const [advanceClick, setAdvanceClick] = useState<boolean>(false);

    useEffect(() => {
        async function formatInitialTerms() {
            const initialTypesArray = initialTypeTerm ? initialTypeTerm.split(',') : [];
            const initialSetsArray = initialSetTerm ? initialSetTerm.split(',') : [];
            return { initialTypesArray, initialSetsArray };
        }

        formatInitialTerms().then(({ initialTypesArray, initialSetsArray }) => {
            if (initialTypesArray.length === 0) {
                setAdvanceClick(false);
            }
            if (initialSetsArray.length === 0) {
                setAdvanceClick(false);
            }
            setSearch({ search: initialSearchTerm, types: initialTypesArray, sets: initialSetsArray });
            setStartSearch(!!initialSearchTerm || !!initialTypeTerm || !!initialSetTerm);
            setSendSearch({ search: initialSearchTerm, types: initialTypesArray, sets: initialSetsArray });
        });
    }, [initialSearchTerm, initialTypeTerm, initialSetTerm]);

    useEffect(() => {
        const newSearchTerm = searchParams.getAll('name').join('');
        const newTypeTerm = searchParams.getAll('types');
        const newSetTerm = searchParams.getAll('sets');
        if (newTypeTerm || newSetTerm) {
            setAdvanceClick(true);
        } else {
            setAdvanceClick(false);
        }
        if (search.search !== newSearchTerm || search.types.join(',') !== newTypeTerm.join(',') || search.sets.join(',') !== newSetTerm.join(',')) {
            if (pathname.includes('/search')) {
                setSearch({ search: newSearchTerm, types: newTypeTerm, sets: newSetTerm });
                setStartSearch(true);
                setSendSearch({ search: newSearchTerm, types: newTypeTerm, sets: newSetTerm })
                return
            }
        }
    }, [searchParams])

    function handleSearch() {
        const typesQuery = search.types.length > 0 ? `&types=${search.types.join(',')}` : '';
        const setsQuery = search.sets.length > 0 ? `&sets=${search.sets.join(',')}` : '';
        router.push(`/search?name=${search.search}${typesQuery}${setsQuery}`);
        setStartSearch(true);
        setSendSearch({ search: search.search, types: search.types, sets: search.sets });
    }

    function handleChange() {
        const newSearchValue = inputRef.current!.value;
        setSearch({ search: newSearchValue, types: search.types, sets: search.sets });
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter' && isInputFocused) {
            handleSearch();
        }
    }

    function handleClickAdvanced() {
        setAdvanceClick((prev) => !prev);
    }

    function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        const checkboxValue = e.target.value;
        const isChecked = e.target.checked;
        const checkboxId = e.target.id;
        if (isChecked) {
            if (checkboxId == 'types') {
                setSearch({ ...search, types: [...search.types, checkboxValue], sets: [...search.sets] });
            }
            if (checkboxId == 'sets') {
                setSearch({ ...search, types: [...search.types], sets: [...search.sets, checkboxValue] });
            }
        } else {
            if (checkboxId == 'types') {
                setSearch({ ...search, types: search.types.filter(type => type !== checkboxValue), sets: [...search.sets] });
            }
            if (checkboxId == 'sets') {
                setSearch({ ...search, types: [...search.types], sets: search.sets.filter(set => set !== checkboxValue) });
            }
        }
    }

    const pokemonTypes = ['fire', 'water', 'grass', 'lightning', 'colorless', 'metal', 'dragon', 'fairy', 'fighting', 'psychic', 'darkness'];

    return (
        <>
            <div className="p-10 mx-auto justify-center flex flex-col gap-4 items-center max-w-2xl w-full">
                <div className="flex flex-row justify-center sm:gap-5 gap-1 items-center w-full">
                    <input
                        type="text"
                        className="border-neutral-700 border rounded-md px-2 py-1 w-full"
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Card Name"
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        value={search.search}
                        ref={inputRef}
                    />
                    <button
                        onClick={handleSearch}
                        className="border-neutral-700 border rounded-md px-2 py-1 bg-neutral-500 w-full max-w-[150px] text-white hover:bg-white hover:text-black"
                    >
                        Click to Search
                    </button>
                </div>
                <div className={`bg-neutral-600 w-full rounded-md p-1 overflow-hidden select-none transition-all duration-150` + (advanceClick ? ` h-[250px] overflow-y-scroll` : ` h-8`)}>
                    <p className="text-white font-semibold text-center hover:cursor-pointer flex justify-center gap-3 hover:bg-neutral-500 rounded-md transition-all duration-150 ease-in-out" onClick={handleClickAdvanced}>
                        Advanced Filters<img src="/down-arrow.png" alt={'arrow'} className={`p-0 m-0 w-5 invert transition-all duration-150 ease-linear` + (advanceClick ? ` rotate-180` : ` rotate-0`)} />
                    </p>
                    <div className={`grid grid-cols-2 overflow-hidden select-none transition-all duration-150 p-4`}>
                        <div>
                            <p className="text-white text-xl font-bold pb-3 text-center">Energy Type</p>
                            <div className="grid grid-cols-1 gap-2">
                                {pokemonTypes.map((type) => (
                                    <label key={type} htmlFor={type} className="text-white mx-3 capitalize flex flex-row items-center gap-2 hover:cursor-pointer hover:bg-neutral-900 transition-all duration-100 p-[4px] rounded-lg">
                                        <input
                                            type="checkbox"
                                            id={'types'}
                                            name="type"
                                            value={type}
                                            checked={search.types.includes(type)}
                                            onChange={handleCheckboxChange}
                                            className={`mx-1 ${type + `-accent`}`}
                                        />
                                        <img src={'/' + type + '.png'} className="w-5 h-5" />
                                        {type}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-white text-xl font-bold pb-3 text-center">Sets</p>
                            <div className="grid grid-cols-1 gap-2">
                                {AllSetData.map((type) => (
                                    <label key={type.img} htmlFor={type.name} className="text-white mx-3 capitalize flex flex-row items-center gap-2 hover:cursor-pointer hover:bg-neutral-900 transition-all duration-100 p-[4px] rounded-lg">
                                        <input
                                            type="checkbox"
                                            id={'sets'}
                                            name="type"
                                            value={type.id}
                                            checked={search.sets.includes(type.id)}
                                            onChange={handleCheckboxChange}
                                            className={`mx-1`}
                                        />
                                        <img src={type.img} className="w-auto h-4" />
                                        {type.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {startSearch && (
                    <motion.div key={'search'} className="p-5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}>
                        <SearchResults params={{ sendSearch }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}