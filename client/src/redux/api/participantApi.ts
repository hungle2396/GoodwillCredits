import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const participantApi = createApi({
    reducerPath: 'participantReducerPath',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/participants'
    }),
    tagTypes: ['Participant'],
    endpoints(builder) {
        return {
            fetchParticipants: builder.query({
                providesTags: ['Participant'],
                query: ({ eventId }) => {
                    return {
                        url: `/event/${eventId}`,
                        method: 'GET'
                    }
                }
            }),
            addParticipant: builder.mutation({
                invalidatesTags: ['Participant'],
                query: ({userId, eventId, email}) => {
                    return {
                        url: `/`,
                        method: 'POST',
                        body: {
                            userId,
                            eventId,
                            email
                        }
                    }
                }
            }),
            deleteParticipant: builder.mutation({
                invalidatesTags: ['Participant'],
                query: ({userId, participantId, isHost}) => {
                    return {
                        url: `/${participantId}`,
                        method: 'DELETE',
                        body: {
                            userId,
                            isHost
                        }
                    }
                }
            })
        }
    }
});

export const {
    useFetchParticipantsQuery,
    useAddParticipantMutation,
    useDeleteParticipantMutation
} = participantApi;

export { participantApi };