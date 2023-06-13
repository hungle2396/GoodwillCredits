import { Navigate } from "react-router-dom";
import { useFetchUserQuery } from "../../redux/store";

const ProtectedRoute = ({ element }: protectedRouteProps) => {
    console.log("In Protected Route Component");
    const { data, isFetching } = useFetchUserQuery();

    console.log("ProtectedRoute Data: ", data);
    if (isFetching) {
        return <div>loading...</div>
    }

    if (!data) {
        // console.log("user is missing");
        // User is not authenticated, redirect to the login page
        return <Navigate to='/login' />;
    }


    return <>{element}</>;
};

export default ProtectedRoute;