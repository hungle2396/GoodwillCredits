import React, { useState, useEffect } from 'react';

import PreviewImage from '../../UI/img/cute_dog.jpg';
import HappyKid from '../../UI/img/Happy_Kid.jpg';
import EventShow from './EventShow';

import { useFetchUserEventsQuery } from '../../redux/store';
import { useFetchUserQuery } from "../../redux/store";


const EventList = () => {
    const { data: userData, isLoading: isUserLoading } = useFetchUserQuery();
    const { data: eventsData, isLoading: isEventsLoading, isError } = useFetchUserEventsQuery({ userId: userData.id });

    let renderedEvents = null;

    if (isUserLoading || isEventsLoading) {
        renderedEvents = <p>Loading...</p>
    } else if (eventsData && Array.isArray(eventsData)) {
        renderedEvents = eventsData.map((event: eventProp) => {
            return ( 
                <EventShow 
                    key={event.id} 
                    event={event}
                /> 
            )
        });
    }

    if (isError) {
        return <p>Error fetching data</p>;
    }

    return (
        <div className="h-[45rem] hide-scrollbar py-2">
            <ul className='flex flex-col gap-5 px-5'>
                {eventsData && eventsData.length > 0 ? renderedEvents : <p className='text-2xl text-gray-400'>No Event So Far, Please Create One.</p>}
            </ul>
        </div>
    )
};

export default EventList;