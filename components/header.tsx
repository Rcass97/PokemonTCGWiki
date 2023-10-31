'use client'
import Link from "next/link";

export default function Header() {

    return (
        <nav className="bg-[#0D1B2A] flex justify-between">
            <Link href='/' className="flex items-center">
                <img src="/trading.png" className="w-16 h-16 invert ml-1 p-2" />
                <p className="text-white">PokéTCG Wiki</p>
            </Link>
            <div className="flex items-center">
                <img src="/menu.png" className="w-10 h-10 invert mx-2 p-2" />
            </div>
        </nav>
    );
}