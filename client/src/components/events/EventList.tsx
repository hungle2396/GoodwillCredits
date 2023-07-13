import React, { useState, useEffect } from 'react';

import PreviewImage from '../../UI/img/cute_dog.jpg';
import HappyKid from '../../UI/img/Happy_Kid.jpg';
import EventShow from './EventShow';

import { useFetchEventsQuery } from '../../redux/store';

const EventList = () => {
    const { data: eventsData, isLoading, isError } = useFetchEventsQuery();

    console.log('events: ', eventsData);
    let renderedEvents = null;

    if (isLoading) {
        renderedEvents = <p>Loading...</p>
    } else if (eventsData && Array.isArray(eventsData)) {
        renderedEvents = eventsData.map((event: eventProp) => {
            return ( 
                <EventShow key={event.id} event={event} hostImage={PreviewImage} participantImage={HappyKid} /> 
            )
        });
    }

    return (
        <div className="h-[44rem] hide-scrollbar py-2">
            <ul className='flex flex-col gap-4'>
                {eventsData && eventsData.length > 0 ? renderedEvents : <p className='text-2xl text-gray-400'>No Event So Far, Please Create One.</p>}
            </ul>
        </div>
    )
};

export default EventList;