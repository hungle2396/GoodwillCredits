import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ user, children }: protectedRoutesProps) => {
    const location = useLocation();
    console.log("In Protected Route Component");

    console.log("ProtectedRoute Data: ", user);

    return user ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoutes;