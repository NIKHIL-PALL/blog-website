
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";

const Hero = () => {
    const auth = useContext(AuthContext)

    return(
        <React.Fragment>
        <div className="min-w-full bg-slate-800  font-bask text-white py-4 px-10">
            <h1 className="text-4xl my-2">Stay Curious</h1>
            <h3 className="text-base my-10">Discover stories, thinking, and expertise from writers on any topic.</h3>
            <Link to={`${auth.isLoggedIn ? "/create" : "/blog"} `} className="p-4 mx-2 my-5 bg-white text-black rounded-md">Write a Blog</Link>
        </div>
        
        
        </React.Fragment>
    );

}

export default Hero;