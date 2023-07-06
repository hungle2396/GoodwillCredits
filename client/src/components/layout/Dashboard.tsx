import React, { useState } from 'react';
import EventForm from '../forms/EventForm';
import Navigation from '../common/Navigation';

import { ReactComponent as SearchIcon } from '../../UI/img/searchIcon.svg';
import { ReactComponent as StarsIcon } from '../../UI/img/3-stars.svg';
import PreviewImage from '../../UI/img/cute_dog.jpg';
import HappyKid from '../../UI/img/Happy_Kid.jpg';

// import { useFetchUserQuery } from "../../redux/store";
import { useFetchEventsQuery } from '../../redux/store';


const Dashboard = () => {
    console.log("In the dashboard component");
    const [showEventModal, setShowEventModal] = useState<boolean>(false);
    const [eventSearch, setEventSearch] = useState<string>('');

    // const { data } = useFetchUserQuery();
    const { data: eventsData, isLoading } = useFetchEventsQuery();

    const handleOpenEventModal = () => {
        setShowEventModal(true);
    }

    const handleCloseEventModal = () => {
        setShowEventModal(false);
    }

    console.log(eventsData);

    let renderedEvents = null;

    if (isLoading) {
        renderedEvents = <p>Loading...</p>
    } else if (eventsData && Array.isArray(eventsData)) {
        renderedEvents = eventsData.map((event: eventProp) => {
            console.log(event);
            return (
                <li 
                    key={event.id}
                    className='flex items-center shadow-box rounded-md px-5 py-5'>
                    <div className='flex-shrink-0 flex flex-col items-center gap-1'>
                        <img src={PreviewImage} className='w-14 h-14 rounded-full' alt='test cute dog'/>
    
                        <p className='text-md font-medium'>Ucbi</p>
                    </div>
    
                    <div className='mx-5 px-2'>
                        <h1 className='text-xl font-semibold'>{event.name}</h1>

                        <p>{event.start_date} - {event.end_date}</p>

                        <p className='mt-2'>{event.description}</p>
                    </div>
    
                    <div className='flex flex-col items-center gap-1 flex-shrink-0 ml-auto border-transparent border-l-secondary-grey-light border pl-5'>
                        <StarsIcon className='w-5 h-5 star-icon' />

                        <img src={HappyKid} className='w-14 h-14 rounded-full' alt='preview' />

                        <h1>Kid</h1>
                    </div>
                </li>
            )
        });
    }
     

    return (
        <main className="flex-grow relative">
            <Navigation isActive='events' />

            
            <div className='w-1/2 flex flex-col my-5'>
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
                

                <ul className='flex flex-col my-5 gap-5'>
                    {renderedEvents}
                </ul>
            </div>
            
            

            {showEventModal && <EventForm onClose={handleCloseEventModal} />}
        </main>
    )
};

export default Dashboard;