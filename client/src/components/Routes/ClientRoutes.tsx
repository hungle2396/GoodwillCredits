import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Landing from "../layout/Landing";
import About from "../layout/About";
import Contact from "../layout/Contact";
import Register from "../layout/Register";
import Login from "../layout/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../layout/Dashboard";
import UserSetting from "../layout/UserSetting";
import People from "../layout/People";
import Logs from "../layout/Logs";
import Error from "../layout/Error";
import Header from "../common/Header";
import Copyright from "../common/Copyright";

const ClientRoutes = ( { user }: clientRoutesProp ) => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                
                <Route element={<ProtectedRoutes user={user} />}>
                    <Route path='/' element={<Landing />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/usersetting' element={<UserSetting />} />
                    <Route path='/people' element={<People />} />
                    <Route path='/logs' element={<Logs />} />
                </Route>

                
                {/* Error Page */}
                <Route path='*' element={<Error />} />
            </Routes>
            <Copyright />
        </>
    )
}

export default ClientRoutes;