import { BrowserRouter} from "react-router-dom";
import Header from "./common/Header";
import Copyright from "./common/Copyright";
import ClientRoutes from "./Routes/ClientRoutes";

const App = () => {
    return (
        <div className="flex flex-col min-h-screen mx-10">
            <BrowserRouter>
                <Header />
                    <ClientRoutes />
                <Copyright />
            </BrowserRouter>
        </div>
    )
};

export default App;