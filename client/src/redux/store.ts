import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./api/authApi";
import { eventApi } from "./api/eventApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [eventApi.reducerPath]: eventApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(eventApi.middleware);
    }
});

setupListeners(store.dispatch);


export { 
    useFetchUserQuery,
    useUserLoginMutation,
    useUserRegistrationMutation,
} from './api/authApi';

export {
    useFetchEventsQuery,
    useFetchUserEventsQuery,
    useCreateEventMutation,
    useEditEventMutation,
    useDeleteEventMutation
} from './api/eventApi';
