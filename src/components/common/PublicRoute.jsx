import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../store/slices/authSlice";

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log("isa", isAuthenticated);
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PublicRoute;
