import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from './api/authApi';
import { eventApi } from './api/eventApi';
import { userApi } from './api/userApi';
import { participantApi } from './api/participantApi';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [eventApi.reducerPath]: eventApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [participantApi.reducerPath]: participantApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(eventApi.middleware)
        .concat(userApi.middleware)
        .concat(participantApi.middleware)
    }
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export { 
    useFetchUserQuery,
    useUserLoginMutation,
    useUserRegistrationMutation,
} from './api/authApi';

export {
    useFetchUsersQuery,
    useCreateUserMutation,
    useEditUserMutation,
    useDeleteUserMutation
} from './api/userApi';

export {
    useFetchEventsQuery,
    useFetchUserEventsQuery,
    useCreateEventMutation,
    useEditEventMutation,
    useDeleteEventMutation
} from './api/eventApi';

export {
    useFetchParticipantsQuery
} from './api/participantApi';