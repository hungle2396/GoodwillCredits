import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../common/Navigation';
import { useFetchUserQuery } from "../../redux/store";
import { useFetchUserEventsQuery } from '../../redux/store';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as RightArrowIcon } from '../../UI/img/right-chevron.svg';
import { MonthDayYear } from '../utils/Formatting';

import ParticipantList from '../participants/ParticipantList';
import ParticipantCreate from '../participants/ParticipantCreate';

const EventDetails = () => {
    const { id } = useParams();
    
    const { data: userData, isLoading: isUserLoading } = useFetchUserQuery();
    const { data: eventsData, isLoading: isEventsLoading, isError } = useFetchUserEventsQuery({ userId: userData.id });

    if (isUserLoading || isEventsLoading) {
        return <CircularProgress />
    }

    if (isError) {
        return <p>Error fetching data</p>;
    }

    const event = eventsData.find((event: eventProp) => {
        return event.id === id;
    });

    return (
        <main className='relative
                         flex gap-5 my-5
                        '
        >
            <div className='basis-1/5'>
                <Navigation isActive='events' />
            </div>
            
            <div className='basis-3/5
                            flex flex-col
                           '
            >
               <div className='flex gap-2 items-center'>
                    <Link to={'/events'}>Events</Link>
                    <RightArrowIcon className='w-4 h-3' />
                    <p>Event Details</p>
                </div>

                <div className='eventDetails_container flex flex-col gap-5 h-full'>
                    <h1 className='text-3xl font-semibold mt-5'>{event.name}</h1>

                    <div className='flex gap-5 justify-between'>
                        <div>
                            <h4 className='text-md font-normal text-secondary-grey'>Host</h4>
                            <h3>{event.host.firstName} {event.host.lastName}</h3>
                        </div>

                        <div>
                            <h4 className='text-md font-normal text-secondary-grey'>Status</h4>
                            <h3>{event.active ? 'Active' : 'Inactive'}</h3>
                        </div>

                        <div>
                            <h4 className='text-md font-normal text-secondary-grey'>Tag</h4>
                            <h3>{event.tag}</h3>
                        </div>

                        <div>
                            <h4 className='text-md font-normal text-secondary-grey'>Start Date</h4>
                            <h3>{MonthDayYear(event.startDate)}</h3>
                        </div>

                        <div>
                            <h4 className='text-md font-normal text-secondary-grey'>End Date</h4>
                            <h3>{MonthDayYear(event.endDate)}</h3>
                        </div>
                    </div>

                    <div>
                        <h4 className='text-md font-normal text-secondary-grey'>Description</h4>
                        <p>{event.description}</p>
                    </div>

                    <div className='participant_container bg-secondary-grey-light-2 rounded-md p-5 h-full'>
                        <div>
                            <h1 className='text-2xl font-medium ml-5 mb-5'>Participants</h1>

                            <ParticipantCreate event={event} />
                        </div>

                        {id && <ParticipantList eventId={id} />}
                    </div>
                </div>
            </div>
        </main>
    )
};

export default EventDetails;