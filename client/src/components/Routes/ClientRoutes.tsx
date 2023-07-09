import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "../layout/Landing";
import About from "../layout/About";
import Contact from "../layout/Contact";
import Register from "../layout/Register";
import Login from "../layout/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../layout/Dashboard";
import UserSetting from "../layout/UserSetting";
import People from "../layout/People";
import Logs from "../layout/Logs";
import Error from "../layout/Error";
import Header from "../common/Header";
import Copyright from "../common/Copyright";

const ClientRoutes = ( { user }: clientRoutesProp ) => {
    const location = useLocation();
    const isErrorPage = location.pathname === '/error';

    return (
        <>
            {!isErrorPage && <Header />}
            <Routes>
                <Route path="/landing" element={<Landing />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute user={user} />}>
                    <Route path='/' element={<Landing />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/usersetting' element={<UserSetting />} />
                    <Route path='/people' element={<People />} />
                    <Route path='/logs' element={<Logs />} />
                </Route>

                {/* Error Page */}
                <Route path='*' element={<Error />} />
            </Routes>
            {!isErrorPage && <Copyright />}
        </>
    )
}

export default ClientRoutes;