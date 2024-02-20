import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { loggedIn, loading } = useContext(AuthContext);
  console.log("isloggedin", loggedIn);

  if (loading) {
    return <div>loading...</div>;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
