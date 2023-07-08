import React, { useState, useEffect } from 'react';
import { useFetchEventsQuery } from '../../redux/store';

import PreviewImage from '../../UI/img/cute_dog.jpg';
import HappyKid from '../../UI/img/Happy_Kid.jpg';
import EventShow from './EventShow';


const EventList = () => {
    const [activeEvent, setActiveEvent] = useState<string>('');
    const { data: eventsData, isError, isLoading } = useFetchEventsQuery();

    const handleActiveEvent = (eventId: string) => {
        setActiveEvent(eventId);
    };

    useEffect(() => {
        if (eventsData && eventsData.length > 0) {
            setActiveEvent(eventsData[0].id);
        }
    }, [eventsData]);

    let renderedEvents = null;

    if (isLoading) {
        renderedEvents = <p>Loading...</p>
    } else if (eventsData && Array.isArray(eventsData)) {
        renderedEvents = eventsData.map((event: eventProp) => {
            
            const isActive = activeEvent === event.id ? 'text-white bg-primary-purple-dark' : '';
            
            return ( 
                <EventShow event={event} hostImage={PreviewImage} participantImage={HappyKid} onClickActive={handleActiveEvent} active={isActive} /> 
            )
        });
    }

    return (
        <ul className='flex flex-col my-10 gap-3 max-h-[41rem] hide-scrollbar'>
            {eventsData ? renderedEvents : 'No Event So Far, Please Create One.'}
        </ul>
    )
};

export default EventList;