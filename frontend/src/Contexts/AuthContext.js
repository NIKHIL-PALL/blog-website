

import {createContext} from "react";

const AuthContext = createContext({
    userId : null,
    isLoggedIn : false,
    
    login : () => {},
    logout : () => {}
})

export default AuthContext;

