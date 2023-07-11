import React, { useState, useEffect } from 'react';

import PreviewImage from '../../UI/img/cute_dog.jpg';
import HappyKid from '../../UI/img/Happy_Kid.jpg';
import EventShow from './EventShow';

import { useFetchEventsQuery } from '../../redux/store';

const EventList = () => {
    const [activeEvent, setActiveEvent] = useState<string>('');
    const { data: eventsData, isLoading, isError } = useFetchEventsQuery();

    useEffect(() => {
        if (eventsData && eventsData.length > 0) {
            setActiveEvent(eventsData[0].id);
        }
    }, [eventsData]);

    console.log('events: ', eventsData);
    let renderedEvents = null;

    if (isLoading) {
        renderedEvents = <p>Loading...</p>
    } else if (eventsData && Array.isArray(eventsData)) {
        renderedEvents = eventsData.map((event: eventProp) => {
            return ( 
                <EventShow event={event} hostImage={PreviewImage} participantImage={HappyKid} /> 
            )
        });
    }

    return (
        <div className="max-h-[46rem] hide-scrollbar py-2">
            <ul className='flex flex-col gap-5'>
                {eventsData && eventsData.length > 0 ? renderedEvents : <p className='text-2xl text-gray-400'>No Event So Far, Please Create One.</p>}
            </ul>
        </div>
    )
};

export default EventList;