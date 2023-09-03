import React, {useState} from 'react';
import { ReactComponent as SearchIcon } from '../../UI/img/searchIcon.svg';
import ParticipantForm from './ParticipantForm';

const ParticipantCreate = ({ event }: any) => {
    const [showParticipantModal, setShowParticipantModal] = useState<boolean>(false);
    const [participantSearch, setParticipantSearch] = useState<string>('');

    const handleOpenParticipantModal = () => {
        setShowParticipantModal(true);
    }

    const handleCloseParticipantModal = () => {
        setShowParticipantModal(false);
    }

    return (
        <div className='w-full flex justify-between px-5'>
            <div className='flex items-center rounded-md bg-secondary-grey-light p-2 w-72'>
                <SearchIcon className='w-4 h-4' />
                <input 
                    className='event_search bg-transparent text-gray-600 outline-none mx-2 w-full'
                    placeholder='Search Participant'
                    value={participantSearch}
                    onChange={(participant) => setParticipantSearch(participant?.target.value)}                              
                />
            </div>

            <button 
                className='btn-blue rounded-md'
                onClick={handleOpenParticipantModal}
            >
            Add Participant
            </button>

            {/* Create Participant Form */}
            {showParticipantModal && <ParticipantForm eventData={event} onClose={handleCloseParticipantModal} />}
        </div>
    )
};

export default ParticipantCreate;