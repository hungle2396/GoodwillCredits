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
            }),
            deleteUser: builder.mutation({
                invalidatesTags: ['User'],
                query: ({ accountId, userId, role }) => {
                    return {
                        url: `/users/${accountId}`,
                        method: 'DELETE',
                        body: {
                            role,
                            userId
                        }
                    }
                }
            })
        }
    }
});

export const {
    useFetchUsersQuery,
    useDeleteUserMutation
} = userApi;

export { userApi };