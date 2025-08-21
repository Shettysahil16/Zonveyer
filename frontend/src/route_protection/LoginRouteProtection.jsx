import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

function LoginRouteProtection({children}) {
    const [authUser] = useAuth();
    //console.log("loginRoute",authUser);
    
    if(authUser){
        return <Navigate to="/" replace />;
    }

    return children;
}

export default LoginRouteProtection
