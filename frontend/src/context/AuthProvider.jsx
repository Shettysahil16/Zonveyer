import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const storedToken = Cookies.get("token");
    const storedUser = localStorage.getItem("messenger");

    const [authUser, setAuthUser] = useState(() => {
        if (storedToken) return storedToken;
        if (storedUser) return JSON.parse(storedUser); // <-- Parse here
        return null;
    });
    //console.log("Stored token:", storedToken);
    //console.log("Stored user:", storedUser);
    //console.log("AuthUser in Provider:", authUser);

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);