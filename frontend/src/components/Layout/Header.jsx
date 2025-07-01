import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../form/SearchInput";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  };

  return (
    <header className="bg-white text-gray-600 shadow-lg z-50 relative">
      <nav className="flex items-center justify-between px-5 py-3">
        {/* Left: Brand + Hamburger */}
        <div className="flex items-center">
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6 cursor-pointer"
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
              />
            </svg>
          </button>

          <NavLink to="/" className="text-2xl font-bold ml-3">
            E-commerce
          </NavLink>
        </div>

        {/* Desktop Nav Items (Hidden on Mobile) */}
        <ul className="hidden md:flex space-x-5">
          <li>
            <NavLink to="/" className="hover:text-blue-500">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className="hover:text-blue-500">
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/hotDeals" className="hover:text-blue-500">
              Hot Deals
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className="hover:text-blue-500">
              Cart(0)
            </NavLink>
          </li>
        </ul>

        {/* Desktop Search */}
        {/* <form className="hidden md:flex items-center space-x-2 ml-4">
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
            placeholder="Search"
          />
          <button
            type="submit"
            className="bg-violet-200 px-3 py-1 rounded hover:bg-violet-300 focus:ring focus:ring-blue-300"
          >
            Search
          </button>
        </form> */}

        <SearchInput />

        {/* Auth Buttons */}
        {!auth.user ? (
          <ul className="hidden md:flex space-x-5">
            <li>
              <NavLink
                to="/login"
                className="hover:text-blue-500 transition duration-300"
              >
                Login
              </NavLink>
            </li>
          </ul>
        ) : (
          <div className="relative inline-block text-left">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md ring-1 ring-gray-300 hover:bg-gray-50"
            >
              {auth?.user?.name}
              <svg
                className="-mr-1 ml-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.062l3.72-3.83a.75.75 0 111.06 1.06l-4.25 4.36a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
              >
                <div className="py-1">
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                    onClick={() => {
                      setDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-blue-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-white px-5 py-3 space-y-3 shadow-md"
        >
          <ul className="flex flex-col space-y-2">
            <li>
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-blue-500"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-blue-500"
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hotDeals"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-blue-500"
              >
                Hot Deals
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-blue-500"
              >
                Cart(0)
              </NavLink>
            </li>
            {!auth.user && (
              <li>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-blue-500"
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>

          {/* Mobile Search */}
          <form className="flex items-center space-x-2 pt-2">
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
              placeholder="Search"
            />
            <button
              type="submit"
              className="bg-violet-200 px-3 py-1 rounded hover:bg-violet-300 focus:ring focus:ring-blue-300"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
