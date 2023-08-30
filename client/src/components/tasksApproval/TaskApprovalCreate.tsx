import React, {useState} from 'react';
import { ReactComponent as SearchIcon } from '../../UI/img/searchIcon.svg';
import TaskApprovalForm from './TaskApprovalForm';
import { ReactComponent as TaskIcon } from '../../UI/img/task.svg';
import { CircularProgress } from '@mui/material';
import { useFetchApprovalTasksQuery } from '../../redux/store';
import { useFetchParticipantsQuery } from '../../redux/store';

const TaskApprovalCreate = ({ event, isHost }: any) => {
    const [showTaskApprovalModal, setShowTaskApprovalModal] = useState<boolean>(false);

    const { data , isLoading, isFetching, isError } = useFetchApprovalTasksQuery({ eventId: event.id });

    const { refetch } = useFetchParticipantsQuery({ eventId: event.id });

    if (isLoading || isFetching) {
        return <CircularProgress />
    }

    if (isError) {
        return <h1>Error Fetching Submitted Tasks</h1>
    }

    const handleOpenTaskApprovalModal = () => {
        // setTaskTransactionMode(transactionType);
        setShowTaskApprovalModal(true);
    }

    const handleCloseTaskApprovalModal = () => {
        setShowTaskApprovalModal(false);

        refetch();
    }

    return (
        <div className='flex gap-3 px-5'>
            <button 
                className='Task-container relative'
                onClick={handleOpenTaskApprovalModal}
            >
                {
                    (isHost && data.length)
                        && 
                    (<span className='bg-secondary-red py-0.5 px-2.5 text-white rounded-full absolute top-[-0.5rem] right-[-0.5rem]'>{data.length}</span>) 
                }
                <TaskIcon className='w-10 h-10 cursor-pointer' />
                
                
            </button>
                        

            {/* Open Task Approval Form */}
            {showTaskApprovalModal && <TaskApprovalForm event={event} onClose={handleCloseTaskApprovalModal} isHost={isHost} />}
            
        </div>
    )
}; 

export default TaskApprovalCreate;