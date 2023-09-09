import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFetchUserQuery, useDeleteEventMutation } from '../../redux/store';

import { ReactComponent as EditIcon } from '../../UI/img/edit.svg';
import { ReactComponent as DeleteIcon } from '../../UI/img/trash-can.svg';
import { ReactComponent as EventSettingIcon } from '../../UI/img/more.svg';
import { ReactComponent as CloseIcon } from '../../UI/img/close.svg';
import { ReactComponent as RightArrowIcon } from '../../UI/img/right-chevron.svg';
import HappyKid from '../../UI/img/Happy_Kid.jpg';

import EventForm from './EventForm';
import { Days_Counter } from '../utils/Counter';
import { MonthDayYearByNumber } from '../utils/Formatting';
import { MonthDayYear } from '../utils/Formatting';
import { tagColors } from '../utils/ArrayItems';



const EventShow = ({ event }: any) => {
    const navigate = useNavigate();
    const settingReference = useRef<HTMLDivElement>(null);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [openSetting, setOpenSetting] = useState<boolean>(false);
    const [showEventModal, setShowEventModal] = useState<boolean>(false);
    const [deleteEvent] = useDeleteEventMutation();
    const {data: userData} = useFetchUserQuery();

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);
    
    useEffect(() => {
        document.addEventListener('click', handleClickOutsideSetting);

        return () => {
            document.removeEventListener('click', handleClickOutsideSetting);
        }
    }, []);

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

    const handleDeleteEvent = async (eventId: string) => {
        try {
            const response = await deleteEvent({ 
                eventId: eventId,
                userId: userData.id
            });

            console.log('response: ', response);
            if ((response as any)?.error?.status > 200) {
                throw new Error((response as any)?.error?.data?.error);
            }

            const responseMessage = (response as any).data?.message;

            toast.success(responseMessage);
        } catch (error) {
            if (typeof error === 'object') {
                toast.error((error as Error).message);
            } else {
                toast.error('Failed to delete event.');
            }
        }
    };

    const handleEventDetails = () => {
        navigate(`/events/${event.id}`);    
    }

    const handleClickItem = () => {
        if (windowWidth <= 768) {
            handleEventDetails();
        }
    }

    const onlineBackgroundColor = event.active? 'bg-secondary-green' : 'bg-secondary-grey';

    const inactiveClassName = event.active ? '' : 'opacity-80 bg-gray-200';

    const isTabletMode = windowWidth >= 640 && windowWidth < 768;

    const isCursor = windowWidth <= 768 ? 'cursor-pointer' : 'default';

    return (
        <li
            onClick={handleClickItem}
            className={`${inactiveClassName}
                flex flex-col md:flex-row
                md:h-[10rem] 
                w-full
                items-center 
                shadow-box 
                rounded-md 
                xl:bg-white
                ${isCursor}
            `}
        >
            
            <div className='
                flex 
                w-full h-full md:basis-2/3 
                pb-3 lg:pb-0
                custom-border-bottom
            '>

                <div className='
                    host_container 
                    flex flex-col
                    w-24 md:w-32
                    relative
                '>    
                    
                    <span className={`
                        py-0.5 px-4
                        w-20
                        bg-secondary-green  
                        rounded-tl-md rounded-br-md 
                        text-white text-sm text-center
                        absolute top-0 left-0
                        ${onlineBackgroundColor}
                    `}>
                            {event.active ? 'Active' : 'Inactive'}
                    </span>
                    
                    
                    <div className='
                        flex flex-col 
                        h-full
                        items-center
                        md:justify-center
                        mt-14 md:mt-5
                    '>
                        <img src={HappyKid} className='w-14 h-14 rounded-full' alt='test cute dog'/>

                        <p className='text-md font-medium'>{`${event.host.firstName}`}</p>
                    </div>
                </div>

                {/* Event Description */}
                <div className='
                    flex flex-col flex-grow
                    h-full w-full
                    p-3
                    md:w-80
                    gap-2
                '>
                    
                    <div className='
                        flex 
                        md:h-auto
                        items-center md:items-start
                        sm:justify-between 
                        gap-3
                        relative
                    '>
                        <h4 className='
                            w-56
                            mt-8 md:mt-0
                            text-base md:text-lg
                            font-semibold
                            overflow-hidden whitespace-nowrap text-ellipsis
                        '>{event.name}</h4>
                        
                        <span className={`
                            p-1 w-24 rounded-md
                            bg-primary-purple
                            text-white text-xs text-center
                            absolute top-0 right-0 md:static
                            ${tagColors[event.tag as keyof tagColorsProp]}
                        `}>
                            {event.tag}
                        </span>
                    </div>

                    <p className='
                        event_description
                        h-[3rem] md:h-[5rem] lg:h-auto
                        text-xs md:text-sm
                        text-gray-500
                    '>{event.description}</p>
                    
                </div>
            </div>
            

            {/* 2nd Column */}
            <div className='
                md:flex
                h-full 
                w-full md:w-0 
                md:basis-1/3 
                py-5 sm:py-0
            '>
                
                {/* Date Container */}
                <div className='
                    flex flex-col flex-shrink-0
                    h-full w-full md:w-0 md:basis-2/3
                    md:p-3
                    md:items-center
                    md:border md:border-transparent md:border-l-secondary-grey-light md:border-r-secondary-grey-light
                    gap-1
                '>
                    {/* Date */}
                    <div className='
                        flex flex-col sm:flex-row md:flex-col
                        sm:h-[6rem] md:h-auto
                        justify-center items-center sm:justify-normal md:justify-center
                        gap-3
                    '>
                        <div className='
                            flex
                            h-full sm:basis-7/12 md:w-[10rem] md:h-auto
                            sm:custom-border-right md:border-0
                            md:justify-center
                            md:text-xs
                            gap-2
                        '>
                            {
                                isTabletMode ? (
                                    <div className='
                                        flex
                                        h-full sm:w-full
                                        justify-center items-center sm:justify-between
                                        gap-5 px-5
                                    '>
                                        <div>
                                            <h4>Start Date</h4>
                                            <span>{MonthDayYear(event.startDate)}</span>
                                        </div>

                                        <div>
                                            <h4>End Date</h4>
                                            <span>{MonthDayYear(event.endDate)}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <span>{MonthDayYearByNumber(event.startDate)}</span> -
                                        <span>{MonthDayYearByNumber(event.endDate)}</span>
                                    </>
                                )
                            }
                            
                        </div>

                        <div className='
                            flex flex-col sm:flex-row md:flex-col
                            sm:basis-1/2 sm:h-full
                            sm:justify-center 
                            sm:items-center
                            gap-2
                        '>
                            <h1 className='text-5xl font-medium text-center'>{Days_Counter(event.startDate, event.endDate)}</h1>
                            <h1 className='text-md text-center'>Days Left</h1>
                        </div>
                        
                    </div>
                </div>

                {
                    windowWidth >= 768 && (
                        <div className='
                            flex
                            flex-shrink-0
                            h-full
                            basis-1/3
                            justify-center 
                            items-center 
                            relative
                    ' 
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
                        <div className='flex flex-col gap-3 bg-transparent text-md'>
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
                    )
                }
                
            </div>
            

            {/* Create Event Form */}
            {showEventModal && <EventForm mode='edit' eventData={event} onClose={handleCloseEventModal} onCloseSetting={handleCloseSetting} />}
        </li>
    )
};

export default EventShow;