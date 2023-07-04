import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
    reducerPath: 'authReducerPath',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api'
    }),
    endpoints(builder) {
       return {
        fetchUser: builder.query<any, void>({
            query: () => {
                return {
                    url: '/current_user',
                    method: 'GET'
                }
            }
        }),
        userLogin: builder.mutation({
            query: (credentials) => {
                return {
                    url: '/login',
                    method: 'POST',
                    body: credentials
                }
            }
        }),
        userRegistration: builder.mutation({
            query: (credentials) => {
                return {
                    url: '/register',
                    method: 'POST',
                    body: credentials
                }
            }
        })
       }
    }
});

export const { 
    useFetchUserQuery, 
    useUserLoginMutation,
    useUserRegistrationMutation,
} = authApi;
export { authApi };