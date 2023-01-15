import { useState } from "react"
import React from 'react';


const AuthContext = React.createContext({
    idtoken : '',
    isLoggedIN : false,
    login : (token) => {},
    logout : ()=> {}
})

export  const AuthContextProvider = (props)=>{
    const [idtoken, setidtoken] = useState(null)

    const userisloggedin  = !! idtoken
    const loginhanler = (token) =>{
        setidtoken(token)
        
    }
    const logouthandler = ()=>{
        setidtoken(null)
    }
    const contextValue = {
        idtoken: idtoken,
        isLoggedIN: userisloggedin,
        login: loginhanler,
        logout: logouthandler,
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;