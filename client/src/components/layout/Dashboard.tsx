import React, { useState } from 'react';

import EventForm from '../forms/EventForm';
import Navigation from '../common/Navigation';

import { useFetchUserQuery } from "../../redux/store";

const Dashboard = () => {
    console.log("In the dashboard component");
    const [showEventModal, setShowEventModal] = useState<boolean>(false);

    const { data } = useFetchUserQuery();

    const handleOpenEventModal = () => {
        setShowEventModal(true);
    }

    const handleCloseEventModal = () => {
        setShowEventModal(false);
    }

    console.log(data);
    return (
        <main className="flex-grow relative">
            <Navigation isActive='events' />
            <button 
                className='text-secondary-blue'
                onClick={handleOpenEventModal}
            >
                Create Event
            </button>

            {showEventModal && <EventForm onClose={handleCloseEventModal} />}
        </main>
    )
};

export default Dashboard;