import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from './api/authApi';
import { eventApi } from './api/eventApi';
import { userApi } from './api/userApi';
import { participantApi } from './api/participantApi';
import { taskApi } from './api/taskApi';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [eventApi.reducerPath]: eventApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [participantApi.reducerPath]: participantApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(eventApi.middleware)
        .concat(userApi.middleware)
        .concat(participantApi.middleware)
        .concat(taskApi.middleware)
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
    useFetchParticipantsQuery,
    useAddParticipantMutation,
    useDeleteParticipantMutation
} from './api/participantApi';

export {
    useFetchTasksQuery,
    useFetchApprovalTasksQuery,
    useAddTaskMutation,
    useApprovalTaskMutation
} from './api/taskApi';