

import {createContext} from "react";

const AuthContext = createContext({
    userId : null,
    isLoggedIn : false,
    name  : "",
    login : () => {},
    logout : () => {}
})

export default AuthContext;

