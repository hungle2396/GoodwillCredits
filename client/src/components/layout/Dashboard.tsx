import React from 'react';
import Navigation from '../common/Navigation';
import EventCreate from '../events/EventCreate';
import EventList from '../events/EventList';

const Dashboard = () => {
    return (
        <main className='
                        flex flex-col xl:flex-row
                        flex-grow
                        gap-5 my-5 mx-5
        '>
            <div className='md:basis-0 xl:basis-1/5'>
                <Navigation isActive='events' />
            </div>
            
            <div className='
                            flex flex-col gap-5
                            xl:basis-4/5
            '>
                <h1 className='text-3xl font-semibold md:mx-5 xl:mx-0'>Events</h1>
                {/* Event Search and Create Event */}
                <EventCreate />

                <div className='
                    flex flex-col xl:h-[32rem]
                    xl:bg-slate-100
                    xl:rounded-md
                    w-full
                    xl:py-3
                '>
                    {/* Display Event List */}
                    <EventList />
                </div>
            </div>
        </main>
    )
};

export default Dashboard;