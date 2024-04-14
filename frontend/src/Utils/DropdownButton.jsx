


import React, { useContext, useState } from 'react';
import AuthContext from '../Contexts/AuthContext';
import { Link } from 'react-router-dom';
const DropdownButton = ({userName}) => {


  const auth = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const firstLetter = userName.charAt(0).toUpperCase();
    const colors = ['#FF5733', '#FFC300', '#FF5733', '#FFC300', '#FF5733'];
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () =>{
    auth.logout();
  }

  return (
    <div >
      <button onClick={toggleDropdown} className="font-medium font-mont text-white w-10 rounded-full flex items-center justify-center text-2xl h-10" style={{backgroundColor : `${colors[firstLetter.charCodeAt(0) % colors.length]}` }} >
            {firstLetter}
        </button>
      {isOpen&& auth.isLoggedIn && (
        <div className="absolute  text-black bg-white border shadow-md">
          <ul>
            <li className="px-4 py-2"><Link to={'/myblogs'}>My Blogs</Link></li>
            <li className="px-4 py-2"><button onClick={handleLogout}>Log out</button></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;