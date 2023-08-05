import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchUsersQuery } from "../../redux/store";
import { useFetchUserQuery } from '../../redux/store';
import useDeletePeople from "../customHooks/useDeletePeople";
import Navigation from '../common/Navigation';
import CircularProgress from '@mui/material/CircularProgress';
import { ReactComponent as RightArrowIcon } from '../../UI/img/right-chevron.svg';
import { ReactComponent as EditIcon } from '../../UI/img/edit.svg';
import { ReactComponent as DeleteIcon } from '../../UI/img/trash-can.svg';
import { ReactComponent as RoleIcon } from '../../UI/img/id-card.svg';
import { ReactComponent as BirthdayIcon } from '../../UI/img/confetti.svg';
import { ReactComponent as PhoneIcon } from '../../UI/img/telephone.svg';
import { ReactComponent as PointsIcon } from '../../UI/img/rating.svg';
import { ReactComponent as EmailIcon } from '../../UI/img/email.svg';
import { ReactComponent as AddressIcon } from '../../UI/img/placeholder.svg';

import { Link } from 'react-router-dom';
import { lastLoginDate } from '../utils/Formatting';
import PeopleForm from './PeopleForm';

const PeopleDetails = () => {
    const { id } = useParams();

    const { data: userData, isLoading: userLoading } = useFetchUserQuery();
    const { data: peopleData, isLoading, isError } = useFetchUsersQuery();
    const { handleDeletePeople, isDeletingPeople } = useDeletePeople();

    const [showPeopleModal, setShowPeopleModal] = useState<boolean>(false);
    
    const handleOpenPeopleModal = () => {
        setShowPeopleModal(true);
    }

    const handleClosePeopleModal = () => {
        setShowPeopleModal(false);
    }
    // Find the specific user from the users cache
    const user = peopleData?.find((user: userProp) => user.id === id);

    console.log('userData: ', userData);
    if (userLoading) {
        return <CircularProgress />
    }

    if (isLoading) {
        return <CircularProgress />
    }

    if (isError) {
        return <div>Error loading user data.</div>
    }

    if (isDeletingPeople) {
        return <CircularProgress />
    }

    return (
        <main className='flex-grow relative
                         flex gap-5 my-5
                        '
        >
            <div className='basis-1/5'>
                <Navigation isActive='people' />
            </div>

            <div className='xl:basis-3/5 lg:basis-4/5 md:basis-4/5
                            flex flex-col gap-5
                           '
            >
                <div className='flex gap-2 items-center'>
                    <Link to={'/people'}>People</Link>
                    <RightArrowIcon className='w-4 h-3' />
                    <p>Person Details</p>
                </div>

                <div className='
                    person-details-container
                    bg-secondary-grey-light-2
                    w-full h-full shadow-box rounded-md
                    '>
                    <div className='flex justify-between items-center h-10 bg-white px-10 rounded-l-md rounded-r-md'>
                        <div className='flex gap-2'>
                            <p className='text-secondary-grey'>Last Login:</p>
                            <span>{lastLoginDate(user.updatedAt)}</span>
                        </div>

                        <div className='flex gap-4'>
                            <button className=' hover:fill-primary-purple' onClick={handleOpenPeopleModal}>
                                <EditIcon className='w-4 h-4' />
                            </button>
                            <button className='hover:fill-secondary-red'
                            onClick={() => handleDeletePeople(user.id, userData.id, userData.role)}
                            >
                                <DeleteIcon className='w-4 h-4' />
                            </button>
                        </div>
                    </div>

                    <div className='mx-10'>
                        <div className='flex items-center gap-5 my-10'>
                            <img src='https://lh3.googleusercontent.com/a/AAcHTte4RStM7h-UFz4iypawaBUazzv8QxYB4NTulsjNcOlf5w=s96-c' alt='user profile'
                                className='w-20 h-20 rounded-full'
                            />

                            <p className='text-4xl font-semibold'>{`${user.firstName} ${user.lastName}`}</p>
                        </div>

                        <div className='flex flex-col border border-t-1 border-x-0 border-b-0 border-secondary-grey-light py-10 gap-10'>
                            <div className='flex w-full text-xl items-center gap-2'>
                                <div className='flex basis-1/2 items-center gap-3'>
                                    <RoleIcon className='w-8 h-8 fill-primary-purple' />
                                    <p>Role</p>
                                </div>

                                <p className='basis-1/2'>{user.role}</p>
                            </div>

                            <div className='flex w-full text-xl items-center gap-2'>
                                <div className='flex basis-1/2 items-center gap-3'>
                                    <BirthdayIcon className='w-8 h-8 fill-primary-purple' />
                                    <p>Birthday</p>
                                </div>

                                <p className='basis-1/2'>{lastLoginDate(user.birthday) || '-'}</p>
                            </div>

                            <div className='flex w-full text-xl items-center gap-2'>
                                <div className='flex basis-1/2 items-center gap-3'>
                                    <EmailIcon className='w-8 h-8 fill-primary-purple' />
                                    <p>Email</p>
                                </div>

                                <p className='basis-1/2'>{user.email || '-'}</p>
                            </div>

                            <div className='flex w-full text-xl items-center gap-2'>
                                <div className='flex basis-1/2 items-center gap-3'>
                                    <PhoneIcon className='w-8 h-8 fill-primary-purple' />
                                    <p>Phone</p>
                                </div>

                                <p className='basis-1/2'>{user.phone || '-'}</p>
                            </div>

                            <div className='flex w-full text-xl items-center gap-2'>
                                <div className='flex basis-1/2 items-center gap-3'>
                                    <AddressIcon className='w-8 h-8 fill-primary-purple' />
                                    <p>Mailing Address</p>
                                </div>

                                <p className='basis-1/2'>{user.address ? `${user.address} ${user.city}, ${user.state}, ${user.zipCode}` : '-'}</p>
                            </div>

                            <div className='flex w-full text-xl items-center gap-2'>
                                <div className='flex basis-1/2 items-center gap-3'>
                                    <PointsIcon className='w-10 h-10 fill-primary-purple' />
                                    <p>Total Credits Earned</p>
                                </div>

                                <p className='basis-1/2'>1525 Points</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>,
            {/* Edit Event Form */}
            {showPeopleModal && <PeopleForm mode='edit' personData={user} onClose={handleClosePeopleModal} />}
        </main>
    )
};

export default PeopleDetails;