import { useState } from "react";
import Link from "next/link";

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="w-10 h-10 invert mx-2 p-2"
        >
          <img src="/menu.png" />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-3 w-40 rounded-bl-xl shadow-xl bg-[#0D1B2A] ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1 border-l-2 border-b-2 rounded-bl-xl border-[#E0E1DD]" role="menuitem">
            <Link href="/" className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-black" onClick={closeDropdown} role="menuitem">
              Home
            </Link>
            <Link href="/allsets/" className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-black" onClick={closeDropdown} role="menuitem">
              Sets
            </Link>
            <Link href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-black" onClick={closeDropdown} role="menuitem">
              About
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
