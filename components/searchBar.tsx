'use client'
import { useState, useRef, useEffect } from "react";
import SearchResults from "./searchResults";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const initialSearchTerm = searchParams.getAll('name').join('');

    const [search, setSearch] = useState<string>(initialSearchTerm || '');
    const [sendSearch, setSendSearch] = useState<string>('')

    const inputRef = useRef<HTMLInputElement>(null);
    
    const [startSearch, setStartSearch] = useState<boolean>(!!initialSearchTerm);
    const [isInputFocused, setInputFocused] = useState(false);

    useEffect(() => {
        setSearch(initialSearchTerm);
        setStartSearch(!!initialSearchTerm);
        setSendSearch(initialSearchTerm)
    }, [initialSearchTerm]);

    useEffect(() => {
        const newSearchTerm = searchParams.getAll('name').join('');
        if (search !== newSearchTerm) {
            if (pathname.includes('/search')) {
                setSearch(newSearchTerm)
                setStartSearch(true)
                setSendSearch(newSearchTerm)
                return;
            }
        }
    }, [searchParams])


    function handleSearch() {
        console.log('Running Search!')
        if (search === '') {
            setStartSearch(false)
            return
        }

        router.push(`/search?name=${search}`)
        setStartSearch(true)
        setSendSearch(search)
    }

    function handleChange() {
        // if (!pathname.includes('/search')) {
        //     setSearch(inputRef.current!.value)
        //     return;
        // }
        setSearch(inputRef.current!.value)
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter' && isInputFocused) {
            handleSearch();
        }
    }

    return (
        <>
            <div className="p-10 flex flex-row justify-center gap-5 items-center">
                <input
                    type="text"
                    className="border-neutral-700 border rounded-md px-2 py-1"
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Search"
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    value={search}
                    ref={inputRef}
                />
                <button
                    onClick={handleSearch}
                    className="border-neutral-700 border rounded-md px-2 py-1 bg-neutral-500 text-white hover:bg-white hover:text-black"
                >
                    Click to Search
                </button>
            </div>
            <AnimatePresence>
                {startSearch && (
                    <motion.div key={'search'} className="p-5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}>
                        <SearchResults key={sendSearch} keywords={sendSearch} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}