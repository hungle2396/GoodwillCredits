import React, { useState } from 'react';
import HappyKid from '../../UI/img/Happy_Kid.jpg';
import { MonthDayYear } from '../utils/Formatting';
import { ReactComponent as MoreIcon } from '../../UI/img/more.svg';
import { ReactComponent as DeleteIcon } from '../../UI/img/trash-can.svg';
import { ReactComponent as CloseIcon } from '../../UI/img/close.svg';
import { useDeleteParticipantMutation } from '../../redux/store';

const ParticipantShow = ({ user, participant, isHost }: participantShowProp ) => {
    const [openSetting, setOpenSetting] = useState<boolean>(false);
    const [deleteParticipant, result] = useDeleteParticipantMutation();

    const handleOpenSetting = () => {
        setOpenSetting(true);
    };

    const handleCloseSetting = () => {
        setOpenSetting(false);
    };

    const handleDeleteParticipant = async () => {
        try {
            const response = await deleteParticipant({
                userId: user.id,
                participantId: participant.id,
                isHost: isHost           
            });

            console.log('Response after deleting participant: ', response);
        } catch (error) {
            console.error('Error deleting participant:', error);
        }
        
    }

    console.log('participant: ', participant);

    const isCurrentUser = user.id === participant.user.id;

    console.log('result: ', result);
    return (
        <li className='flex h-[6rem] mb-5 bg-white shadow-box rounded-lg'>
            <div className='flex basis-1/3 items-center px-5 border border-y-0 border-l-0 border-secondary-grey-light'>
                <img 
                    src={HappyKid}
                    alt='participant'
                    className='w-16 h-16 rounded-full'    
                />
                
                <div className='participant_description_container ml-5'>
                    <h3 className='text-xl font-semibold'>{participant.user.firstName} {participant.user.lastName}</h3>

                    <h4>{participant.isHost ? 'Host' : 'Participant'}</h4>
                </div>
            </div>

            <div className='flex basis-3/6 items-center justify-around border border-y-0 border-l-0 border-secondary-grey-light'>
                <div>
                    <span className='text-3xl mr-2'>{participant.totalCredits}</span>
                    <span>credits</span>
                </div>

                <div className='credits_btn_container flex gap-3'>
                    <button className='btn-green px-3 py-1.5'>+</button>
                    <button className='btn-red px-3.5 py-1.5'>-</button>
                </div>
            </div>

            <div className='flex flex-col basis-1/6 items-center justify-center gap-1 relative'>

                {!openSetting && (
                    <>
                        {
                            (isHost || isCurrentUser) &&
                            <MoreIcon className='w-4 h-4 absolute top-2 right-3' onClick={handleOpenSetting} />
                        }

                        {
                            participant.user.isOnline ? <h4 className='text-secondary-green font-medium'>Online</h4> 
                            :
                            <>
                                <h4 className='text-sm'>Last Login</h4>
                                <span className='text-sm'>{MonthDayYear(participant.user.updatedAt)}</span>
                            </> 
                        }
                    </>
                )}

                {openSetting && (
                    <>
                        <CloseIcon className='w-5 h-5 absolute top-2 right-3 cursor-pointer' onClick={handleCloseSetting} />

                        <button className='flex gap-2 hover:fill-secondary-red hover:text-secondary-red cursor-pointer'
                        onClick={handleDeleteParticipant}
                        >
                            <DeleteIcon className='w5 h-5' />
                            Delete
                        </button>
                    </>
                    
                )

                }
                
            </div>
        </li>
    )
};

export default ParticipantShow;