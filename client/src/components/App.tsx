import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import About from "./About";
import Contact from "./Contact";
import Copyright from "./Copyright";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {

    console.log("In the App Component");
    return (
        <div className="flex flex-col min-h-screen">
            <BrowserRouter>
                <Header />
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
                <Copyright />
            </BrowserRouter>
        </div>
    )
};

export default App;