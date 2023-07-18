import React, { useState } from 'react';
import { ReactComponent as StarsIcon } from '../../UI/img/3-stars.svg';
import { ReactComponent as EditIcon } from '../../UI/img/edit.svg';
import { ReactComponent as DeleteIcon } from '../../UI/img/trash-can.svg';
import { ReactComponent as EventSettingIcon } from '../../UI/img/more.svg';
import { ReactComponent as CloseIcon } from '../../UI/img/close.svg';
import { useDeleteEventMutation } from '../../redux/store';

const EventShow = ({ event, hostImage, participantImage }: any) => {
    const [openSetting, setOpenSetting] = useState<boolean>(false);
    const [deleteEvent, results] = useDeleteEventMutation();

    const limit_words = (paragraph: string) => {
        const words = paragraph.split(" ");
        
        if (words.length > 45) {
            return words.splice(0, 45).join(" ") + "...";
        }

        return paragraph;
    };
    
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
            eventId: eventId
        });
    };

    return (
        <li
            className={`flex items-center shadow-box rounded-md px-5 mx-5 h-[10rem] cursor-pointer`}
        >
            <div className='flex-shrink-0 flex flex-col items-center gap-1'>
                <img src={hostImage} className='w-14 h-14 rounded-full' alt='test cute dog'/>

                <p className='text-md font-medium'>{event.host}</p>
            </div>

            <div className='w-full px-2 self-start mx-5 my-5'>
                <div className='flex w-full items-center justify-between '>
                    <h1 className='text-xl font-semibold'>{event.name}</h1>

                    <p className='font-medium text-secondary-grey'>{event.start_date} - {event.end_date}</p>
                </div>
                

                <p className='mt-2'>{limit_words(event.description)}</p>
            </div>

            <div className='flex flex-col justify-center items-center gap-1 flex-shrink-0 ml-auto border-transparent border-l-secondary-grey-light border pl-5 h-full relative w-36'>
                {/* <StarsIcon className='w-5 h-5 star-icon' /> */}
                
                {!openSetting && (
                    <>
                        <div className='flex gap-2 absolute top-2 right-[-0.5rem]' onClick={handleOpenSetting}>
                            <EventSettingIcon className='w-5 h-5 fill-secondary-grey' />
                        </div>

                        <img src={participantImage} className='w-14 h-14 rounded-full' alt='preview' />

                        <h1>Kid</h1>
                    </>
                )}
                
                {openSetting && (
                    <div className='flex flex-col gap-3 bg-white'>
                        <button className='flex items-center gap-2 hover:fill-primary-purple hover:text-primary-purple'
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
        </li>
    )
};

export default EventShow;