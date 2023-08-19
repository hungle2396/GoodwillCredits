import React, {useState} from 'react';
import { ReactComponent as SearchIcon } from '../../UI/img/searchIcon.svg';
import TaskForm from './TaskForm';

const TaskCreate = ({ user, participant }: any) => {
    const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
    const [taskTransactionMode, setTaskTransactionMode] = useState<string>('');

    const handleOpenTaskModal = (transactionType: string) => {
        setTaskTransactionMode(transactionType);
        setShowTaskModal(true);
    }

    const handleCloseTaskModal = () => {
        setShowTaskModal(false);
    }

    return (
        <div className='flex gap-3 px-5'>

            <button 
                className='btn-red px-3.5 py-1.5'
                onClick={() => handleOpenTaskModal('Substract')}
            >
                -
            </button>

            <button 
                className='btn-green px-3 py-1.5'
                onClick={() => handleOpenTaskModal('Add')}
            >
                +
            </button>

            {/* Create Task Form */}
            {showTaskModal && <TaskForm mode={taskTransactionMode} userData={user} participantData={participant} onClose={handleCloseTaskModal} />}
            
        </div>
    )
}; 

export default TaskCreate;