import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const PublicRoute = () => {
  const { isLoggedIn, user } = useContext(AuthContext);

  if (user?.role === "Student") return <Navigate to="/home" />;
  if (user?.role === "Mentor") return <Navigate to="/mentor/dashboard" />;
  
  return <Outlet />;
  // return isLoggedIn ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
