import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

function RouteProtection({ children }) {
    const [authUser] = useAuth();
    //console.log();
    
    if (!authUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default RouteProtection
