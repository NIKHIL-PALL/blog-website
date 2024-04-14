import React, { useContext, useState } from "react";
import {useNavigate} from "react-router-dom"
import AuthContext from "../../Contexts/AuthContext";
import ErrorModal from "../../Utils/ErrorModal";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const[isLoginMode, setIsLoginMode] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const handleOnSubmit = async(event) => {
    event.preventDefault();

    if(isLoginMode) {
        try{

            const response = await fetch(`http://localhost:5000/api/user/login`, {
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    email,
                    password
                })
            })
            const result = await response.json();
            if(!response.ok) {
              setError(result.message);
              return;
            }
            auth.login(result._id, result.name);
            navigate("/")
        }
        catch(err) {
            setError(err.message);
        }
    }
    else{
        try{
            
            const response = await fetch(`http://localhost:5000/api/user/signup`, {
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const result = await response.json();
            if(!response.ok) {
              setError(result.message);
              return;
            }
            auth.login(result._id, result.name);
            navigate("/");
        }
        catch(err) {
            setError(err.message);
        }
    }
    
};

  const changeMode = () => {
    if(isLoginMode) {
        setIsLoginMode(false);
    }
    else{
        setIsLoginMode(true)
    }
  }
  return (
    <React.Fragment>
      <form onSubmit={handleOnSubmit}>
        {error && <ErrorModal isOpen={true} message={error} onClose={() => setError("")}/>}
        <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-gray-700 text-lg font-bold">{isLoginMode ? "Login required" : "SignUp Required"}</h1>
            {!isLoginMode && <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div className="flex items-center justify-between">
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value={"Submit"}
            />
          </div>
          <div className="flex items-center justify-between my-3">
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={changeMode}
              value={`Switch to ${isLoginMode ? "Sign Up" : "Login"}`}
            />
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Auth;
