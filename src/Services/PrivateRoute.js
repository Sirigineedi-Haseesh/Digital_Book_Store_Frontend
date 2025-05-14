import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn, element }) => {
  const location = useLocation();

  if (!isLoggedIn) {
    // Use location.pathname for the 'from' path
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return element;
};
export default PrivateRoute;