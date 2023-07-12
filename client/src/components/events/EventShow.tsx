import React, { useState } from 'react';
import { ReactComponent as StarsIcon } from '../../UI/img/3-stars.svg';
import { ReactComponent as EditIcon } from '../../UI/img/edit.svg';
import { ReactComponent as DeleteIcon } from '../../UI/img/trash-can.svg';

const EventShow = ({ event, hostImage, participantImage }: any) => {

    const limit_words = (paragraph: string) => {
        const words = paragraph.split(" ");
        
        if (words.length > 45) {
            return words.splice(0, 45).join(" ") + "...";
        }

        return paragraph;
    };

    return (
        <li 
            key={event.id}
            className={`flex items-center shadow-box rounded-md px-5 mx-5 h-40 cursor-pointer`}
        >
            <div className='flex-shrink-0 flex flex-col items-center gap-1'>
                <img src={hostImage} className='w-14 h-14 rounded-full' alt='test cute dog'/>

                <p className='text-md font-medium'>Ucbi</p>
            </div>

            <div className='mx-5 px-2 self-start mt-5'>
                <div className='flex w-full items-center justify-between '>
                    <h1 className='text-xl font-semibold'>{event.name}</h1>

                    <p>{event.start_date} - {event.end_date}</p>
                </div>
                

                <p className='mt-2'>{limit_words(event.description)}</p>
            </div>

            <div className='flex flex-col justify-center items-center gap-1 flex-shrink-0 ml-auto border-transparent border-l-secondary-grey-light border pl-5 h-full relative'>
                {/* <StarsIcon className='w-5 h-5 star-icon' /> */}
                <div className='flex gap-2 absolute top-1.5 right-[-0.5rem]'>
                    <EditIcon className='w-4 h-4' />
                    <DeleteIcon className='w-4 h-4' />
                </div>
                <img src={participantImage} className='w-14 h-14 rounded-full' alt='preview' />

                <h1>Kid</h1>
            </div>
        </li>
    )
};

export default EventShow;