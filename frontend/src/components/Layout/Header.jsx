import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("LogOut Successfully!");
  };
  return (
    <header className=" bg-whitetext-gray-600 shadow-lg h-12 ">
      <nav className=" flex items-center justify-between  w-full h-full">
        <div className="flex items-center mx-5 ">
          <button
            className=" gap-2 md:hidden text-gray-800 focus:outline-none "
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
          <NavLink to="/" className="text-2xl font-bold ">
            Doll Bro
          </NavLink>
        </div>
        <ul className="hidden lg:flex space-x-5 ">
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
              to="/shop"
              className="hover:text-blue-500  transition duration-300"
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/hotDeals"
              className="hover:text-blue-500 transition duration-300"
            >
              Hot Deals
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

        {!auth.user ? (
          <>
            <ul className="flex space-x-5 mr-5">
              <li>
                <NavLink
                  to="/login"
                  className="hover:text-blue-500 transition duration-300"
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="flex space-x-5 mr-5">
              <li>
                <NavLink
                  onClick={handleLogOut}
                  to="/login"
                  className="hover:text-blue-500 transition duration-300"
                >
                  LogOut
                </NavLink>
              </li>
            </ul>
          </>
        )}

        <form className=" hidden md:flex items-center space-x-1">
          <input
            type="text"
            className=" border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            type="submit"
            className=" mr-5 bg-violet-200 text-grey-300 w-15 rounded-md hover:bg-violet-00 hover:text-white focus:ring focus:ring-blue-300 transition duration-300"
          >
            Search
          </button>
        </form>
      </nav>
    </header>
  );
};

export default Header;
