import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as CloseIcon } from '../../UI/img/close.svg';
import { toast } from 'react-toastify';

import { useFetchUserQuery } from '../../redux/store';
import { useCreateEventMutation } from '../../redux/api/eventApi';
import { useEditEventMutation } from '../../redux/api/eventApi';

const EventForm = ({ mode, eventData, onClose, onCloseSetting }: eventFormProp) => {
    const [eventName, setEventName] = useState<string>(eventData.name);
    const [eventDescription, setEventDescription] = useState<string>(eventData.description);
    const [eventTag, setEventTag] = useState<string>(eventData.tag);
    const [eventActive, setEventActive] = useState<boolean>(eventData.active);
    const [eventStartDate, setEventStartDate] = useState<string>(eventData.startDate);
    const [eventEndDate, setEventEndDate] = useState<string>(eventData.endDate);

    const { data: userData, isFetching } = useFetchUserQuery();
    const [createEvent] = useCreateEventMutation();
    const [editEvent] = useEditEventMutation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newEvent = {
            userId: userData.id,
            name: eventName,
            description: eventDescription,
            tag: eventTag,
            active: eventActive,
            startDate: eventStartDate,
            endDate: eventEndDate
        }

        try {
            let response;

            if (mode === 'create') {
                response = await createEvent(newEvent);
            }
    
            if (mode === 'edit') {
                response = await editEvent({
                    eventId: eventData.id,
                    event: newEvent
                });
            }
    
            if ((response as any)?.error?.status > 200) {
                throw new Error((response as any)?.error?.data?.error);
            }

            toast.success((response as any).data.message);
            // Close the Event Form
            onClose();
            onCloseSetting();
        } catch (error) {
            if (typeof error === 'object') {
                toast.error((error as Error).message);
            } else {
                toast.error('Internal Error');
            }
        }
    };

    return ReactDOM.createPortal (
        <div className='w-full'>
            <div className='absolute inset-0 bg-black-transparent'></div>
            <div className='absolute inset-0 flex flex-col items-center mt-28'>
                <div className='w-[40rem] bg-white p-10 rounded-md relative'>
                    <CloseIcon className='w-8 h-8 absolute top-3 right-3 hover:cursor-pointer' onClick={onClose} />
                    
                    <h1 className='event_title text-4xl font-semibold mb-5'>{mode === 'create' ? 'New Event' : 'Edit Event'}</h1>

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
                                <label className='label' htmlFor='event_tag'>Tag</label>
                                <select
                                    name='event_tag'
                                    className='input resize-none'
                                    id="select"
                                    value={eventTag}
                                    onChange={((e) => setEventTag(e.target.value))}
                                    required
                                >
                                    <option value='Other'>Other</option>
                                    <option value='Homework'>Homework</option>
                                    <option value='Chores'>Chores</option>
                                    <option value='Holiday'>Holiday</option>
                                    <option value='Healthy Habits'>Healthy Habits</option>
                                    <option value='Responsibilities'>Responsibilities</option>
                                </select>
                            </div>

                            <div className='field-group flex flex-col w-48 gap-1'>
                                <h1>Is this event active?</h1>
                                <div className='flex gap-5'>
                                    <div>
                                        <input 
                                        type="radio" className="accent-primary-purple-light" id="event_active" 
                                        name="event_active"
                                        checked={eventActive === true}
                                        onChange={() => setEventActive(true)}
                                        />
                                        <label htmlFor="event_active">Yes</label>
                                    </div>
                                    
                                    <div>
                                        <input 
                                            type="radio"
                                            id="event_inactive"
                                            className="accent-primary-purple-light" name="event_inactive"
                                            checked={eventActive === false}
                                            onChange={() => setEventActive(false)}
                                        />
                                        <label htmlFor="event_inactive">No</label>
                                    </div>
                                </div>
                                
                            </div>
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

                        
                        <button className='cancel_btn flex flex-shrink ml-auto btn-primary mt-5'>{mode === 'create' ? <>Create</> : <>Submit</>}</button>
                    </form>
                </div>
            </div>
        </div>, document.querySelector('.modal-container') as Element
    )
};

export default EventForm;