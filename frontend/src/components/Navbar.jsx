import React, { useContext, useEffect, useState } from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import ProfilePicture from "../Utils/ProfilePicture";
import AuthContext from "../Contexts/AuthContext";
import DropdownButton from "../Utils/DropdownButton";
const Navbar = () => {
  const auth = useContext(AuthContext);
  const [profile, setProfile] = useState();
  useEffect(() => {
    if (auth.isLoggedIn) {
      setProfile(auth.userId);
    } else {
      setProfile("Login");
    }
  }, [auth.isLoggedIn]);
  return (
    <React.Fragment>
      <nav className="flex  justify-between mx-7 items-center h-12">
        <img className="max-w-14" src={logo} alt="logo" />
        <ul className="flex space-x-6 font-mont justify-center items-center mr-14">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/"}>Blog</Link>
          </li>
          <li>
            <Link to={"/myblogs"}>My Blogs</Link>
          </li>
          <li>
            <Link to={"/"}>Contact</Link>
          </li>
          <li
            className={`p-2 ${
              !auth.isLoggedIn ? "bg-black" : ""
            }  text-white rounded-md  top-3`}
          >
              {auth.isLoggedIn ? (
                <DropdownButton userName={auth.name} />
              ) : (
                <Link to={'/blog'} >Login</Link>
              )}

            
          </li>
        </ul>
      </nav>
      <hr />
    </React.Fragment>
  );
};

export default Navbar;
