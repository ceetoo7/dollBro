import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-indigo-500 text-white p-20px ">
      <h4 className="text-center"> All Right Reserved &copy; Doll Bro</h4>
      <p className="text-center text-sm m-2 p-4 hover:text-blue-300">
        <Link to="/about">About</Link>|<Link to="/policy">Policy</Link>|
        <Link to="/contact">Contact</Link>
      </p>
    </div>
  );
};

export default Footer;
