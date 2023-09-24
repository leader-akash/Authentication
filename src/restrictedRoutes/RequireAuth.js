import React from 'react'
import { useLocation, Outlet, Navigate } from 'react-router';

const RequireAuth = () => {
    const isAllowed = localStorage.getItem('token');
    const location = useLocation();

  return isAllowed ? <Outlet /> : <Navigate to='/' state={{from : location}} replace />

}

export default RequireAuth
