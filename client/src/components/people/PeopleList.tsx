import React, { useState, useEffect } from 'react';
import PeopleShow from './PeopleShow';

import { useFetchUsersQuery } from "../../redux/store";


const PeopleList = () => {
    const { data: usersData, isLoading: isUsersLoading, isError } = useFetchUsersQuery();

    console.log('user: ', usersData);

    let renderedPeople = null;

    if (isUsersLoading) {
        renderedPeople = <p>Loading...</p>
    } else if (usersData && Array.isArray(usersData)) {
        renderedPeople = usersData.map((user: userProp) => {
            return ( 
                <PeopleShow key={user.id} user={user} /> 
            )
        });
    }

    if (isError) {
        return <p>Error fetching users data</p>;
    }

    return (
        <div className="h-[45rem] hide-scrollbar py-2">
            <ul className='flex flex-col gap-5'>
                {usersData && usersData.length > 0 ? renderedPeople : <p className='text-2xl text-gray-400'>No Event So Far, Please Create One.</p>}
            </ul>
        </div>
    )
};

export default PeopleList;