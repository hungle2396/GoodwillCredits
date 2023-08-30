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
            fetchApprovalTasks: builder.query({
                providesTags: ['Task'],
                query: ({ eventId }) => {
                    return {
                        url: `/event/${eventId}`,
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
            }),
            approvalTask: builder.mutation({
                invalidatesTags: ['Task'],
                query: (task) => {
                    return {
                        url: `/approval/${task.taskId}`,
                        method: 'POST',
                        body: task
                    }
                }
            })
        }
    }
});

export const {
    useFetchTasksQuery,
    useFetchApprovalTasksQuery,
    useAddTaskMutation,
    useApprovalTaskMutation
} = taskApi;

export { taskApi };