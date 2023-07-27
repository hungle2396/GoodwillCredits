import React, {useState} from 'react';
import PreviewImage from '../../UI/img/cute_dog.jpg';
import { ReactComponent as EditIcon } from '../../UI/img/edit.svg';
import { ReactComponent as DeleteIcon } from '../../UI/img/trash-can.svg';
import { ReactComponent as EventSettingIcon } from '../../UI/img/more.svg';
import { ReactComponent as CloseIcon } from '../../UI/img/close.svg';
import { ReactComponent as RightArrowIcon } from '../../UI/img/right-chevron.svg';

import { lastLoginDate } from '../utils/Formatting';

const PeopleShow = ({user}: any) => {
    const [openSetting, setOpenSetting] = useState<boolean>(false);
    const [showPeopleModal, setShowPeopleModal] = useState<boolean>(false);

    const handleOpenPeopleModal = () => {
        setShowPeopleModal(true);
    }

    const handleClosePeopleModal = () => {
        setShowPeopleModal(false);
    }

    const handleOpenSetting = () => {
        setOpenSetting(true);
    };

    const handleCloseSetting = () => {
        console.log('closing');
        setOpenSetting(false);
    };

    /* Need fixing */
    const handleDeletePeople = (eventId: string) => {
        // deleteEvent({ 
        //     eventId: eventId,
        //     userId: userData.id
        // });
    };

    return (
        <li
            className={`flex items-center shadow-box rounded-md pl-5 mx-5 h-[8rem] cursor-pointer relative`}
        >
            <span className='inline-block bg-secondary-green text-white py-0.5 px-4 absolute top-0 left-0 rounded-tl-md rounded-br-md text-sm'>{user.isOnline ? 'Online' : 'Offline'}</span>

            <div className='flex-shrink-0 flex flex-col items-center gap-1'>    
                <img src={PreviewImage} className='w-14 h-14 rounded-full' alt='test cute dog'/>
            </div>

            <div className='flex w-full justify-between mx-5'>
                <div className='flex flex-col gap-1 w-20'>
                    <h1 className='text-sm text-secondary-grey'>First Name</h1>
                    <p className='overflow-hidden whitespace-nowrap text-ellipsis'>{user.firstName}</p>
                </div>

                <div className='flex flex-col gap-1 w-20'>
                    <h1 className='text-sm text-secondary-grey'>Last Name</h1>
                    <p className='overflow-hidden whitespace-nowrap text-ellipsis'>{user.lastName}</p>
                </div>

                <div className='flex flex-col gap-1 w-20'>
                    <h1 className='text-sm text-secondary-grey'>Phone</h1>
                    <p className='overflow-hidden whitespace-nowrap text-ellipsis'>-</p>
                </div>

                <div className='flex flex-col gap-1 w-30'>
                    <h1 className='text-sm text-secondary-grey'>Email</h1>
                    <p className='overflow-hidden whitespace-nowrap text-ellipsis'>{user.email}</p>
                </div>

                <div className='flex flex-col gap-1 w-10'>
                    <h1 className='text-sm text-secondary-grey'>Role</h1>
                    <p className='overflow-hidden whitespace-nowrap text-ellipsis'>{user.role}</p>
                </div>

                <div className='flex flex-col gap-1'>
                    <h1 className='text-sm text-secondary-grey'>Last Login</h1>
                    <p className='overflow-hidden whitespace-nowrap text-ellipsis'>{lastLoginDate(user.updatedAt)}</p>
                </div>
            </div>

            <div className='flex justify-center items-center relative h-full w-32 border-transparent border-l-secondary-grey-light border'>
                
                {!openSetting && (
                    <>
                        <div className='flex gap-2 absolute top-1 right-3' onClick={handleOpenSetting}>
                            <EventSettingIcon className='w-5 h-5 fill-secondary-grey' />
                        </div>

                        <div>
                            <RightArrowIcon className='w-10 h-10' />
                        </div>
                    </>
                )}
                
                {openSetting && (
                    <div className='flex flex-col gap-3 bg-white'>
                        <button className='flex items-center gap-2 hover:fill-primary-purple hover:text-primary-purple'
                        onClick={handleOpenPeopleModal}
                        >
                            <EditIcon className='w-5 h-5' />
                            Edit
                        </button>
                        

                        <button className='flex items-center gap-2 hover:fill-primary-purple hover:text-primary-purple'
                            onClick={() => handleDeletePeople(user.id)}    
                        >
                            <DeleteIcon className='w-5 h-5' />
                            Delete
                        </button>
                        
                        <button className='flex items-center gap-1 mt-2 bg-secondary-grey-light py-1 px-2 rounded-md hover:bg-zinc-400' onClick={handleCloseSetting}>
                            <CloseIcon className='w-5 h-5' />
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {/* Edit Event Form */}
            {/* {showPeopleModal && <PeopleForm mode='edit' userData={user} onClose={handleClosePeopleModal} onCloseSetting={handleCloseSetting} />} */}
        </li>
    )
};

export default PeopleShow;