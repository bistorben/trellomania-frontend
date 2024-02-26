import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loggedIn, loading } = useContext(AuthContext);
  console.log("isloggedin", loggedIn);

  if (loading) {
    return <div>loading...</div>;
  }

  return loggedIn ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
