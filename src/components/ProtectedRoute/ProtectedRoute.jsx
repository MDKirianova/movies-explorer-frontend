import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props }) => {

  if (props.isAuthChecking) {
    return <div>Loading...</div>;
  }

  return props.isAuthorized ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
