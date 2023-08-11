import React from 'react';
import { useFetchParticipantsQuery } from '../../redux/store';
import { CircularProgress } from '@mui/material';
import ParticipantShow from './ParticipantShow';

const ParticipantList = ({ eventId }: participantListProps) => {
    console.log('eventId: ', eventId);

    const {data: participantsData, isLoading: isParticipantsLoading } = useFetchParticipantsQuery({ eventId: eventId });

    let renderedParticipants = null;

    if (isParticipantsLoading) {
        return <CircularProgress />
    } else if (participantsData) {
        renderedParticipants = participantsData.map((participant: any) => {
            return (
                <ParticipantShow key={participant.id} participant={participant} />
            )
        })
    }

    console.log('participants: ', participantsData);

    return (
        <ul className='gap-5 hide-scrollbar px-5 my-5'>
            {renderedParticipants}
        </ul>
    )
};

export default ParticipantList;