import Link from "next/link";
import React from "react";
import { ShoppingCart, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md border-b border-amber-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold text-amber-600">
          <Link href={'/'}>
          Shop<span className="text-gray-800">Ease</span>
          </Link>
         
        </div>

        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden max-w-md w-full">
          <input
            type="text"
            placeholder="Search for products..."
            className="px-4 py-2 w-full focus:outline-none"
          />
          <button className="bg-amber-500 p-2 text-white">
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/categories">Category</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
