import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const participantApi = createApi({
    reducerPath: 'participantReducerPath',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api'
    }),
    tagTypes: ['Participant'],
    endpoints(builder) {
        return {
            fetchParticipants: builder.query({
                providesTags: ['Participant'],
                query: ({ eventId }) => {
                    return {
                        url: `/participants/event/${eventId}`,
                        method: 'GET'
                    }
                }
            }),
        }
    }
});

export const {
    useFetchParticipantsQuery,
} = participantApi;

export { participantApi };