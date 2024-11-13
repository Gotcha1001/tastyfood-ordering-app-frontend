import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import the spinner

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    // Display a spinner while loading
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={100} color={"#4A90E2"} loading={isLoading} />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
