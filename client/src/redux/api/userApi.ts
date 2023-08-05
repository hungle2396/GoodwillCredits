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
            createUser: builder.mutation({
                invalidatesTags: ['User'],
                query: (data) => {
                    return {
                        url: '/users',
                        body: data,
                        method: 'POST'
                    }
                }
            }),
            editUser: builder.mutation({
                invalidatesTags: ['User'],
                query: ({ accountId, newData }) => {
                    console.log('---- In the userApi! ------');
                    console.log('accountId: ', accountId);
                    console.log('personData: ', newData);
                    return {
                        url:`/users/edit/${accountId}`,
                        body: newData,
                        method: 'PUT'
                    }
                }
            }),
            deleteUser: builder.mutation({
                invalidatesTags: ['User'],
                query: ({ accountId, userId, role}) => {
                    return {
                        url: `/users/${accountId}`,
                        method: 'DELETE',
                        body: {
                            userId,
                            role
                        }
                    }
                }
            })
        }
    }
});

export const {
    useFetchUsersQuery,
    useCreateUserMutation,
    useEditUserMutation,
    useDeleteUserMutation
} = userApi;

export { userApi };