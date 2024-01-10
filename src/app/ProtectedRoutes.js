import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../features/user/userSlice';

const ProtectedRoutes = ({ children }) => {
    const user = useSelector(selectUserInfo);

    // Redirect to '/login' if user is not logged in
    if (!user) {
        return <Navigate to="/login" replace={true} />;
    }

    // Render children if user is logged in
    return <div>{children}</div>;
}

export default ProtectedRoutes;
