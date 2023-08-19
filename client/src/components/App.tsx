import { BrowserRouter } from 'react-router-dom';
import ClientRoutes from './routes/ClientRoutes';
import { useFetchUserQuery } from '../redux/store';


const App = () => {
    const { data, isLoading } = useFetchUserQuery();

    if (isLoading) {
        return <div>Loading...</div>
    }

    const userId = data?.id || '';

    return (
        <div className="body">
            <BrowserRouter>
                <ClientRoutes user={userId}  />
            </BrowserRouter>
        </div>
    )
};

export default App;