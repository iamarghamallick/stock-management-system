import Link from 'next/link';
import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="ml-3 text-base">Stock Management System</span>
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2023 —
          <a href="#" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@admin</a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <Link className='mx-1' href='https://github.com/iamarghamallick'><FaGithub size={30} /></Link>
          <Link className='mx-1' href='https://in.linkedin.com/in/iamarghamallick'><FaLinkedin size={30} /></Link>
        </span>
      </div>
    </footer>
  )
}

export default Footer