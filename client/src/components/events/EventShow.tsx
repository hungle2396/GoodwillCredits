import React, { useState } from 'react';
import { ReactComponent as StarsIcon } from '../../UI/img/3-stars.svg';
import { ReactComponent as EditIcon } from '../../UI/img/edit.svg';
import { ReactComponent as DeleteIcon } from '../../UI/img/trash-can.svg';
import { ReactComponent as EventSettingIcon } from '../../UI/img/more.svg';
import { ReactComponent as CloseIcon } from '../../UI/img/close.svg';
import { ReactComponent as RightArrowIcon } from '../../UI/img/right-chevron.svg';
import HappyKid from '../../UI/img/Happy_Kid.jpg';
import { useFetchUserQuery } from '../../redux/store';
import { useDeleteEventMutation } from '../../redux/store';

import EventForm from './EventForm';
import { Days_Counter } from '../utils/Counter';
import { MonthDayYear } from '../utils/Formatting';
import { useNavigate } from 'react-router-dom';

const EventShow = ({ event }: any) => {
    const navigate = useNavigate();
    const [openSetting, setOpenSetting] = useState<boolean>(false);
    const [showEventModal, setShowEventModal] = useState<boolean>(false);

    const [deleteEvent, results] = useDeleteEventMutation();
    const {data: userData} = useFetchUserQuery();

    const handleOpenEventModal = () => {
        setShowEventModal(true);
    }

    const handleCloseEventModal = () => {
        setShowEventModal(false);
    }
    
    console.log('results: ', results);
    const handleOpenSetting = () => {
        setOpenSetting(true);
    };

    const handleCloseSetting = () => {
        console.log('closing');
        setOpenSetting(false);
    };

    const handleDeleteEvent = (eventId: string) => {
        deleteEvent({ 
            eventId: eventId,
            userId: userData.id
        });
    };

    const handleEventDetails = () => {
        navigate(`/events/${event.id}`);    
    }

    return (
        <li
            className={`flex items-center shadow-box rounded-md pl-5 mx-5 h-[10rem] relative`}
        >
            <span className='inline-block bg-secondary-green text-white py-0.5 px-4 absolute top-0 left-0 rounded-tl-md rounded-br-md text-sm'>{event.active ? 'Active' : 'Inactive'}</span>

            <div className='flex-shrink-0 flex flex-col items-center gap-1'>    
                <img src={HappyKid} className='w-14 h-14 rounded-full' alt='test cute dog'/>

                <p className='text-md font-medium'>{`${event.host.firstName} ${event.host.lastName}`}</p>
            </div>

            <div className='w-full px-2 self-start mx-5 my-5'>
                <div className='flex w-full items-center justify-between '>
                    <h1 className='text-xl font-semibold'>{event.name}</h1>

                    <span className='py-1 px-5 rounded-md bg-primary-purple text-white text-sm'>{event.tag}</span>
                </div>
                

                <p className='mt-2 h-[4.5rem] event_description'>{event.description}</p>
            </div>

            <div className='flex flex-col gap-1 flex-shrink-0 border-transparent border-l-secondary-grey-light border-r-secondary-grey-light border h-full w-80'>
                <div className='flex flex-col gap-3 mx-5 my-5'>
                    <div className='flex justify-between'>
                        <span>{MonthDayYear(event.startDate)}</span> -
                        <span>{MonthDayYear(event.endDate)}</span>
                    </div>
                    <h1 className='text-5xl font-thin text-center'>{Days_Counter(event.startDate, event.endDate)}</h1>
                    <h1 className='text-md text-center'>Days Left</h1>
                </div>
            </div>

            <div className='flex justify-center items-center relative h-full w-40'>
                
                {!openSetting && (
                    <>
                        <div className='flex gap-2 absolute top-1 right-3' onClick={handleOpenSetting}>
                            <EventSettingIcon className='w-5 h-5 fill-secondary-grey' />
                        </div>

                        <div onClick={handleEventDetails}>
                            <RightArrowIcon className='w-10 h-10' />
                        </div>
                    </>
                )}
                
                {openSetting && (
                    <div className='flex flex-col gap-3 bg-white'>
                        <button className='flex items-center gap-2 hover:fill-primary-purple hover:text-primary-purple'
                        onClick={handleOpenEventModal}
                        >
                            <EditIcon className='w-5 h-5' />
                            Edit
                        </button>
                        

                        <button className='flex items-center gap-2 hover:fill-primary-purple hover:text-primary-purple'
                            onClick={() => handleDeleteEvent(event.id)}    
                        >
                            <DeleteIcon className='w-5 h-5' />
                            Delete
                        </button>
                        
                        <button className='flex items-center gap-1 mt-2 bg-secondary-grey-light py-1 px-2 rounded-md hover:bg-zinc-400' onClick={handleCloseSetting}>
                            <CloseIcon className='w-5 h-5' />
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {/* Create Event Form */}
            {showEventModal && <EventForm mode='edit' eventData={event} onClose={handleCloseEventModal} onCloseSetting={handleCloseSetting} />}
        </li>
    )
};

export default EventShow;