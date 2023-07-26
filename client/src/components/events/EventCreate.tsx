import React, {useState} from 'react';
import { ReactComponent as SearchIcon } from '../../UI/img/searchIcon.svg';
import EventForm from './EventForm';

const EventCreate = () => {
    const [showEventModal, setShowEventModal] = useState<boolean>(false);
    const [eventSearch, setEventSearch] = useState<string>('');

    const handleOpenEventModal = () => {
        setShowEventModal(true);
    }

    const handleCloseEventModal = () => {
        setShowEventModal(false);
    }

    return (
        <div className='w-full flex justify-between'>
            <div className='flex items-center rounded-md bg-secondary-grey-light p-2 w-96 ml-5'>
                <SearchIcon className='w-4 h-4' />
                <input 
                    className='event_search bg-transparent text-gray-600 outline-none mx-2 w-full'
                    placeholder='Search Event'
                    value={eventSearch}
                    onChange={(event) => setEventSearch(event?.target.value)}                              
                />
            </div>

            <button 
                className='btn-blue rounded-md mr-5'
                onClick={handleOpenEventModal}
            >
            Create Event
            </button>

            {/* Create Event Form */}
            {showEventModal && <EventForm mode='create' eventData={''} onClose={handleCloseEventModal} />}
        </div>
    )
};

export default EventCreate;