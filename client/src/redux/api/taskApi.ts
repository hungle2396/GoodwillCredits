import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const taskApi = createApi({
    reducerPath: 'taskReducerPath',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/tasks'
    }),
    tagTypes: ['Task'],
    endpoints(builder) {
        return {
            fetchTasks: builder.query({
                providesTags: ['Task'],
                query: () => {
                    return {
                        url: '/',
                        method: 'GET'
                    }
                }
            }),
            addTask: builder.mutation({
                invalidatesTags: ['Task'],
                query: (taskData) => {
                    return {
                        url: `/`,
                        method: 'POST',
                        body: taskData
                    }
                }
            })
        }
    }
});

export const {
    useFetchTasksQuery,
    useAddTaskMutation,
} = taskApi;

export { taskApi };