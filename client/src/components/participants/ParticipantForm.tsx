import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as CloseIcon } from '../../UI/img/close.svg';
import { useFetchUserQuery } from '../../redux/store';
import { useAddParticipantMutation } from '../../redux/store';

const ParticipantForm = ({ eventData, onClose }: any) => {
    const [participantEmail, setParticipantEmail] = useState<string>('');
    const { data: userData, isLoading: isUserLoading } = useFetchUserQuery();
    const [addParticipant, result] = useAddParticipantMutation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('in the handleSubmit function in ParticipantForm');
        event.preventDefault();

        const newParticipant = {
            userId: userData.id,
            eventId: eventData.id,
            email: participantEmail
        }

        try {
            const response = await addParticipant(newParticipant)

            console.log('Add Participant Response: ', response);

            // Close the Event Form
            onClose();
        } catch (error) {
            console.error('Error during API call: ', error);
        }
        
    };

    return ReactDOM.createPortal(
        <div className='w-full'>
            <div className='absolute inset-0 bg-black-transparent'></div>
            <div className='absolute inset-0 flex flex-col items-center mt-28'>
                <div className='w-[40rem] bg-white p-10 rounded-md relative'>
                    <CloseIcon className='w-8 h-8 absolute top-3 right-3 hover:cursor-pointer' onClick={onClose} />
                    
                    <h1 className='participant_title text-4xl font-semibold mb-5'>Add Participant</h1>

                    <form className='event_form flex flex-col' onSubmit={handleSubmit}>
                        <div className='field-group flex flex-col mb-5'>
                            <h4 className='label'>Event Name</h4>
                            <h3 className='text-md'>{eventData.name}</h3>
                        </div>

                        <div className='field-group flex flex-col mb-5'>
                            <label className='label' htmlFor='participant_email'>Participant Email</label>
                            <input 
                                className='input'
                                type='text'
                                value={participantEmail}
                                onChange={((e) => setParticipantEmail(e.target.value))}
                                required
                            />
                        </div>

                        <button className='cancel_btn flex flex-shrink ml-auto btn-primary mt-5'>Add</button>
                    </form>
                </div>
            </div>
        </div>, document.querySelector('.modal-container') as Element
    )
};

export default ParticipantForm;