import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const PrivateRoutes = ({ children }) => {
  // login and continue from exact page without going back to homepage - step 6 (loading)
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // login and continue from exact page without going back to homepage - step 7 (step-8 in UserContext)
  if (loading) {
    return <div>Loading...</div>;
  }

  if (user && user.uid) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
