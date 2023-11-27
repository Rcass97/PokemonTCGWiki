'use client'
import Link from "next/link";

export default function Footer() {

    return (
        <nav className="bg-[#0D1B2A] flex justify-center h-20 mt-12">
            <Link href='/' className="flex items-center">
                <img src="/trading.png" className="sm:w-20 sm:h-20 w-16 h-16 invert ml-1 p-2" />
                <p className="text-white text-xl">PokéTCG Wiki</p>
            </Link>
        </nav>
    );
}