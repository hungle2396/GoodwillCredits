import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
    reducerPath: 'userReducerPath',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api'
    }),
    tagTypes: ['User'],
    endpoints(builder) {
        return {
            fetchUsers: builder.query<any, void>({
                providesTags: ['User'],
                query: () => {
                    return {
                        url: '/users',
                        method: 'GET'
                    }
                }
            })
        }
    }
});

export const {
    useFetchUsersQuery
} = userApi;

export { userApi };