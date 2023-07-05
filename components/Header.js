import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-100 text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="text-base">Stock Management System</span>
        </a>
        <nav className="hidden md:flex md:ml-auto flex-wrap items-center text-base justify-center">
          <Link href='/' className="mx-2 sm:mx-4 md:mx-5 hover:text-gray-900">Home</Link>
          <Link href='/about' className="mx-2 sm:mx-4 md:mx-5 hover:text-gray-900">About</Link>
          <Link href='/contact' className="mx-2 sm:mx-4 md:mx-5 hover:text-gray-900">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
