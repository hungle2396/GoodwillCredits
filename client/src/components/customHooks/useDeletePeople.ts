import { useDeleteUserMutation } from "../../redux/store";
import { authApi } from "../../redux/api/authApi";
import { store } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const useDeletePeople = () => {
    const [deletePeople, { isLoading: isDeletingPeople }] = useDeleteUserMutation();

    const navigate = useNavigate();

    const handleDeletePeople = async (accountId: string, userId: string, role: string) => {

        try {
            await deletePeople({
                userId: userId,
                accountId: accountId,
                role: role
            });

            if (role !== 'Admin') {
                // reset cache
                store.dispatch(authApi.util.resetApiState());
                
                navigate('/');
            }

            navigate('/people');
        } catch (error) {
            console.error('Error deleting user: ', error);
        }
    };

    return { handleDeletePeople, isDeletingPeople };
};

export default useDeletePeople;