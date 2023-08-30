import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as CloseIcon } from '../../UI/img/close.svg';

import TaskApprovalList from './TaskApprovalList';

const TaskApprovalForm = ({ event, onClose, isHost }: any) => {
    return ReactDOM.createPortal (
        <div className='w-full'>
            <div className='absolute inset-0 bg-black-transparent'></div>
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <div className='w-[50rem] h-[40rem] bg-white p-10 rounded-md relative'>
                    <CloseIcon className='w-8 h-8 absolute top-3 right-3 hover:cursor-pointer' onClick={onClose} />

                    <h1 className='participant_title text-4xl font-semibold mb-5'>Tasks Approval</h1>

                    <TaskApprovalList event={event} isHost={isHost} />
                </div>
            </div>
        </div>, document.querySelector('.modal-container') as Element
    )
};

export default TaskApprovalForm;