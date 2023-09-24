import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router';

const RestrictAuth = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();
  return token ? <Navigate to='/profile' state={{from: location}} replace /> : <Outlet /> 
}

export default RestrictAuth