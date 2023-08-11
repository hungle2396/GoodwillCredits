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
            addParticipant: builder.mutation({
                invalidatesTags: ['Participant'],
                query: ({userId, eventId, email}) => {
                    return {
                        url: `/participants`,
                        method: 'POST',
                        body: {
                            userId,
                            eventId,
                            email
                        }
                    }
                }
            })
        }
    }
});

export const {
    useFetchParticipantsQuery,
    useAddParticipantMutation
} = participantApi;

export { participantApi };