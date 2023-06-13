import { Routes, Route } from "react-router-dom";
import Landing from "../layout/Landing";
import About from "../layout/About";
import Contact from "../layout/Contact";
import Register from "../layout/Register";
import Login from "../layout/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../layout/Dashboard";

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
        </Routes>
    )
}

export default ClientRoutes;