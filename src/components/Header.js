import React from 'react';

function Header() {

  return (

    <nav className="bg-blue-500 p-4">

      <div className="container mx-auto">

        <div className="flex justify-between items-center">

          <div className="text-white font-bold text-xl">EngineerHub:CareerCompass</div>

          <div className="hidden md:flex space-x-4">

            <a href="/" className="text-white hover:text-gray-300">Home</a>

            <a href="/tasks" className="text-white hover:text-gray-300">Tasks</a>

            <a href="/projects" className="text-white hover:text-gray-300">Projects</a>

            <a href="/" className="text-white hover:text-gray-300">Contact</a>

          </div>

        </div>

      </div>

    </nav>

  );

}

export default Header;