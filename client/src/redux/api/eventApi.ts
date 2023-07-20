import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const eventApi = createApi({
    reducerPath: 'eventReducerPath',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api'
    }),
    tagTypes: ['Event'],
    endpoints(builder) {
        return {
            fetchEvents: builder.query<any, void>({
                providesTags: ['Event'],
                query: () => {
                    return {
                        url: '/events',
                        method: 'GET',
                    }
                }
            }),
            fetchUserEvents: builder.query({
                providesTags: ['Event'],
                query: ({ userId }) => {
                    return {
                        url: `/events/users/${userId}`,
                        method: 'GET'
                    }
                }
            }),
            createEvent: builder.mutation({
                invalidatesTags: ['Event'],
                query: (event) => {
                    return {
                        url: '/events',
                        method: 'POST',
                        body: event
                    }
                }
            }),
            editEvent: builder.mutation({
                invalidatesTags: ['Event'],
                query: ({ eventId, event }) => {
                    return {
                        url: `/events/${eventId}`,
                        method: 'PATCH',
                        body: event
                    }
                }
            }),
            deleteEvent: builder.mutation({
                invalidatesTags: ['Event'],
                query: ({ eventId }) => {
                    return {
                        url: `/events/${eventId}`,
                        method: 'DELETE'
                    }
                }
            })
        }
    }
});

export const { 
    useFetchEventsQuery,
    useFetchUserEventsQuery, 
    useCreateEventMutation, 
    useEditEventMutation,
    useDeleteEventMutation
} = eventApi;

export { eventApi };