import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  const [open, setOpen] = useState(false);

  const activeLink = "block px-4 py-2 rounded bg-violet-900 text-white";
  const normalLink = "block px-4 py-2 rounded hover:bg-gray-200";

  return (
    <div className="md:w-65 w-full bg-gray-100 md:min-h-screen p-5 shadow-md md:relative">
      {/* Toggle button for small screens */}
      <div className="md:hidden flex justify-between items-center">
        <h4 className="text-xl font-normal">User Dashboard</h4>
        <button
          onClick={() => setOpen(!open)}
          className=" text-gray-700 text-3xl cursor-pointer"
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Sidebar Nav */}
      <nav className={`${open ? "block" : "hidden"} md:block`}>
        <NavLink
          to="/dashboard/user/profile"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          onClick={() => setOpen(false)}
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          onClick={() => setOpen(false)}
        >
          Orders
        </NavLink>
      </nav>
    </div>
  );
};

export default UserMenu;
