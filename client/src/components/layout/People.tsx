import React from 'react';
import Navigation from '../common/Navigation';
import EventCreate from '../events/EventCreate';
import EventList from '../events/EventList';

const People = () => {
    return (
        <main className='flex-grow relative
                         flex gap-5 my-5
                        '
        >
            <div className='basis-1/5'>
                <Navigation isActive='people' />
            </div>

            <div className='basis-4/5
                            flex flex-col gap-5
                           '
            >
                <h1 className='text-3xl font-semibold ml-5'>People</h1>
                {/* Event Search and Create Event */}
                <EventCreate />

                <div className='w-full flex flex-col'>
                    {/* Display Event List */}
                    <EventList />
                </div>
            </div>
        </main>
    )
};

export default People;