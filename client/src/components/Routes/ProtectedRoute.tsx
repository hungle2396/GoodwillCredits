import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, children }: protectedRouteProps) => {
    const location = useLocation();
    console.log("In Protected Route Component");

    console.log("ProtectedRoute Data: ", user);

    if (!user) {
        
        // If the user is not authenticated, and trying to go to landing route
        // Redirect to landing route
        if (location.pathname === '/') {
            return <Navigate to='/landing' />;
        }

        // User is not authenticated, and trying to go to Other routes
        // redirect to the login page
        return <Navigate to='/login' />;
    } else if (user) {
        console.log('user does exist');
        // If the user logged in, and going to the landing page
        // Redirect the user to dashboard instead
        if (location.pathname === '/') {
            return <Navigate to='/dashboard' />
        }
    } else {
        return <Navigate to='/error' />
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;