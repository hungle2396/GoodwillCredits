import React from 'react';
import { useFetchParticipantsQuery } from '../../redux/store';
import { CircularProgress } from '@mui/material';
import ParticipantShow from './ParticipantShow';
import { useFetchUserQuery } from '../../redux/store';

const ParticipantList = ({ isHost, eventId }: participantListProps) => {
    const { data: userData, isLoading: isUserLoading, isError: isUserError} = useFetchUserQuery();

    const {data: participantsData, isLoading: isParticipantsLoading } = useFetchParticipantsQuery({ eventId: eventId });

    if (isUserLoading) {
        return <CircularProgress />
    }

    if (isUserError) {
        return <h1>Error Getting User Data</h1>
    }

    let renderedParticipants = null;

    if (isParticipantsLoading) {
        return <CircularProgress />
    } else if (participantsData) {
        const filteredParticipants = participantsData.filter((participant: participantProp)=> {
            return isHost ? !participant.isHost : true;
        });

        renderedParticipants = filteredParticipants.map((participant: participantProp) => {
            return (
                <ParticipantShow key={participant.id} user={userData} participant={participant} isHost={isHost} />
            )
        })
    }

    return (
        <ul className='gap-5 h-[25rem] hide-scrollbar px-5 my-5'>
            {renderedParticipants.length > 0 ? (
                renderedParticipants
            ) : (
                <p className='text-secondary-grey text-2xl'>No Participants here. Please add new participants to this event.</p>
            )}
        </ul>
    )
};

export default ParticipantList;