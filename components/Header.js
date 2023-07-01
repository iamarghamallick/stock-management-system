import React from "react";

const Header = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="text-xl">Stock Management System</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mx-5 hover:text-gray-900">Home</a>
          <a className="mx-5 hover:text-gray-900">About</a>
          <a className="mx-5 hover:text-gray-900">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
