import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as CloseIcon } from '../../UI/img/close.svg';

import { useFetchUserQuery } from '../../redux/store';
import { useCreateEventMutation } from '../../redux/api/eventApi';
import { useEditEventMutation } from '../../redux/api/eventApi';

const PeopleForm = ({ mode, personData, onClose, onCloseSetting }: any) => {
    const [firstName, setFirstName] = useState<string>(
        mode === 'edit' ? personData.firstName : ''
    );
    const [lastName, setLastName] = useState<string>(
        mode === 'edit' ? personData.lastName : ''
    );
    const [birthday, setBirthday] = useState<string>(
        mode = 'edit' ? personData.birthday: ''
    );
    const [phone, setPhone] = useState<string>(
        mode === 'edit' ? personData.phone : ''
    );
    const [email, setEmail] = useState<string>(
        mode === 'edit' ? personData.email : ''
    );
    const [address, setAddress] = useState<string>(
        mode === 'edit' ? personData.address : ''
    );
    const [city, setCity] = useState<string>(
        mode === 'edit' ? personData.city : ''
    );
    const [state, setState] = useState<string>(
        mode === 'edit' ? personData.state : ''
    );
    const [role, setRole] = useState<string>(
        mode === 'edit' ? personData.state : 'User'
    );

    const { data: userData, isFetching } = useFetchUserQuery();
    const [createEvent] = useCreateEventMutation();
    const [editEvent] = useEditEventMutation();

    // console.log('eventId: ', eventData.id);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('in the handleSubmit function in EventForm');
        event.preventDefault();

        // const newEvent = {
        //     userId: userData.id,
        //     name: eventName,
        //     description: eventDescription,
        //     tag: eventTag,
        //     active: eventActive,
        //     startDate: eventStartDate,
        //     endDate: eventEndDate
        // }

        try {
            if (mode === 'create') {
                
                const response = await createEvent(newEvent);

                console.log('response: ', response);

                // Check if the response come back successfully or not
            }
    
            if (mode === 'edit') {
                
                console.log('newEvent: ', newEvent);
                const response = await editEvent({
                    eventId: eventData.id,
                    event: newEvent
                });

                console.log('edited response: ', response)

                // Check if the response come back successfully or not
            }
    
            // Close the Event Form
            onClose();
            onCloseSetting();
        } catch (error) {
            console.error('Error during API call: ', error);
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
                                        value='true' 
                                        onClick={() => setEventActive(true)} />
                                        <label htmlFor="event_active">Yes</label>
                                    </div>
                                    
                                    <div>
                                        <input 
                                            type="radio"
                                            id="event_inactive"
                                            className="accent-primary-purple-light" name="event_active" 
                                            value='false' 
                                            onClick={() => setEventActive(false)} />
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

export default PeopleForm;