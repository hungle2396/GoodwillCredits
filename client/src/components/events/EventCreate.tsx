import React, { useState, useEffect } from 'react';
import { ReactComponent as SearchIcon } from '../../UI/img/searchIcon.svg';
import EventForm from './EventForm';

const EventCreate = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showEventModal, setShowEventModal] = useState<boolean>(false);
    const [eventSearch, setEventSearch] = useState<string>('');

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleOpenEventModal = () => {
        setShowEventModal(true);
    }

    const handleCloseEventModal = () => {
        setShowEventModal(false);
    }

    const initialEventData = {
        id: '',
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        active: true,
        tag: 'Other'
    }

    return (
        <div className='w-full flex justify-between gap-5'>
            <div className='flex items-center rounded-md bg-secondary-grey-light p-2 w-96'>
                <SearchIcon className='w-4 h-4' />
                <input 
                    className='event_search bg-transparent text-gray-600 outline-none mx-2 w-full'
                    placeholder='Search Event'
                    value={eventSearch}
                    onChange={(event) => setEventSearch(event?.target.value)}                              
                />
            </div>

            <button 
                className='btn-blue-sm rounded-md text-sm'
                onClick={handleOpenEventModal}
            >{
                windowWidth <= 640 ? '+' : 'Create Event'
            }
            </button>

            {/* Create Event Form */}
            {showEventModal && <EventForm mode='create' eventData={initialEventData} onClose={handleCloseEventModal} onCloseSetting={handleCloseEventModal} />}
        </div>
    )
};

export default EventCreate;