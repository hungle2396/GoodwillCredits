import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as CloseIcon } from '../../UI/img/close.svg';
import { useFetchUserQuery } from '../../redux/store';
import { useAddParticipantMutation } from '../../redux/store';
import { useFetchUsersQuery } from '../../redux/store';
import { CircularProgress } from '@mui/material';

const ParticipantForm = ({ eventData, onClose }: any) => {
    const [participantEmail, setParticipantEmail] = useState<string>('');

    const { data: userData, isLoading: isUserLoading } = useFetchUserQuery();
    const [addParticipant, result] = useAddParticipantMutation();
    const { data: usersData, isLoading: isUsersLoading, isError: isUsersError } = useFetchUsersQuery();

    let renderedUsers = null;

    if (isUsersLoading) {
        return <CircularProgress />
    } else if (isUsersError) {
        return <div>Error fetching users</div>
    } else if (usersData) {
        const filteredParticipants = usersData.filter((user: userProp)=> {
            return eventData.hostId !== user.id;
        });

        renderedUsers = filteredParticipants.map((user: userProp) => {
            return <option key={user.id} value={user.email}>{`${user.firstName} ${user.lastName}`}</option>
        })
    }

    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newParticipant = {
            userId: userData.id,
            eventId: eventData.id,
            email: participantEmail
        }

        try {
            const response = await addParticipant(newParticipant)

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
                <div className='w-[30rem] bg-white p-10 rounded-md relative'>
                    <CloseIcon className='w-8 h-8 absolute top-3 right-3 hover:cursor-pointer' onClick={onClose} />
                    
                    <h1 className='participant_title text-4xl font-semibold mb-5'>Add Participant</h1>

                    <form className='event_form flex flex-col' onSubmit={handleSubmit}>
                        <div className='field-group flex flex-col mb-5'>
                            <h4 className='label'>Event Name</h4>
                            <h3 className='text-md'>{eventData.name}</h3>
                        </div>

                        <div className='flex flex-col'>
                            <div className='flex flex-col w-full'>
                                <label className='label' htmlFor='people'>Select a participant</label>
                                <select
                                    name='people'
                                    className='input resize-none text-primary-purple'
                                    id='select'
                                    value={participantEmail}
                                    onChange={(e) => 
                                        setParticipantEmail(e.target.value)}
                                >
                                    <option className='text-gray-400' value=''>Example: Hung Le</option>
                                    {renderedUsers}
                                </select>
                            </div>

                            <div className='flex items-center gap-5 my-10'>
                                <div className='line'></div>
                                <h4 className='text-secondary-grey'>Or</h4>
                                <div className='line'></div>
                            </div>
                            

                            <div className='field-group flex flex-col mb-5 w-full'>
                                <label className='label' htmlFor='participant_email'>Participant Email</label>
                                <input 
                                    className='input text-primary-purple'
                                    type='text'
                                    value={participantEmail}
                                    onChange={(e) => 
                                        setParticipantEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        

                        <button className='cancel_btn flex flex-shrink ml-auto btn-primary mt-5'>Add</button>
                    </form>
                </div>
            </div>
        </div>, document.querySelector('.modal-container') as Element
    )
};

export default ParticipantForm;