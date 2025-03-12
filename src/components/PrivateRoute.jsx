import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export const PrivateRoute = () => {
    const {currentUser} = useAuth()

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
