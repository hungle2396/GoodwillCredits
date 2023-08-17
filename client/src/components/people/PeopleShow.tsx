import React, {useState, useEffect} from 'react';
import PreviewImage from '../../UI/img/cute_dog.jpg';
import { ReactComponent as EditIcon } from '../../UI/img/edit.svg';
import { ReactComponent as DeleteIcon } from '../../UI/img/trash-can.svg';
import { ReactComponent as EventSettingIcon } from '../../UI/img/more.svg';
import { ReactComponent as CloseIcon } from '../../UI/img/close.svg';
import { ReactComponent as RightArrowIcon } from '../../UI/img/right-chevron.svg';
import { useNavigate } from 'react-router-dom';
import { useFetchUserQuery } from '../../redux/store';
import useDeletePeople from '../customHooks/useDeletePeople';
import { MonthDayYear } from '../utils/Formatting';

import PeopleForm from './PeopleForm';
import { CircularProgress } from '@mui/material';

const PeopleShow = ({user}: any) => {
    const navigate = useNavigate();
    const { data: userData, isLoading: isUserLoading } = useFetchUserQuery();

    const {handleDeletePeople, isDeletingPeople} = useDeletePeople();
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
        setOpenSetting(false);
    };

    const handlePeopleDetails = () => {
        navigate(`/people/${user.id}`);
    }

    if (isUserLoading) {
        return <CircularProgress />
    }

    if (isDeletingPeople) {
        return <CircularProgress />
    }

    const onlineBackgroundColor = user.isOnline ? 'bg-secondary-green' : 'bg-secondary-grey';
    return (
        <li
            className={`flex items-center shadow-box rounded-md pl-5 mx-5 h-[8rem] relative`}
        >
            <span className={`inline-block ${onlineBackgroundColor} text-white py-0.5 px-4 absolute top-0 left-0 rounded-tl-md rounded-br-md text-sm`}>{user.isOnline ? 'Online' : 'Offline'}</span>

            <div className='flex-shrink-0 flex flex-col items-center gap-1'>    
                <img src={PreviewImage} className='w-14 h-14 rounded-full' alt='test cute dog'/>
            </div>

            <div className='flex w-full justify-between mx-10'>
                <div className='flex flex-col gap-1 w-20'>
                    <h1 className='text-sm text-secondary-grey'>First Name</h1>
                    <p className='overflow-hidden whitespace-nowrap text-ellipsis'>{user.firstName}</p>
                </div>

                <div className='flex flex-col gap-1 w-20'>
                    <h1 className='text-sm text-secondary-grey'>Last Name</h1>
                    <p className='overflow-hidden whitespace-nowrap text-ellipsis'>{user.lastName}</p>
                </div>

                <div className='flex flex-col gap-1 w-48'>
                    <h1 className='text-sm text-secondary-grey'>Email</h1>
                    <p title={user.email} className='overflow-hidden whitespace-nowrap text-ellipsis'>{user.email}</p>
                </div>

                <div className='flex flex-col gap-1 w-20'>
                    <h1 className='text-sm text-secondary-grey'>Role</h1>
                    <p className='overflow-hidden whitespace-nowrap text-ellipsis'>{user.role}</p>
                </div>

                <div className='flex flex-col gap-1 w-32'>
                    <h1 className='text-sm text-secondary-grey'>Last Login</h1>
                    <p className='overflow-hidden whitespace-nowrap text-ellipsis'>{MonthDayYear(user.updatedAt)}</p>
                </div>
            </div>

            <div className='flex justify-center items-center h-full w-28 border-transparent border-l-secondary-grey-light border relative flex-shrink-0'>
                
                {!openSetting && (
                    <>
                        {(userData.id === user.id || userData.role === 'Admin') ? 
                            <div className='flex gap-2 absolute top-1 right-3' onClick={handleOpenSetting}>
                            <EventSettingIcon className='w-5 h-5 fill-secondary-grey' />
                            </div>
                            :
                            ''
                        }
                        
                        <div className='cursor-pointer' onClick={handlePeopleDetails} >
                            <RightArrowIcon 
                                className='w-8 h-8'  
                            />
                        </div>
                    </>
                )}
                
                {openSetting && (
                    <div className='flex flex-col gap-2 bg-white text-md'>
                        <button className='absolute top-2 right-2' onClick={handleCloseSetting}>
                            <CloseIcon className='w-5 h-5' />
                        </button>

                        <button className='flex items-center gap-2 hover:fill-primary-purple hover:text-primary-purple'
                        onClick={handleOpenPeopleModal}
                        >
                            <EditIcon className='w-5 h-5' />
                            Edit
                        </button>
                        

                        <button className='flex items-center gap-2 hover:fill-secondary-red hover:text-secondary-red'
                            onClick={() => handleDeletePeople(user.id, userData.id, userData.role)}    
                        >
                            <DeleteIcon className='w-4 h-4' />
                            <p>Delete</p>
                        </button>
                    </div>
                )}
            </div>

            {/* Edit Event Form */}
            {showPeopleModal && <PeopleForm mode='edit' personData={user} onClose={handleClosePeopleModal} onCloseSetting={handleCloseSetting} />}
        </li>
    )
};

export default PeopleShow;