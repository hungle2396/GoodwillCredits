import { BrowserRouter} from "react-router-dom";
import Header from "./layout/Header";
import Copyright from "./layout/Copyright";
import ClientRoutes from "./Routes/ClientRoutes";

const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <BrowserRouter>
                <Header />
                    <ClientRoutes />
                <Copyright />
            </BrowserRouter>
        </div>
    )
};

export default App;