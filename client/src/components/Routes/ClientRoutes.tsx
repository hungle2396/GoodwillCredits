import { Routes, Route } from "react-router-dom";
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

const ClientRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route 
                path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route 
                path="/usersetting" element={<ProtectedRoute element={<UserSetting />} />}
            />

            <Route 
                path="/people" element={<ProtectedRoute element={<People />} />}
            />

            <Route 
                path="/logs" element={<ProtectedRoute element={<Logs />} />}
            />
        </Routes>
    )
}

export default ClientRoutes;