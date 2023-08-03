import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { selectUser } from "../../store/reducers/auth";

export const RequireAuth = ({ children }) => {
  let location = useLocation();
  const user = useSelector(selectUser);

  if (user && user?.status === 0) {
    return <Navigate to="/confirm" state={{ from: location }} replace />;
  }

  if (!user.token) {
    return <Navigate to="/sign_in" state={{ from: location }} replace />;
  }

  return children;
};
