'use client'
import Link from "next/link";
import DropdownMenu from "./dropdown";

export default function Header() {

    return (
        <nav className="bg-[#0D1B2A] flex justify-between h-20">
            <Link href='/' className="flex items-center">
                <img src="/trading.png" className="sm:w-20 sm:h-20 w-16 h-16 invert ml-1 p-2" />
                <p className="text-white text-xl">PokéTCG Wiki</p>
            </Link>
            <div className="flex items-center">
                <DropdownMenu />
            </div>
        </nav>
    );
}