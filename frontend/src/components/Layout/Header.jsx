import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white text-gray-600 shadow-lg h-12 ">
      <nav className=" flex items-center justify-between  w-full h-full">
        <div className="flex items-center px-5 ">
          <button
            className=" gap-2 lg:hidden text-gray-800 focus:outline-none "
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 6h18M3 12h18M3 18h18"
              ></path>
            </svg>
          </button>
          <NavLink to="/" className="text-2xl font-bold ml-5">
            Doll Bro
          </NavLink>
        </div>
        <ul className="hidden lg:flex space-x-8 gap-6 ">
          <li>
            <NavLink
              to="/"
              className="hover:text-blue-500 transition duration-300"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className="hover:text-blue-500  transition duration-300"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className="hover:text-blue-500 transition duration-300"
            >
              Register
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className="hover:text-blue-500 transition duration-300"
            >
              Cart(0)
            </NavLink>
          </li>
        </ul>
        <form className="flex items-center space-x-2 gap-1">
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white w-15 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 transition duration-300"
          >
            Search
          </button>
        </form>
      </nav>
    </header>
  );
};

export default Header;
