import React from 'react';
import Navigation from '../common/Navigation';
import PeopleCreate from "../people/PeopleCreate";
import PeopleList from '../people/PeopleList';

import { useFetchUserQuery } from '../../redux/store';

const People = () => {
    const { data: userData } = useFetchUserQuery();

    return (
        <main className='flex-grow relative
                         flex gap-5 my-5
                        '
        >
            <div className='basis-1/5'>
                <Navigation isActive='people' />
            </div>

            <div className='basis-4/5
                            flex flex-col gap-5
                           '
            >
                <h1 className='text-3xl font-semibold ml-5'>People</h1>

                {/* Event Search and Create Event */}
                {/* Only admin can create new person */}
                {userData.role === 'Admin' && <PeopleCreate />}

                <div className='w-full flex flex-col'>
                    {/* Display Event List */}
                    <PeopleList />
                </div>
            </div>
        </main>
    )
};

export default People;