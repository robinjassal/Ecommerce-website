import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function CheckAuth({ isAuthenticated, user, children }) {
    // Get the current location (path) from React Router
    const location = useLocation();

    // If the user is not authenticated and they're not already on the login or register pages,
    // redirect them to the login page.
    if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        return <Navigate to="/auth/login" />
    }

    // If the user is authenticated and they're trying to access login or register pages,
    // redirect them to either the admin dashboard (if role is admin) or the shop home page (if role is customer).
    if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        if (user?.role === 'admin') {
            return <Navigate to="/admin/dashboard" />  // Redirect admin to the admin dashboard
        } else {
            return <Navigate to="/shop/home" />  // Redirect non-admin user to the shop home page
        }
    }

    // If the user is authenticated and trying to access an 'admin' page but is not an admin,
    // redirect them to an unauthorized page.
    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')) {
        return <Navigate to="/unauth-page" />  // Redirect to unauthorized access page
    }

    // If the user is authenticated, is an admin, and trying to access a page under 'shop',
    // redirect them to the admin dashboard (they shouldn't be on shop pages).
    if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')) {
        return <Navigate to="/admin/dashboard" />  // Redirect admin to the admin dashboard
    }

    // If none of the above conditions apply, render the children (this allows access to protected routes).
    return children;
}

export default CheckAuth;
