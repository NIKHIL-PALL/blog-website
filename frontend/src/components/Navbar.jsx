



import React from "react";
import logo from '../logo.svg';
 const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="flex  justify-between mx-7 items-center h-12">
        <img className="max-w-14" src={logo} alt="logo" />
        <ul className="flex space-x-6 font-mont">
          <li>Home</li>
          <li>Blog</li>
          <li>Contact</li>
          <li>Share</li>
        </ul>
      </nav>
      <hr />
    </React.Fragment>
  );
};

export default Navbar;
 