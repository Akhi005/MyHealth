import React, { useContext } from "react";
import { AuthContext } from "./_auth/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location=useLocation();
  console.log(location.pathname);
  if (loading) {
    return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to='/signin' />;
};

export default PrivateRoutes;

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
