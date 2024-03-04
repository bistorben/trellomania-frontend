import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loggedIn, loading } = useContext(AuthContext);

  if (loading) {
    return <div>loading...</div>;
  }

  return loggedIn ? children : <Navigate to="/register" replace />;
};

export default ProtectedRoute;
