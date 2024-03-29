import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as CloseIcon } from '../../UI/img/close.svg';

import { useAddTaskMutation } from '../../redux/store';
import { useFetchParticipantsQuery } from '../../redux/store';
import { toast } from 'react-toastify';

const TaskForm = ({ mode, userData, participantData, onClose }: any) => {
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [taskCredits, setTaskCredits] = useState<number>(0);
    
    const { refetch } = useFetchParticipantsQuery({ eventId: participantData.eventId });

    const [createTask] = useAddTaskMutation();
    
    const handleCreditsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
        setTaskCredits(Number(numericValue));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const taskData = {
            participantId: participantData.userId,
            eventId: participantData.eventId,
            description: taskDescription,
            transactionType: mode,
            credits: taskCredits
        }

        try {
            const response = await createTask(taskData);

            // Check if the response come back successfully or not
            onClose();

            // Manually refetch participants after adding the task
            refetch();
            toast.success((response as { data: any; }).data.message);
        } catch (error) {
            if (typeof error === 'object') {
                toast.error((error as Error).message);
            } else {
                toast.error('Internal System Error.');
            }
        }
    };

    const transactionColor = mode === 'Add' ? 'text-secondary-green' : 'text-secondary-red';

    return ReactDOM.createPortal (
        <div className='w-full'>
            <div className='absolute inset-0 bg-black-transparent'></div>
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <div className='w-[30rem] bg-white p-10 rounded-md relative'>
                    <CloseIcon className='w-8 h-8 absolute top-3 right-3 hover:cursor-pointer' onClick={onClose} />
                    
                    <h1 className={`task_title text-4xl font-semibold mb-5 ${transactionColor}`}>{mode === 'Add' ? 'Add Good Action' : 'Add Bad Action'}</h1>

                    <form className='event_form flex flex-col gap-5' onSubmit={handleSubmit}>
                        <div className='field-group flex'>
                            <div className='flex flex-col basis-1/2'>
                                <h4 className='text-md font-normal text-secondary-grey'>First Name</h4>
                                <h4 className='font-semibold'>{participantData.user.firstName}</h4>
                            </div>

                            <div className='flex flex-col basis-1/2'>
                                <h4 className='text-md font-normal text-secondary-grey'>Last Name</h4>
                                <h4 className='font-semibold'>{participantData.user.lastName}</h4>
                            </div>
                        </div>

                        <div className='field-group flex flex-col mb-5'>
                            <label className='label' htmlFor='task_description'>Description</label>
                            <textarea
                                className='input h-16 resize-none text-primary-purple'
                                placeholder='Task Description'
                                value={taskDescription}
                                onChange={((e) => setTaskDescription(e.target.value))}
                                required
                            />
                        </div>

                        <div className='field-group flex flex-col'>
                            <label className='label' htmlFor='task_credits'>Credits</label>
                            <input 
                                className={`input h-10 text-lg ${transactionColor} font-semibold `}
                                type='text'
                                value={taskCredits}
                                onChange={handleCreditsInput}
                                required 
                            />
                        </div>

                        <button className='cancel_btn flex flex-shrink ml-auto btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
        </div>, document.querySelector('.modal-container') as Element
    )
};

export default TaskForm;