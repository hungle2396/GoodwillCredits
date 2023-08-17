import React, { useState, useRef, useEffect } from 'react';
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
import { MonthDayYearDigital } from '../utils/Formatting';
import { useNavigate } from 'react-router-dom';

const EventShow = ({ event }: any) => {
    const navigate = useNavigate();
    const settingReference = useRef<HTMLDivElement>(null);

    const [openSetting, setOpenSetting] = useState<boolean>(false);
    const [showEventModal, setShowEventModal] = useState<boolean>(false);
    const [deleteEvent] = useDeleteEventMutation();
    const {data: userData} = useFetchUserQuery();

    const handleOpenEventModal = () => {
        setShowEventModal(true);
    }

    const handleCloseEventModal = () => {
        setShowEventModal(false);
    }
    
    const handleOpenSetting = () => {
        setOpenSetting(true);
    };

    const handleCloseSetting = () => {
        setOpenSetting(false);
    };

    const handleClickOutsideSetting = (event: MouseEvent) => {
        if (settingReference.current && !settingReference.current.contains(event.target as Node)) {
            setOpenSetting(false);
        }
    };

    const handleClickInsideSetting: React.MouseEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
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

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideSetting);

        return () => {
            document.removeEventListener('click', handleClickOutsideSetting);
        }
    }, []);

    return (
        <li
            className='flex items-center shadow-box rounded-md h-[10rem] w-full relative'
        >
            <span className='inline-block bg-secondary-green text-white py-0.5 px-4 absolute top-0 left-0 rounded-tl-md rounded-br-md text-sm'>{event.active ? 'Active' : 'Inactive'}</span>

            <div className='
                host_container flex flex-col items-center gap-1
                w-32 flex-shrink-0
            '>    
                <img src={HappyKid} className='w-14 h-14 rounded-full' alt='test cute dog'/>

                <p className='text-md font-medium'>{`${event.host.firstName} ${event.host.lastName}`}</p>
            </div>

            <div className='py-5 h-full pr-5 basis-4/6'>
                <div className='flex items-start justify-between gap-3'>
                    <h1 className='text-xl font-semibold'>{event.name}</h1>

                    <span className='py-1 px-5 rounded-md bg-primary-purple text-white text-sm'>{event.tag}</span>
                </div>
                <p className='mt-2 h-[4.5rem] event_description'>{event.description}</p>
            </div>

            <div className='flex flex-col gap-1 border-transparent border-l-secondary-grey-light border-r-secondary-grey-light border h-full w-50 flex-shrink-0'>
                <div className='flex flex-col gap-3 p-5'>
                    <div className='flex justify-between text-sm gap-2'>
                        <span>{MonthDayYearDigital(event.startDate)}</span> -
                        <span>{MonthDayYearDigital(event.endDate)}</span>
                    </div>
                    <h1 className='text-5xl font-thin text-center'>{Days_Counter(event.startDate, event.endDate)}</h1>
                    <h1 className='text-md text-center'>Days Left</h1>
                </div>
            </div>

            <div 
                className='flex justify-center items-center h-full relative w-28 flex-shrink-0' 
                ref={settingReference} 
                onClick={handleClickInsideSetting}
            >
                
                {!openSetting && (
                    <>
                        <div className='flex gap-2 absolute top-1 right-3' onClick={handleOpenSetting}>
                            <EventSettingIcon className='w-5 h-5 fill-secondary-grey' />
                        </div>

                        <div className='cursor-pointer' onClick={handleEventDetails}>
                            <RightArrowIcon className='w-8 h-8' />
                        </div>
                    </>
                )}
                
                {openSetting && (
                    <div className='flex flex-col gap-3 bg-white text-md'>
                        <button className='flex items-center rounded-md top-2 right-2 absolute' onClick={handleCloseSetting}>
                            <CloseIcon className='w-5 h-5' />
                        </button>

                        <button className='flex items-center gap-2 hover:fill-primary-purple hover:text-primary-purple'
                        onClick={handleOpenEventModal}
                        >
                            <EditIcon className='w-5 h-5' />
                            Edit
                        </button>

                        <button className='flex items-center gap-2 hover:fill-secondary-red hover:text-secondary-red'
                            onClick={() => handleDeleteEvent(event.id)}    
                        >
                            <DeleteIcon className='w-5 h-5' />
                            Delete
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