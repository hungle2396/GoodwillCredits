import React from 'react';
import { CircularProgress } from '@mui/material';
import ParticipantImage from '../../UI/img/Happy_Kid.jpg';
import { MonthDayYearDigital } from '../utils/Formatting';
import { ReactComponent as RejectIcon } from '../../UI/img/cancel.svg';
import { ReactComponent as ApproveIcon } from '../../UI/img/check.svg';
import { taskStatusColors } from '../utils/ArrayItems';

import { useFetchApprovalTasksQuery } from '../../redux/store';
import { useApprovalTaskMutation } from '../../redux/store';
import { useFetchParticipantsQuery } from '../../redux/store';

const TaskApprovalList = ({ event, isHost }: any) => {
    const { data , isLoading, isFetching, isError } = useFetchApprovalTasksQuery({ eventId: event.id });
    const [approveTask] = useApprovalTaskMutation();

    const handleApproveTask = async (task: taskApprovalProp, approvalStatus: string) => {
        try {
            const taskData = {
                taskId: task.id,
                eventId: task.eventId,
                participantId: task.userId,
                transactionType: task.transactionType,
                approvalStatus: approvalStatus,
                credits: task.credits
            }

            const response = await approveTask(taskData);
        } catch (error) {
            console.error('Error Approving Task: ', error);
        }
    };

    let renderedApprovalTasks = null;

    if (isLoading || isFetching) {
        return <CircularProgress />
    }

    if (isError) {
        return <h1>Error Fetching Submitted Tasks</h1>
    }

    if (data && Array.isArray(data)) {
        renderedApprovalTasks = data.map((task: taskApprovalProp) => {
            const creditStatusColor = task.transactionType === 'Add' ? `+${task.credits}` : `-${task.credits}`;

            return (
                <li key={task.id} className='flex bg-secondary-grey-light-2 py-4 px-3 rounded-lg shadow gap-3'>
                    <div className='flex flex-col items-center justify-center task-participant-container w-24 flex-shrink-0 border border-y-0 border-l-0 border-r-1 border-secondary-grey'>
                        <img 
                            src={ParticipantImage} alt='particpant profile'
                            className='w-10 h-10 rounded-full'
                        />

                        <div className='flex gap-1 font-medium'>
                            <h4>{task.user.firstName}</h4>
                            <h4>{task.user.lastName}</h4>
                        </div>
                    </div>

                    <div className='flex gap-5 basis-full items-center justify-between'>
                        <p className='text-md'>{task.description}</p>
                        <h1 className={`text-xl font-semibold ${task.transactionType === 'Add' ? 'text-green-500' : 'text-secondary-red'}`}>{creditStatusColor}</h1>
                    </div>

                    <div className='flex ml-auto items-center justify-center px-3 border border-y-0 border-x-1 border-secondary-grey'>
                        <p className='text-md'>{MonthDayYearDigital(task.createdAt)}</p>
                    </div>

                    
                    <div className='flex items-center justify-center w-24 flex-shrink-0 gap-2'>
                        {isHost ? 
                            (
                            <>
                                <button onClick={() => handleApproveTask(task, 'Rejected')}>
                                    <RejectIcon className='w-8 h-8' />
                                </button>

                                <button onClick={() => handleApproveTask(task, 'Approved')}>
                                    <ApproveIcon className='w-7 h-7' />
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 className={`font-semibold ${taskStatusColors[task.status as keyof taskStatusColorsProp]}`}>{task.status}</h3>
                            </>
                        )}
                    </div>
                </li>
            )
        })
    } else {
        renderedApprovalTasks = <p>No tasks to approve at the moment.</p>
    }

    return (
        <div>
            <ul className='flex flex-col gap-3 h-[30rem] hide-scrollbar px-5 my-5'>
                {renderedApprovalTasks}
            </ul>
        </div>
    )
};

export default TaskApprovalList;