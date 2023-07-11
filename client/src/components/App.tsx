import { BrowserRouter } from 'react-router-dom';
import ClientRoutes from './routes/ClientRoutes';
import { useFetchUserQuery } from '../redux/store';


const App = () => {
    const { data, isLoading } = useFetchUserQuery();

    if (isLoading) {
        return <div>Loading...</div>
    }

    const userId = data?.id || '';
     
    console.log('data, ', data);
    // Check if the current route is the error page

    return (
        <div className="flex flex-col min-h-screen mx-20">
            <BrowserRouter>
                <ClientRoutes user={userId}  />
            </BrowserRouter>
        </div>
    )
};

export default App;