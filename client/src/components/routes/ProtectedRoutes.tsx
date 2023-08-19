import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ user }: protectedRoutesProps) => {
    const location = useLocation();

    if (!user) {
        if (location.pathname === '/') {
            return <Outlet />
        }

        if (location.pathname === '/login' || location.pathname === '/register') {
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