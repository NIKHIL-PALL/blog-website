import "./App.css";
import "./index.css"

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthContext from './Contexts/AuthContext';


import NewBlog from './components/pages/NewBlog';
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home"
import Auth from './components/pages/Auth';
import MyBlogs from './components/pages/MyBlogs';
import EditBlog from "./components/pages/EditBlog";


function App() {
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [userId, setUserId ] = useState(null);
  const login = (userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
  }

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
  }
  
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <AuthContext.Provider value={{isLoggedIn : isLoggedIn,login : login, logout : logout , userId : userId}}>
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path="/blog" exact Component={Auth}/>
          <Route path='/myblogs' exact Component={MyBlogs}/>
          <Route path="/create" exact Component={NewBlog}/>
          <Route path='/edit/:bid' exact Component={EditBlog}/>
        </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
