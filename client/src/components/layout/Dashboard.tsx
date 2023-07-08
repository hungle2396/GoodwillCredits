import React, { useState } from 'react';
import EventForm from '../Events/EventForm';
import Navigation from '../common/Navigation';

import { ReactComponent as SearchIcon } from '../../UI/img/searchIcon.svg';

import EventList from '../Events/EventList';

const Dashboard = () => {
    console.log("In the dashboard component");
    const [showEventModal, setShowEventModal] = useState<boolean>(false);
    const [eventSearch, setEventSearch] = useState<string>('');

    const handleOpenEventModal = () => {
        setShowEventModal(true);
    }

    const handleCloseEventModal = () => {
        setShowEventModal(false);
    }
     

    return (
        <main className="flex-grow relative">
            {/* App Navigation */}
            <Navigation isActive='events' />
            
            {/* Left Panel */}
            <div className='w-1/2 flex flex-col my-5'>

                {/* Event Search and Create Event */}
                <div className='w-full flex justify-between'>
                    <div className='flex items-center rounded-md bg-secondary-grey-light p-2 w-96'>
                        <SearchIcon className='w-4 h-4' />
                        <input 
                            className='event_search bg-transparent text-gray-600 outline-none mx-2'
                            placeholder='Search Event'
                            value={eventSearch}
                            onChange={(event) => setEventSearch(event?.target.value)}
                        />
                    </div>

                    <button 
                        className='btn-blue rounded-md'
                        onClick={handleOpenEventModal}
                    >
                    Create Event
                    </button>
                </div>
                
                {/* Display Event List */}
                <EventList />
                
            </div>

            {/* Right Panel */}
            <div>

            </div>

            {/* Create Event Form */}
            {showEventModal && <EventForm onClose={handleCloseEventModal} />}
        </main>
    )
};

export default Dashboard;