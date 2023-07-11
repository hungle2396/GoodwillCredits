import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ user }: protectedRoutesProps) => {
    const location = useLocation();
    console.log("In Protected Route Component");

    console.log("ProtectedRoute Data: ", user);

    if (!user) {
        if (location.pathname === '/') {
            return <Outlet />
        }

        if (location.pathname === '/login' || location.pathname === '/register') {
            console.log("Not logged in and in login and register route!");
            return <Outlet />
        }
        
        return <Navigate to='/login' />
    }

    if (user) {
        if (location.pathname === '/') {
            return <Navigate to='/dashboard' />
        }

        if (location.pathname === '/login' || location.pathname === '/register') {
            return <Navigate to='/dashboard' />
        }
    }

    return <Outlet />;
};

export default ProtectedRoutes;