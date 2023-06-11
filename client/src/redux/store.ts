import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import rootReducer from "./reducers/rootReducer";
import { authApi } from "./api/authApi";

export const store = configureStore({
    reducer: {
        auth: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authApi.middleware);
    }
});

setupListeners(store.dispatch);


export { 
    useFetchUserQuery,
    useUserLoginMutation,
    useUserRegistrationMutation,
} from "./api/authApi";
