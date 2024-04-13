



import React from "react";
import logo from '../logo.svg';
import { Link } from "react-router-dom";
 const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="flex  justify-between mx-7 items-center h-12">
        <img className="max-w-14" src={logo} alt="logo" />
        <ul className="flex space-x-6 font-mont">
          <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/"}>Blog</Link></li>
          <li><Link to={"/myblogs"}>My Blogs</Link></li>
          <li><Link to={"/"}>Contact</Link></li>
          <li><Link to={"/"}>Share</Link></li>
          
        </ul>
      </nav>
      <hr />
    </React.Fragment>
  );
};

export default Navbar;
 