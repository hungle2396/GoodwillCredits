import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as CloseIcon } from '../../UI/img/close.svg';
import { useCreateEventMutation } from '../../redux/api/eventApi';
import { useFetchUserQuery } from '../../redux/store';

const EventForm = ({ onClose }: any) => {
    const [eventName, setEventName] = useState<string>('');
    const [eventDescription, setEventDescription] = useState<string>('');
    const [eventStartDate, setEventStartDate] = useState<string>('');
    const [eventEndDate, setEventEndDate] = useState<string>('');
    const { data, isFetching } = useFetchUserQuery();
    const [createEvent, results] = useCreateEventMutation();

    console.log(data.id);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log('in the handleSubmit function in EventForm');
        event.preventDefault();

        const newEvent = {
            userId: data.id,
            name: eventName,
            description: eventDescription,
            startDate: eventStartDate,
            endDate: eventEndDate
        }

        console.log('Event Info being submitting soon: ', Event);
        createEvent(newEvent);

        onClose(false);
    };

    return ReactDOM.createPortal (
        <div className='w-full'>
            <div className='absolute inset-0 bg-black-transparent'></div>
            <div className='absolute inset-0 flex flex-col items-center mt-28'>
                <div className='w-[40rem] bg-white p-10 rounded-md relative'>
                    <CloseIcon className='w-8 h-8 absolute top-3 right-3 hover:cursor-pointer' onClick={onClose} />
                    
                    <h1 className='event_title text-4xl font-semibold mb-5'>New Event</h1>

                    <form className='event_form flex flex-col' onSubmit={handleSubmit}>
                        <div className='field-group flex flex-col mb-5'>
                            <label className='label' htmlFor='event_name'>Name</label>
                            <input 
                                className='input'
                                type='text'
                                placeholder='Event Name'
                                value={eventName}
                                onChange={((e) => setEventName(e.target.value))}
                                required 
                            />
                        </div>

                        <div className='field-group flex flex-col mb-5'>
                            <label className='label' htmlFor='event_description'>Description</label>
                            <textarea
                                className='input h-24 resize-none'
                                placeholder='Event Description'
                                value={eventDescription}
                                onChange={((e) => setEventDescription(e.target.value))}
                                required
                            />
                        </div>

                        <div className='field group flex justify-between mb-5'>
                            <div className='field-group flex flex-col w-48'>
                                <label className='label' htmlFor='event_date'>Start Date</label>
                                <input 
                                    className='input'
                                    type='date'
                                    value={eventStartDate}
                                    onChange={((e) => setEventStartDate(e.target.value))}
                                    required
                                />
                            </div>

                            <div className='field-group flex flex-col w-48'>
                                <label className='label' htmlFor='event_date'>End Date</label>
                                <input 
                                    className='input'
                                    type='date'
                                    value={eventEndDate}
                                    onChange={((e) => setEventEndDate(e.target.value))}
                                    required
                                />
                            </div>
                        </div>

                        
                        <button className='cancel_btn flex flex-shrink ml-auto btn-primary mt-5'>Create</button>
                    </form>
                </div>
            </div>
        </div>, document.querySelector('.modal-container') as Element
    )
};

export default EventForm;