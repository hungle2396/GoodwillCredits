import React, {useState} from 'react';
import { ReactComponent as SearchIcon } from '../../UI/img/searchIcon.svg';
import PeopleForm from './PeopleForm';
import { useFetchUserQuery } from '../../redux/store';

const PeopleCreate = () => {
    const [showPeopleModal, setShowPeopleModal] = useState<boolean>(false);
    const [peopleSearch, setPeopleSearch] = useState<string>('');
    const { data: userData } = useFetchUserQuery();

    const handleOpenPeopleModal = () => {
        setShowPeopleModal(true);
    }

    const handleClosePeopleModal = () => {
        setShowPeopleModal(false);
    }

    return (
        <div className='w-full flex justify-between'>
            
            <div className='flex items-center rounded-md bg-secondary-grey-light p-2 w-96 ml-5'>
                <SearchIcon className='w-4 h-4' />
                <input 
                    className='event_search bg-transparent text-gray-600 outline-none mx-2 w-full'
                    placeholder='Search Event'
                    value={peopleSearch}
                    onChange={(event) => setPeopleSearch(event?.target.value)}                              
                />
            </div>

            {userData.role === 'Admin' && (
                <button 
                className='btn-blue rounded-md mr-5'
                onClick={handleOpenPeopleModal}
                >
                New Person
                </button>
            )}
            

            {/* Create People Form */}
            {showPeopleModal && <PeopleForm mode='create' personData={{}} onClose={handleClosePeopleModal} />}
        </div>
    )
};

export default PeopleCreate;