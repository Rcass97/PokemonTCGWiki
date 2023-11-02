'use client'

import Cards from "@/components/cards";
import AllSets from "./allsets/page";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={'/allsets/'}>
        <div className="flex justify-center">
          <button className=" bg-[#0D1B2A] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">
            Click Here to View All Sets
          </button>
        </div>
      </Link>
      <Cards />
    </div>
  );
}