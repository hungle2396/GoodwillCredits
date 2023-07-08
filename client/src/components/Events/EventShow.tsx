import React, { useState } from 'react';
import { ReactComponent as StarsIcon } from '../../UI/img/3-stars.svg';

const EventShow = ({ event, hostImage, participantImage, onClickActive, active }: any) => {

    const limit_words = (paragraph: string) => {
        const words = paragraph.split(" ");
        
        if (words.length > 20) {
            return words.splice(0, 20).join(" ") + "...";
        }

        return paragraph;
    };

    return (
        <li 
            key={event.id}
            className={`flex items-center shadow-box rounded-md px-5 py-5 h-36 my-1 mx-5 ${active}`}
            onClick={() => onClickActive(event.id)}    
        >
            <div className='flex-shrink-0 flex flex-col items-center gap-1'>
                <img src={hostImage} className='w-14 h-14 rounded-full' alt='test cute dog'/>

                <p className='text-md font-medium'>Ucbi</p>
            </div>

            <div className='mx-5 px-2'>
                <h1 className='text-xl font-semibold'>{event.name}</h1>

                <p>{event.start_date} - {event.end_date}</p>

                <p className='mt-2'>{limit_words(event.description)}</p>
            </div>

            <div className='flex flex-col items-center gap-1 flex-shrink-0 ml-auto border-transparent border-l-secondary-grey-light border pl-5'>
                <StarsIcon className='w-5 h-5 star-icon' />

                <img src={participantImage} className='w-14 h-14 rounded-full' alt='preview' />

                <h1>Kid</h1>
            </div>
        </li>
    )
};

export default EventShow;