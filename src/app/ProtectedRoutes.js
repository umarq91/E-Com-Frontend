import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../features/auth/AuthSlice';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    const user = useSelector(selectLoggedInUser);

    // Redirect to '/login' if user is not logged in
    if (!user) {
        return <Navigate to="/login" replace={true} />;
    }

    // Render children if user is logged in
    return <div>{children}</div>;
}

export default ProtectedRoutes;
