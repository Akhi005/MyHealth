import React, { useContext } from "react";
import { AuthContext } from "/src/auth/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location=useLocation();
  console.log(loading);
  if (!user) {
    // return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;
    return <Navigate to='/signin' />;
  }

  if (user) {
    return children;
  }

};

export default PrivateRoutes;

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
