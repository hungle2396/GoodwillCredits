import { BrowserRouter } from 'react-router-dom';
import Header from './common/Header';
import Copyright from './common/Copyright';
import ClientRoutes from './Routes/ClientRoutes';
import { useFetchUserQuery } from '../redux/store';


const App = () => {
    const { data, isLoading } = useFetchUserQuery();

    if (isLoading) {
        return <div>Loading...</div>
    }

    const userId = data?.id || '';

    // Check if the current route is the error page

    return (
        <div className="flex flex-col min-h-screen mx-10">
            <BrowserRouter>
                <ClientRoutes user={userId} />
            </BrowserRouter>
        </div>
    )
};

export default App;