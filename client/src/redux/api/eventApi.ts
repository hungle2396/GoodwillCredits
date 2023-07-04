import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const eventApi = createApi({
    reducerPath: 'eventReducerPath',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api'
    }),
    tagTypes: ['Event'],
    endpoints(builder) {
        return {
            fetchEvents: builder.query({
                providesTags: ['Event'],
                query: () => {
                    return {
                        url: '/events',
                        method: 'GET',
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
            })
        }
    }
});

export const { useFetchEventsQuery, useCreateEventMutation } = eventApi;

export { eventApi };