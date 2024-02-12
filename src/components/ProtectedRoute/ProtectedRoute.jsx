import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props }) => {

  if (props.isAuthChecking) {
    return <div>Loading...</div>;
  }

  return props.isAutorized ? (
    <Component {...props} />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default ProtectedRoute;
