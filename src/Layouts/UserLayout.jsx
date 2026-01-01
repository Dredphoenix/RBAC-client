import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserLayout = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "user" && user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }
  return(
    <div>
      <h1>User Dashboard</h1>
      <Outlet />
    </div>
  ); 
};
export default UserLayout;
